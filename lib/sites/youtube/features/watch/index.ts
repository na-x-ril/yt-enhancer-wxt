// lib/sites/youtube/features/watch/index.ts

import type {
  YouTubePlayer,
  InitialData,
  InitialPlayerResponse,
  PlayerMicroformatRenderer,
  WatchFeatureInterface,
} from "../../types";
import { storageBridge } from "@/lib/core/bridge/bridge";
import type {
  InitialPlayerResponseVideoDetails,
  ResultsContent,
  UpdateDateTextAction,
  UpdateViewershipAction,
} from "../../types/VideoData";
import {
  buildSVG,
  createElement,
  ELEMENT_IDS,
  ELEMENT_SELECTORS,
  fetchData,
  getVideoId,
  waitForElement,
  waitForPlayer,
} from "@/lib/core/utils";
import { SponsorBlockManager } from "../sponsorblock";
import { Odometer } from "@/lib/core/odometer";
import {
  BooleanKeys,
  Config,
  DEFAULT_CONFIG,
  isQuality,
  normalizeSavedConfig,
  Quality,
  QUALITY_RANK,
  SettingEvent,
  State,
  VideoState,
} from "../../types/player";

const RE_EDGE_SPEED = 2;
const RE_EDGE_TIMEOUT_MS = 60000;
const RE_EDGE_CLAMP_OFFSET = 1;

const getAvailableQualities = (response: InitialPlayerResponse): Quality[] => {
  const formats = [
    ...(response.streamingData?.formats ?? []),
    ...(response.streamingData?.adaptiveFormats ?? []),
  ];
  const qualities = new Set<Quality>();
  for (const fmt of formats) {
    if (fmt.quality && QUALITY_RANK[fmt.quality]) {
      qualities.add(fmt.quality);
    }
  }
  return Array.from(qualities);
};

const getAvailableCodecs = (
  response: InitialPlayerResponse,
): { video: string[]; audio: string[] } => {
  const formats = [
    ...(response.streamingData?.formats ?? []),
    ...(response.streamingData?.adaptiveFormats ?? []),
  ];
  const video = new Set<string>();
  const audio = new Set<string>();
  for (const fmt of formats) {
    const match = fmt.mimeType.match(/codecs="([^"]+)"/);
    if (!match) continue;
    const codecs = match[1].split(",").map((c) => c.trim());
    if (fmt.mimeType.startsWith("audio/")) {
      codecs.forEach((c) => audio.add(c));
    } else {
      codecs.forEach((c, i) => (i === 0 ? video : audio).add(c));
    }
  }
  return { video: Array.from(video).sort(), audio: Array.from(audio).sort() };
};

const selectBestQuality = (
  preferred: Quality,
  available: Quality[],
): string => {
  if (available.length === 0) return preferred;

  const preferredRank = QUALITY_RANK[preferred] ?? 0;
  const sorted = available
    .map((q) => ({ quality: q, rank: QUALITY_RANK[q] ?? 0 }))
    .sort((a, b) => a.rank - b.rank);

  const minRank = sorted[0].rank;
  const maxRank = sorted[sorted.length - 1].rank;

  if (preferredRank >= maxRank) return sorted[sorted.length - 1].quality;
  if (preferredRank <= minRank) return sorted[0].quality;

  const exact = sorted.find((item) => item.rank === preferredRank);
  if (exact) return exact.quality;

  return sorted.reduce((prev, curr) =>
    Math.abs(curr.rank - preferredRank) < Math.abs(prev.rank - preferredRank)
      ? curr
      : prev,
  ).quality;
};

class ViewCountParser {
  private normalizeDecimalString(raw: string): string {
    const dotCount = (raw.match(/\./g) ?? []).length;
    const commaCount = (raw.match(/,/g) ?? []).length;

    if (dotCount > 1) return raw.replace(/\./g, "");
    if (commaCount > 1) return raw.replace(/,/g, "");

    if (dotCount === 1 && commaCount === 1) {
      return raw.lastIndexOf(".") > raw.lastIndexOf(",")
        ? raw.replace(/,/g, "")
        : raw.replace(/\./g, "").replace(",", ".");
    }

    if (commaCount === 1) {
      const parts = raw.split(",");
      return parts[1].length === 3
        ? raw.replace(",", "")
        : raw.replace(",", ".");
    }

    if (dotCount === 1) {
      const parts = raw.split(".");
      return parts[1].length === 3 ? raw.replace(".", "") : raw;
    }

    return raw;
  }

  public parseNumber(viewCountStr: string): number {
    if (!viewCountStr) return 0;

    const lower = viewCountStr.toLowerCase();
    let multiplier = 1;

    if (/\b(rb)\b/.test(lower) || /\bk\b/.test(lower)) multiplier = 1_000;
    else if (/\b(jt)\b/.test(lower) || /\bm\b/.test(lower))
      multiplier = 1_000_000;
    else if (/\b(miliar)\b/.test(lower) || /\bb\b/.test(lower))
      multiplier = 1_000_000_000;

    const numberMatch = viewCountStr.match(/[\d.,]+/);
    if (!numberMatch) return 0;

    const normalized = this.normalizeDecimalString(numberMatch[0]);
    const num = parseFloat(normalized);
    return isNaN(num) ? 0 : Math.floor(num * multiplier);
  }

  parse(viewCountStr: string): { count: number; formatted: string } {
    return { count: this.parseNumber(viewCountStr), formatted: viewCountStr };
  }

  public extractSuffix(viewCountString: string): {
    number: number;
    suffix: string;
    divisor: number;
    decimalPlaces: number;
  } {
    if (!viewCountString) {
      return { number: 0, suffix: "", divisor: 1, decimalPlaces: 0 };
    }

    const lower = viewCountString.toLowerCase();
    let divisor = 1;
    let decimalPlaces = 0;

    if (/\b(rb)\b/.test(lower) || /\bk\b/.test(lower)) {
      divisor = 1_000;
      decimalPlaces = 1;
    } else if (/\b(jt)\b/.test(lower) || /\bm\b/.test(lower)) {
      divisor = 1_000_000;
      decimalPlaces = 1;
    } else if (/\b(miliar)\b/.test(lower) || /\bb\b/.test(lower)) {
      divisor = 1_000_000_000;
      decimalPlaces = 1;
    }

    const numberMatch = viewCountString.match(/^[\d.,\s]+/);
    const numberPart = numberMatch ? numberMatch[0] : "";
    const suffixPart = viewCountString.slice(numberPart.length).trim();
    const suffix = suffixPart ? ` ${suffixPart}` : "";

    return {
      number: this.parseNumber(viewCountString),
      suffix,
      divisor,
      decimalPlaces,
    };
  }
}

class WatchFeature {
  private state: State = this.createInitialState();
  private config: Config = { ...DEFAULT_CONFIG };
  private odometer: Odometer | null = null;
  private timeTrackingCleanup: (() => void) | null = null;
  private cleanupHandlers: Array<() => void> = [];
  private metadataListenerAttached = false;
  private readonly parser = new ViewCountParser();
  private sbManager: SponsorBlockManager | null = null;

  private createInitialState(): State {
    return {
      id: null,
      state: null,
      player: null,
      playerResponse: null,
      videoBadges: [],
      currentViewCount: 0,
      currentDateText: "",
      lastSavedTime: 0,
      isDestroyed: false,
      isCaptionActive: false,
      reEdgeActive: false,
      reEdgeBufferingStart: null,
      reEdgeTimeout: null,
    };
  }

  async init(): Promise<() => void> {
    const currentId = getVideoId();
    const previousId = this.state.id;

    if (previousId && previousId !== currentId) {
      console.log(`[WatchFeature] Video changed: ${previousId} → ${currentId}`);
      this.destroy();
    }

    this.state = this.createInitialState();
    this.state.id = currentId;

    await this.loadConfig();
    this.setupMetadataListener();

    await this.fetchAndLogVideoData();
    await this.handleVideo();

    if (
      this.state.player &&
      this.state.state !== VideoState.LIVE &&
      !this.state.isDestroyed
    ) {
      this.timeTrackingCleanup = this.setupTimeTracking(this.state.player);
      await this.restoreTime();
    }

    await this.initSB();

    this.registerEventListeners();

    return () => this.destroy();
  }

  private async initSB(): Promise<void> {
    if (this.config.sbEnabled && this.state.player && !this.state.isDestroyed) {
      this.sbManager = new SponsorBlockManager();
      await this.sbManager.init(this.state.player);

      this.cleanupHandlers.push(
        () => this.sbManager?.destroy(),
        () => (this.sbManager = null),
      );
    }
  }

  destroy(): void {
    this.state.isDestroyed = true;

    for (const fn of this.cleanupHandlers) {
      try {
        fn();
      } catch (error) {
        console.warn("[WatchFeature] Cleanup error:", error);
      }
    }
    this.cleanupHandlers = [];

    this.state = this.createInitialState();
  }

  private async loadConfig(): Promise<void> {
    try {
      const saved = await storageBridge.get("dropdown_config");
      this.config = normalizeSavedConfig(saved);
    } catch (error) {
      console.warn("[WatchFeature] Failed to load config:", error);
    }
  }

  private registerEventListeners(): void {
    const handleBeforeUnload = () => void this.saveTime();
    const handleVisibilityChange = () =>
      document.hidden && void this.saveTime();
    const handleRefresh = () => void this.onRefresh();
    const handleSetting = (e: Event) => this.onSetting(e);
    const handleQuality = (e: Event) => this.onQuality(e);
    const handleCodecReload = () => void this.reloadForCodecChange();

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("yt-enhancer-refresh", handleRefresh);
    window.addEventListener("yt-enhancer-setting", handleSetting);
    window.addEventListener("yt-enhancer-quality", handleQuality);
    window.addEventListener("yt-enhancer-codec-reload", handleCodecReload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    this.cleanupHandlers.push(
      () => window.removeEventListener("beforeunload", handleBeforeUnload),
      () => window.removeEventListener("yt-enhancer-refresh", handleRefresh),
      () => window.removeEventListener("yt-enhancer-setting", handleSetting),
      () => window.removeEventListener("yt-enhancer-quality", handleQuality),
      () =>
        window.removeEventListener(
          "yt-enhancer-codec-reload",
          handleCodecReload,
        ),
      () =>
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange,
        ),
    );
  }

  private setupMetadataListener(): void {
    if (this.metadataListenerAttached) return;
    this.metadataListenerAttached = true;

    window.addEventListener("yt-enhancer-metadata-update", (event) => {
      if (this.state.isDestroyed) return;
      const detail = (
        event as CustomEvent<{
          actions?: Array<UpdateViewershipAction | UpdateDateTextAction>;
        }>
      ).detail;
      if (!detail || !Array.isArray(detail.actions)) return;
      this.handleMetadataUpdate(detail.actions);
    });

    this.cleanupHandlers.push(() => (this.metadataListenerAttached = false));
  }

  private async reloadForCodecChange(): Promise<void> {
    if (this.state.isDestroyed) return;
    if (!this.state.id) return;
    if (!this.state.player) {
      location.reload();
      return;
    }
    try {
      const player = this.state.player;
      player.loadVideoById(this.state.id);
      await this.restoreTime();
      await this.applyPlayerFeatures(player);
    } catch (error) {
      console.warn("[WatchFeature] Codec reload error:", error);
      location.reload();
    }
  }

  private async onRefresh(): Promise<void> {
    if (this.state.isDestroyed) return;
    try {
      const currentId = getVideoId();
      if (currentId !== this.state.id) {
        this.destroy();
        return;
      }

      if (!this.state.player) {
        this.state.player = await waitForPlayer();
      }

      if (this.state.player && !this.state.isDestroyed) {
        await this.applyPlayerFeatures(this.state.player);
        if (this.state.state !== VideoState.LIVE) {
          this.timeTrackingCleanup?.();
          this.timeTrackingCleanup = this.setupTimeTracking(this.state.player);

          this.cleanupHandlers.push(
            () => this.timeTrackingCleanup?.(),
            () => (this.timeTrackingCleanup = null),
          );
        }
      }
    } catch (error) {
      console.warn("[WatchFeature] Refresh error:", error);
    }
  }

  private readonly settingHandlers: Record<
    BooleanKeys<Config>,
    (value: boolean) => void
  > = {
    autoLoop: (value) => {
      this.config.autoLoop = value;
      this.state.player?.setLoopVideo(value);
    },
    qualityService: (value) => {
      this.config.qualityService = value;
      if (value && this.config.quality && this.state.player) {
        void this.setQuality(this.state.player, this.config.quality);
      }
    },
    autoCaption: (value) => {
      this.config.autoCaption = value;
      if (!this.state.player) return;
      if (value && !this.state.isCaptionActive) {
        this.state.player.toggleSubtitlesOn();
        this.state.isCaptionActive = true;
      } else if (!value && this.state.isCaptionActive) {
        this.state.player.toggleSubtitles();
        this.state.isCaptionActive = false;
      }
    },
    sbEnabled: (value) => {
      this.config.sbEnabled = value;
      if (value && this.state.player && !this.state.isDestroyed) {
        if (this.sbManager) this.sbManager.destroy();
        this.sbManager = new SponsorBlockManager();
        void this.sbManager.init(this.state.player);
      } else if (!value) {
        this.sbManager?.destroy();
        this.sbManager = null;
      }
    },
  };

  private onSetting(event: Event): void {
    if (this.state.isDestroyed) return;
    try {
      const detail = (event as CustomEvent<SettingEvent>).detail;
      if (!detail || typeof detail.value !== "boolean") return;
      const { setting, value } = detail;
      if (!(setting in DEFAULT_CONFIG)) return;
      this.config[setting] = value;
      this.settingHandlers[setting]?.(value);
    } catch (error) {
      console.warn("[WatchFeature] Setting handler error:", error);
    }
  }

  private onQuality(event: Event): void {
    if (this.state.isDestroyed) return;
    try {
      const detail = (event as CustomEvent<{ quality: unknown }>).detail;
      if (!detail || !isQuality(detail.quality)) return;
      const newQuality = detail.quality;
      this.config.quality = newQuality;
      if (this.state.player && this.config.qualityService) {
        void this.setQuality(this.state.player, newQuality);
      }
    } catch (error) {
      console.warn("[WatchFeature] Quality handler error:", error);
    }
  }

  private handleMetadataUpdate(
    actions: Array<UpdateViewershipAction | UpdateDateTextAction>,
  ): void {
    if (this.state.isDestroyed) return;
    try {
      const viewershipAction = actions.find(
        (action): action is UpdateViewershipAction =>
          "updateViewershipAction" in action,
      );
      const dateTextAction = actions.find(
        (action): action is UpdateDateTextAction =>
          "updateDateTextAction" in action,
      );

      const renderer =
        viewershipAction?.updateViewershipAction?.viewCount
          ?.videoViewCountRenderer;

      const viewCountString =
        renderer?.viewCount?.simpleText ??
        renderer?.viewCount?.runs?.map((r) => r.text).join("");

      const originalViewCount = renderer?.originalViewCount
        ? parseInt(renderer.originalViewCount, 10)
        : null;

      const newDateText = dateTextAction?.updateDateTextAction?.dateText;
      const dateTextString =
        newDateText?.simpleText ??
        newDateText?.runs?.map((r) => r.text).join("");

      if (viewCountString || dateTextString) {
        void this.displayVideoInfo(
          viewCountString ?? "",
          dateTextString ?? this.state.currentDateText,
          true,
          originalViewCount ?? undefined,
        );
      }
    } catch (error) {
      console.warn("[WatchFeature] Metadata update error:", error);
    }
  }

  private async handleVideo(): Promise<void> {
    if (this.state.isDestroyed) return;
    try {
      if (!this.state.player) {
        this.state.player = await waitForPlayer();
      }
      if (this.state.player && !this.state.isDestroyed) {
        await this.applyPlayerFeatures(this.state.player);
      }
    } catch (error) {
      console.warn("[WatchFeature] Handle video error:", error);
    }
  }

  private async applyPlayerFeatures(player: YouTubePlayer): Promise<void> {
    if (this.state.isDestroyed) return;
    const maxRetries = 5;
    const delayMs = 500;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      if (this.state.isDestroyed) return;
      try {
        this.applyLoop(player);
        this.applyCaption(player);
        await this.setQuality(player, this.config.quality);
        return;
      } catch (error) {
        if (attempt < maxRetries - 1) {
          await new Promise((resolve) => setTimeout(resolve, delayMs));
        } else {
          console.warn(
            "[WatchFeature] Apply player features failed after retries:",
            error,
          );
        }
      }
    }
  }

  private applyLoop(player: YouTubePlayer): void {
    if (this.state.isDestroyed) return;
    try {
      if (this.config.autoLoop) player.setLoopVideo(true);
    } catch (error) {
      console.warn("[WatchFeature] Apply loop error:", error);
    }
  }

  private applyCaption(player: YouTubePlayer): void {
    if (this.state.isDestroyed) return;
    try {
      if (this.config.autoCaption) {
        player.toggleSubtitlesOn();
        this.state.isCaptionActive = true;
      }
    } catch (error) {
      console.warn("[WatchFeature] Apply caption error:", error);
    }
  }

  private async setQuality(
    player: YouTubePlayer,
    quality: Quality,
  ): Promise<void> {
    if (this.state.isDestroyed || !this.config.qualityService) return;
    if (!this.state.playerResponse) return;
    const available = getAvailableQualities(this.state.playerResponse);
    const finalQuality = selectBestQuality(quality, available);
    await player.setPlaybackQualityRange(finalQuality);
  }

  private canTrackTime(): boolean {
    return (
      !this.state.isDestroyed &&
      this.state.player !== null &&
      this.state.id !== null &&
      this.state.state !== VideoState.LIVE
    );
  }

  private async saveTime(): Promise<void> {
    if (!this.canTrackTime()) return;
    const player = this.state.player;
    if (!player) return;
    try {
      const currentTime = player.getCurrentTime();
      const duration = player.getDuration();
      if (!currentTime || !duration) return;

      const key = `video_time_${this.state.id}`;

      if (currentTime < 30 || duration - currentTime < 30) {
        await storageBridge.remove(key);
        this.state.lastSavedTime = 0;
        return;
      }

      if (Math.abs(currentTime - this.state.lastSavedTime) >= 3) {
        await storageBridge.set(key, currentTime);
        this.state.lastSavedTime = currentTime;
        console.log(
          "[WatchFeature] Last saved time:",
          this.state.lastSavedTime,
        );
      }
    } catch (error) {
      console.warn("[WatchFeature] Save time error:", error);
    }
  }

  private async restoreTime(): Promise<void> {
    if (!this.canTrackTime()) return;
    const player = this.state.player;
    if (!player) return;
    try {
      const key = `video_time_${this.state.id}`;
      const savedTime = (await storageBridge.get(key)) as number | undefined;
      const duration = player.getDuration();
      if (!savedTime || !duration) return;

      if (savedTime < 30 || duration - savedTime < 30) {
        await storageBridge.remove(key);
        return;
      }

      player.seekTo(savedTime, true);
      console.log("[WatchFeature] Video seeked to:", savedTime);
    } catch (error) {
      console.warn("[WatchFeature] Restore time error:", error);
    }
  }

  private getLiveEdge(): number | null {
    const video = document.querySelector<HTMLVideoElement>(
      "video.html5-main-video",
    );
    if (!video || video.seekable.length === 0) return null;
    return video.seekable.end(video.seekable.length - 1);
  }

  private reEdgeListener: ((...args: unknown[]) => void) | null = null;

  private reEdge(): void {
    if (this.state.isDestroyed || this.state.state !== VideoState.LIVE) return;
    if (this.state.reEdgeActive) return;
    if (!this.state.player) return;
    const video = document.querySelector<HTMLVideoElement>(
      "video.html5-main-video",
    );
    if (!video) return;

    const isDVR =
      this.state.playerResponse?.videoDetails.isLiveDvrEnabled === true;
    this.state.reEdgeActive = true;
    this.state.reEdgeBufferingStart = null;
    video.playbackRate = RE_EDGE_SPEED;
    this.setReEdgeButtonState(true);

    const edge = this.getLiveEdge();
    const delay = edge !== null ? edge - video.currentTime : null;
    console.log("[WatchFeature] Re-edge started:", {
      isDVR,
      delay: delay !== null ? `${delay.toFixed(1)}s` : "unknown",
      playbackRate: RE_EDGE_SPEED,
    });

    const onStateChange = (...args: unknown[]) => {
      if (!this.state.reEdgeActive) return;
      const [state] = args;
      if (state === 3) {
        this.state.reEdgeBufferingStart = Date.now();
        console.log("[WatchFeature] Re-edge buffering started");
      } else if (state === 1 && this.state.reEdgeBufferingStart !== null) {
        const bufferingMs = Date.now() - this.state.reEdgeBufferingStart;
        this.finishReEdge(isDVR, bufferingMs);
      } else if (state === 2) {
        console.log("[WatchFeature] Re-edge aborted (paused)");
        this.finishReEdge(isDVR, 0);
      }
    };

    this.reEdgeListener = onStateChange;
    this.state.player.addEventListener("onStateChange", onStateChange);
    this.state.reEdgeTimeout = window.setTimeout(() => {
      console.log("[WatchFeature] Re-edge aborted (timeout)");
      this.finishReEdge(isDVR, 0);
    }, RE_EDGE_TIMEOUT_MS);
    this.cleanupHandlers.push(() => this.abortReEdge());
  }

  private finishReEdge(isDVR: boolean, bufferingMs: number): void {
    if (!this.state.reEdgeActive) return;

    if (this.state.reEdgeTimeout !== null) {
      window.clearTimeout(this.state.reEdgeTimeout);
      this.state.reEdgeTimeout = null;
    }

    if (this.state.player && this.reEdgeListener) {
      this.state.player.removeEventListener(
        "onStateChange",
        this.reEdgeListener,
      );
    }
    this.reEdgeListener = null;

    if (isDVR && bufferingMs > 0) {
      const player = this.state.player;
      const video = document.querySelector<HTMLVideoElement>(
        "video.html5-main-video",
      );
      if (player && video) {
        try {
          const edge = this.getLiveEdge();
          const target = Math.min(
            player.getCurrentTime() + bufferingMs / 1000,
            (edge ?? Number.MAX_SAFE_INTEGER) - RE_EDGE_CLAMP_OFFSET,
          );
          player.seekTo(target, true);
          console.log(
            "[WatchFeature] Re-edge seek to:",
            `${target.toFixed(2)}s`,
            `(buffering: ${(bufferingMs / 1000).toFixed(2)}s)`,
          );
        } catch (error) {
          console.warn("[WatchFeature] Re-edge seek error:", error);
        }
      }
    } else if (isDVR) {
      console.log(
        "[WatchFeature] Re-edge finished without seek (0ms buffering)",
      );
    } else {
      console.log(
        "[WatchFeature] Re-edge finished (non-DVR, waiting for YT rate reset)",
      );
    }

    const video = document.querySelector<HTMLVideoElement>(
      "video.html5-main-video",
    );
    if (video) video.playbackRate = 1;

    this.state.reEdgeActive = false;
    this.state.reEdgeBufferingStart = null;
    this.setReEdgeButtonState(false);
  }

  private abortReEdge(): void {
    if (!this.state.reEdgeActive) return;
    console.log("[WatchFeature] Re-edge aborted (destroy)");
    this.finishReEdge(
      this.state.playerResponse?.videoDetails.isLiveDvrEnabled === true,
      0,
    );
  }

  private setReEdgeButtonState(active: boolean): void {
    const button = document.getElementById(ELEMENT_IDS.reEdgeButton);
    if (button) button.classList.toggle("active", active);
  }

  private setupTimeTracking(player: YouTubePlayer): (() => void) | null {
    if (this.state.isDestroyed || this.state.state === VideoState.LIVE)
      return null;
    try {
      const onPause = () => void this.saveTime();
      const onStateChange = (...args: unknown[]) => {
        const [state] = args;
        if (state === 2 || state === 0) void this.saveTime();
      };

      player.addEventListener("onPause", onPause);
      player.addEventListener("onStateChange", onStateChange);

      return () => {
        player.removeEventListener("onPause", onPause);
        player.removeEventListener("onStateChange", onStateChange);
      };
    } catch (error) {
      console.warn("[WatchFeature] Setup time tracking error:", error);
      return null;
    }
  }

  private parseVideoPage(html: string): {
    ytInitialData: InitialData | null;
    ytInitialPlayerResponse: InitialPlayerResponse | null;
  } {
    const initialDataMatch = html.match(/var ytInitialData\s*=\s*(\{.*?\});/);
    const initialPlayerResponseMatch = html.match(
      /var ytInitialPlayerResponse\s*=\s*(\{.*?\});/,
    );

    return {
      ytInitialData: initialDataMatch?.[1]
        ? JSON.parse(initialDataMatch[1])
        : null,
      ytInitialPlayerResponse: initialPlayerResponseMatch?.[1]
        ? JSON.parse(initialPlayerResponseMatch[1])
        : null,
    };
  }

  async fetchVideoData(url: string): Promise<{
    ytInitialData: InitialData | null;
    ytInitialPlayerResponse: InitialPlayerResponse | null;
  }> {
    const html = await fetchData(url);
    return this.parseVideoPage(html);
  }

  private setVideoState(
    microformat: PlayerMicroformatRenderer,
    videoDetails: InitialPlayerResponseVideoDetails,
  ): void {
    const liveDetails = microformat?.liveBroadcastDetails;

    if (liveDetails?.isLiveNow === true) {
      this.state.state = VideoState.LIVE;
    } else if (liveDetails?.isLiveNow === false && !videoDetails.isUpcoming) {
      this.state.state = VideoState.PAST_LIVE;
    } else if (liveDetails?.isLiveNow === false && videoDetails.isUpcoming) {
      this.state.state = VideoState.UPCOMING;
    } else {
      this.state.state = VideoState.VOD;
    }
  }

  private findVideoPrimaryInfo(
    contents: ResultsContent[],
  ): ResultsContent | undefined {
    return contents.find(
      (
        item,
      ): item is ResultsContent & {
        videoPrimaryInfoRenderer: NonNullable<
          ResultsContent["videoPrimaryInfoRenderer"]
        >;
      } => item.videoPrimaryInfoRenderer !== undefined,
    );
  }

  private getViewCount(data: InitialData): string | null {
    const contents =
      data.contents.twoColumnWatchNextResults?.results.results.contents;
    if (!contents) return null;
    const videoPrimaryInfo = this.findVideoPrimaryInfo(contents);

    if (!videoPrimaryInfo?.videoPrimaryInfoRenderer) return null;

    const content =
      videoPrimaryInfo.videoPrimaryInfoRenderer.viewCount.videoViewCountRenderer
        .viewCount;

    return this.state.state === VideoState.UPCOMING ||
      this.state.state === VideoState.LIVE
      ? (content?.runs?.map((r) => r.text).join("") ?? null)
      : (content?.simpleText ?? null);
  }

  private getVideoBadges(data: InitialData): string[] {
    if (this.state.state !== VideoState.VOD) return [];

    const contents =
      data.contents.twoColumnWatchNextResults?.results.results.contents;
    if (!contents) return [];
    const videoPrimaryInfo = this.findVideoPrimaryInfo(contents);

    if (!videoPrimaryInfo?.videoPrimaryInfoRenderer) return [];

    const badges = videoPrimaryInfo.videoPrimaryInfoRenderer.badges;
    if (!badges?.length) return [];

    return badges
      .map((badge) => badge.metadataBadgeRenderer.label)
      .filter((label): label is string => typeof label === "string");
  }

  private getDateText(
    ytInitialData: InitialData,
    ytInitialPlayerResponse: InitialPlayerResponse,
  ): string | null {
    if (this.state.state === VideoState.UPCOMING) {
      return (
        ytInitialPlayerResponse.playabilityStatus.liveStreamability?.liveStreamabilityRenderer.offlineSlate?.liveStreamOfflineSlateRenderer.mainText.runs
          ?.map((r) => r.text)
          .join("") ?? null
      );
    }

    const contents =
      ytInitialData.contents.twoColumnWatchNextResults?.results.results
        .contents;
    if (!contents) return null;
    const videoPrimaryInfo = this.findVideoPrimaryInfo(contents);

    if (!videoPrimaryInfo?.videoPrimaryInfoRenderer) return null;

    const content = videoPrimaryInfo.videoPrimaryInfoRenderer;
    return this.state.state === VideoState.LIVE
      ? (content?.dateText?.simpleText ?? null)
      : (content?.relativeDateText?.simpleText ?? null);
  }

  private getDVREnabled(response: InitialPlayerResponse): boolean {
    return response.videoDetails.isLiveDvrEnabled === true;
  }

  private async fetchAndLogVideoData(isUpdate = false): Promise<void> {
    if (this.state.isDestroyed) return;
    try {
      const data = await this.fetchVideoData(location.href);
      if (this.state.isDestroyed) return;

      if (!data.ytInitialData || !data.ytInitialPlayerResponse) return;

      const ytInitialDataObj = data.ytInitialData;
      const ytInitialPlayerResponseObj = data.ytInitialPlayerResponse;

      this.state.playerResponse = ytInitialPlayerResponseObj;

      const { video, audio } = getAvailableCodecs(ytInitialPlayerResponseObj);
      console.log("[WatchFeature] Supported video codecs:", video);
      console.log("[WatchFeature] Supported audio codecs:", audio);
      window.dispatchEvent(
        new CustomEvent("yt-enhancer-codecs-updated", {
          detail: { video, audio },
        }),
      );

      this.setVideoState(
        ytInitialPlayerResponseObj.microformat.playerMicroformatRenderer,
        ytInitialPlayerResponseObj.videoDetails,
      );

      const viewCount = this.getViewCount(ytInitialDataObj);
      const dateText = this.getDateText(
        ytInitialDataObj,
        ytInitialPlayerResponseObj,
      );

      this.state.videoBadges = this.getVideoBadges(ytInitialDataObj);
      console.log("[WatchFeature] Video badge(s):", this.state.videoBadges);
      console.log(
        "[WatchFeature] Video title:",
        ytInitialPlayerResponseObj.videoDetails.title,
      );
      console.log("[WatchFeature] View count:", viewCount);
      console.log("[WatchFeature] Date text:", dateText);

      if (this.state.isDestroyed) return;

      if (viewCount && dateText) {
        await this.displayVideoInfo(viewCount, dateText, isUpdate);
      }

      if (this.state.state === VideoState.LIVE) {
        const isDVREnabled = this.getDVREnabled(ytInitialPlayerResponseObj);
        console.log("[WatchFeature] Is live DVR enabled:", isDVREnabled);
        await waitForElement(ELEMENT_SELECTORS.timeWrapper, 5000);
        if (!this.state.isDestroyed) this.displayDVRIndicator(isDVREnabled);
        if (!this.state.isDestroyed) this.displayReEdgeButton();
      }
    } catch (error) {
      console.warn("[WatchFeature] Fetch video data error:", error);
    }
  }

  private createSeparator(): HTMLElement {
    const separator = createElement("span", { textContent: "•" });
    return separator;
  }

  private animateViewCount(
    element: HTMLElement,
    fromValue: number,
    newViewCountString: string,
    exactCount?: number,
  ): void {
    if (this.state.isDestroyed) return;
    try {
      const toValue = exactCount ?? this.parser.parse(newViewCountString).count;

      if (toValue === fromValue || fromValue === 0) {
        this.setStaticViewCount(element, toValue, newViewCountString);
        return;
      }

      const { suffix, divisor } = this.parser.extractSuffix(newViewCountString);
      const suffixElement = document.getElementById(ELEMENT_IDS.viewSuffix);
      if (suffixElement) suffixElement.textContent = suffix;

      if (!this.odometer) {
        this.setStaticViewCount(element, toValue, newViewCountString);
        return;
      }

      this.odometer.update(toValue / divisor);

      element.addEventListener(
        "odometerdone",
        () => {
          if (!this.state.isDestroyed) this.state.currentViewCount = toValue;
        },
        { once: true },
      );
    } catch (error) {
      console.warn("[WatchFeature] Animate view count error:", error);
      this.setStaticViewCount(
        element,
        exactCount ?? this.parser.parse(newViewCountString).count,
        newViewCountString,
      );
    }
  }

  private setStaticViewCount(
    element: HTMLElement,
    toValue: number,
    newViewCountString: string,
  ): void {
    if (this.state.isDestroyed) return;
    const { suffix, divisor, decimalPlaces } =
      this.parser.extractSuffix(newViewCountString);
    const formatted = (toValue / divisor)
      .toFixed(decimalPlaces)
      .replace(/\.0+$/, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    element.textContent = formatted;

    const suffixElement = document.getElementById(ELEMENT_IDS.viewSuffix);
    if (suffixElement) suffixElement.textContent = suffix;

    this.state.currentViewCount = toValue;
  }

  private async displayVideoInfo(
    viewCount: string,
    dateText: string,
    isUpdate = false,
    exactCount?: number,
  ): Promise<void> {
    if (this.state.isDestroyed) return;
    try {
      if (!viewCount) return;

      const newViewCount = exactCount ?? this.parser.parse(viewCount).count;
      const existingInfo = document.getElementById(ELEMENT_IDS.videoInfo);
      const viewCountElement = document.getElementById(ELEMENT_IDS.viewCount);

      if (isUpdate && existingInfo && viewCountElement) {
        if (newViewCount !== this.state.currentViewCount) {
          const diff = newViewCount - this.state.currentViewCount;
          const diffText = diff > 0 ? `+${diff}` : `${diff}`;
          console.log(
            "[WatchFeature] View count update:",
            viewCount,
            `(${diffText})`,
          );
          this.animateViewCount(
            viewCountElement,
            this.state.currentViewCount,
            viewCount,
            exactCount,
          );
        }

        const dateTextElement = document.getElementById(ELEMENT_IDS.dateText);
        if (dateTextElement && dateText !== this.state.currentDateText) {
          console.log("[WatchFeature] Date text update:", dateText);
          dateTextElement.textContent = dateText;
          this.state.currentDateText = dateText;
        }
        return;
      }

      existingInfo?.remove();

      this.state.currentViewCount = newViewCount;
      this.state.currentDateText = dateText;

      const titleElement = await waitForElement(
        "#above-the-fold > div#title-row",
      );
      if (this.state.isDestroyed || !titleElement) return;

      const { suffix, divisor, decimalPlaces } =
        this.parser.extractSuffix(viewCount);

      const infoWrapper = createElement("div", { id: ELEMENT_IDS.videoInfo });

      const infoContainer = createElement("div", { id: "info-container" });

      const viewCountContainer = createElement("span", {
        id: "viewcount-container",
      });

      const viewCountSpan = createElement("span", {
        id: ELEMENT_IDS.viewCount,
        style: { fontVariantNumeric: "tabular-nums" },
      });

      const initialValue = newViewCount / divisor;
      const formattedInitial = initialValue
        .toFixed(decimalPlaces)
        .replace(/\.0+$/, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      viewCountSpan.textContent = formattedInitial;

      const suffixSpan = createElement("span", {
        id: ELEMENT_IDS.viewSuffix,
        textContent: suffix,
      });

      viewCountContainer.append(viewCountSpan, suffixSpan);

      this.odometer = new Odometer({
        el: viewCountSpan,
        value: newViewCount / divisor,
        duration: 2000,
        format:
          decimalPlaces > 0 ? `(,ddd).${"d".repeat(decimalPlaces)}` : "(,ddd)",
        theme: "minimal",
      });

      const dateTextSpan = createElement("span", {
        id: ELEMENT_IDS.dateText,
        textContent: dateText,
      });

      infoContainer.append(
        viewCountContainer,
        this.createSeparator(),
        dateTextSpan,
      );

      if (this.state.videoBadges.length > 0) {
        for (const label of this.state.videoBadges) {
          const labelSpan = createElement("span");
          labelSpan.textContent = label;
          infoContainer.append(this.createSeparator(), labelSpan);
        }
      }

      infoWrapper.append(infoContainer, this.createRefreshButton());
      titleElement.insertAdjacentElement("afterend", infoWrapper);
      this.cleanupHandlers.push(
        () => this.odometer?.destroy(),
        () => (this.odometer = null),
        () => document.getElementById(ELEMENT_IDS.videoInfo)?.remove(),
      );
    } catch (error) {
      console.warn("[WatchFeature] Display video info error:", error);
    }
  }

  private createRefreshButton(): HTMLButtonElement {
    const button = createElement("button", { id: ELEMENT_IDS.refreshBtn });
    button.appendChild(
      buildSVG("0 0 24 24", [
        {
          d: "M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z",
          attrs: { fill: "currentColor" },
        },
      ]),
    );

    button.onclick = async () => {
      if (this.state.isDestroyed) return;
      try {
        const svg = button.querySelector<SVGElement>("svg");
        button.style.pointerEvents = "none";
        button.style.opacity = "0.5";
        if (svg) {
          svg.style.transition = "transform 0.5s ease";
          svg.style.transform = "rotate(360deg)";
        }

        await this.fetchAndLogVideoData(true);

        setTimeout(() => {
          if (this.state.isDestroyed) return;
          button.style.pointerEvents = "auto";
          button.style.opacity = "1";
          if (svg) svg.style.transform = "rotate(0deg)";
        }, 500);
      } catch (error) {
        console.warn("[WatchFeature] Refresh button error:", error);
        button.style.pointerEvents = "auto";
        button.style.opacity = "1";
      }
    };

    return button;
  }

  private displayDVRIndicator(isDVREnabled: boolean): void {
    if (this.state.isDestroyed) return;
    try {
      if (this.state.state !== VideoState.LIVE || isDVREnabled) return;

      const timeWrapper = document.querySelector<HTMLElement>(
        ELEMENT_SELECTORS.timeWrapper,
      );
      if (!timeWrapper) return;

      const indicator = createElement("div", { id: ELEMENT_IDS.dvrIndicator });

      const separator = createElement("span", {
        textContent: "•",
        style: { marginRight: "8px", fontSize: "1.6rem" },
      });

      const text = createElement("span", { textContent: "DVR Disabled" });

      indicator.append(separator, text);
      timeWrapper.appendChild(indicator);
      this.cleanupHandlers.push(() =>
        document.getElementById(ELEMENT_IDS.dvrIndicator)?.remove(),
      );
    } catch (error) {
      console.warn("[WatchFeature] Display DVR indicator error:", error);
    }
  }

  private displayReEdgeButton(): void {
    if (this.state.isDestroyed) return;
    try {
      if (this.state.state !== VideoState.LIVE) return;

      const timeWrapper = document.querySelector<HTMLElement>(
        ELEMENT_SELECTORS.timeWrapper,
      );
      if (!timeWrapper) return;

      const button = createElement("button", {
        id: ELEMENT_IDS.reEdgeButton,
        title: "Re-Edge",
        ariaLabel: "Re-Edge",
      });
      button.appendChild(
        buildSVG("0 0 24 24", [
          {
            d: "M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z",
            attrs: { fill: "currentColor" },
          },
        ]),
      );

      button.onclick = () => this.reEdge();
      this.patchTimeWrapper(timeWrapper);
      timeWrapper.appendChild(button);
      this.cleanupHandlers.push(() =>
        document.getElementById(ELEMENT_IDS.reEdgeButton)?.remove(),
      );
    } catch (error) {
      console.warn("[WatchFeature] Display re-edge button error:", error);
    }
  }

  private patchTimeWrapper(timeWrapper: HTMLElement): void {
    timeWrapper.classList.add("has-patched-pr");

    this.cleanupHandlers.push(() =>
      timeWrapper.classList.remove("has-patched-pr"),
    );
  }
}

const watchFeatureInstance = new WatchFeature();

export const watchFeature = {
  match: (path: string) => path === "/watch",
  init: () => watchFeatureInstance.init(),
  fetchVideoData: (url: string) => watchFeatureInstance.fetchVideoData(url),
} satisfies WatchFeatureInterface;
