// lib/sites/youtube/features/watch/index.ts
//
// Watch-page orchestrator: init/destroy lifecycle, config, event wiring,
// and the fetch-then-handle sequence. Heavy lifting lives in modules:
//   player-data.ts    page fetch + parse + derived data (pure)
//   view-count-parser.ts  locale view-count parsing (pure)
//   metadata-update.ts    live update parsing (pure)
//   time-tracking.ts  resume-playback (state-param functions)
//   video-info.ts     info/badges/DVR UI (VideoInfoView)
//   re-edge.ts        live catch-up (ReEdgeController)

import type { WatchFeatureInterface, YouTubePlayer } from "../../types";
import type {
  UpdateDateTextAction,
  UpdateViewershipAction,
} from "../../types/VideoData";
import {
  ELEMENT_SELECTORS,
  getVideoId,
  waitForElement,
  waitForPlayer,
} from "@/lib/core/utils";
import { SponsorBlockManager } from "../sponsorblock";
import { loadFeatureConfig } from "../config-store";
import {
  BooleanKeys,
  Config,
  DEFAULT_CONFIG,
  isQuality,
  normalizeSavedConfig,
  Quality,
  SettingEvent,
  State,
  VideoState,
} from "../../types/player";
import {
  fetchVideoData,
  getAvailableCodecs,
  getAvailableQualities,
  getDateText,
  getDVREnabled,
  getVideoBadges,
  getVideoState,
  getViewCount,
  selectBestQuality,
} from "./player-data";
import {
  restoreTime,
  saveTime,
  setupTimeTracking,
} from "./time-tracking";
import { parseMetadataActions } from "./metadata-update";
import { VideoInfoView } from "./video-info";
import { ReEdgeController } from "./re-edge";

class WatchFeature {
  private state: State = this.createInitialState();
  private config: Config = { ...DEFAULT_CONFIG };
  private timeTrackingCleanup: (() => void) | null = null;
  private metadataHandler: ((event: Event) => void) | null = null;
  private cleanupHandlers: Array<() => void> = [];
  private metadataListenerAttached = false;
  private sbManager: SponsorBlockManager | null = null;
  private readonly videoInfo = new VideoInfoView({
    registerCleanup: (fn) => this.cleanupHandlers.push(fn),
    isDestroyed: () => this.state.isDestroyed,
    refreshVideoData: () => this.fetchAndLogVideoData(true),
  });
  private readonly reEdge = new ReEdgeController({
    isDestroyed: () => this.state.isDestroyed,
    isLive: () => this.state.state === VideoState.LIVE,
    getPlayer: () => this.state.player,
    isDvrEnabled: () =>
      this.state.playerResponse?.videoDetails.isLiveDvrEnabled === true,
  });

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
    };
  }

  async init(): Promise<() => void> {
    const currentId = getVideoId();
    const previousId = this.state.id;

    if (previousId && previousId !== currentId) {
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
      this.timeTrackingCleanup = setupTimeTracking(
        this.state,
        this.state.player,
      );
      await restoreTime(this.state);
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

    try {
      this.reEdge.abort();
    } catch (error) {
      console.warn("[WatchFeature] Re-edge abort error:", error);
    }

    for (const fn of this.cleanupHandlers) {
      try {
        fn();
      } catch (error) {
        console.warn("[WatchFeature] Cleanup error:", error);
      }
    }
    this.cleanupHandlers = [];

    try {
      this.timeTrackingCleanup?.();
    } catch (error) {
      console.warn("[WatchFeature] Time tracking cleanup error:", error);
    }
    this.timeTrackingCleanup = null;

    this.state = this.createInitialState();
  }

  private async loadConfig(): Promise<void> {
    this.config = await loadFeatureConfig(
      "dropdown_config",
      "dropdown config",
      normalizeSavedConfig,
    );
  }

  private registerEventListeners(): void {
    const handleBeforeUnload = () => void saveTime(this.state);
    const handleVisibilityChange = () =>
      document.hidden && void saveTime(this.state);
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

    const handler = (event: Event) => {
      if (this.state.isDestroyed) return;
      const detail = (
        event as CustomEvent<{
          actions?: Array<UpdateViewershipAction | UpdateDateTextAction>;
        }>
      ).detail;
      if (!detail || !Array.isArray(detail.actions)) return;
      this.handleMetadataUpdate(detail.actions);
    };

    this.metadataHandler = handler;
    window.addEventListener("yt-enhancer-metadata-update", handler);

    this.cleanupHandlers.push(() => {
      if (this.metadataHandler) {
        window.removeEventListener(
          "yt-enhancer-metadata-update",
          this.metadataHandler,
        );
        this.metadataHandler = null;
      }
      this.metadataListenerAttached = false;
    });
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
      await restoreTime(this.state);
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
          // The previous cleanup (if any) is invoked before re-setup, and
          // destroy() always runs the current one — no need to register
          // per-refresh closures (they would accumulate).
          this.timeTrackingCleanup?.();
          this.timeTrackingCleanup = setupTimeTracking(
            this.state,
            this.state.player,
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
      const update = parseMetadataActions(actions);
      if (!update) return;
      void this.videoInfo.displayVideoInfo(
        this.state,
        update.viewCount ?? "",
        update.dateText ?? this.state.currentDateText,
        true,
        update.exactCount,
      );
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

  private async fetchAndLogVideoData(isUpdate = false): Promise<void> {
    if (this.state.isDestroyed) return;
    try {
      const data = await fetchVideoData(location.href);
      if (this.state.isDestroyed) return;

      if (!data.ytInitialData || !data.ytInitialPlayerResponse) return;

      const ytInitialDataObj = data.ytInitialData;
      const ytInitialPlayerResponseObj = data.ytInitialPlayerResponse;

      this.state.playerResponse = ytInitialPlayerResponseObj;

      const { video, audio } = getAvailableCodecs(ytInitialPlayerResponseObj);
      window.dispatchEvent(
        new CustomEvent("yt-enhancer-codecs-updated", {
          detail: { video, audio },
        }),
      );

      this.state.state = getVideoState(
        ytInitialPlayerResponseObj.microformat.playerMicroformatRenderer,
        ytInitialPlayerResponseObj.videoDetails,
      );

      const viewCount = getViewCount(ytInitialDataObj, this.state.state);
      const dateText = getDateText(
        ytInitialDataObj,
        ytInitialPlayerResponseObj,
        this.state.state,
      );

      this.state.videoBadges = getVideoBadges(ytInitialDataObj, this.state.state);

      if (this.state.isDestroyed) return;

      if (viewCount && dateText) {
        await this.videoInfo.displayVideoInfo(
          this.state,
          viewCount,
          dateText,
          isUpdate,
        );
      }

      if (this.state.state === VideoState.LIVE) {
        const isDVREnabled = getDVREnabled(ytInitialPlayerResponseObj);
        await waitForElement(ELEMENT_SELECTORS.timeWrapper, 5000);
        if (!this.state.isDestroyed)
          this.videoInfo.displayDVRIndicator(this.state, isDVREnabled);
        if (!this.state.isDestroyed)
          this.videoInfo.displayReEdgeButton(this.state, () =>
            this.reEdge.start(),
          );
      }
    } catch (error) {
      console.warn("[WatchFeature] Fetch video data error:", error);
    }
  }
}

const watchFeatureInstance = new WatchFeature();

export const watchFeature = {
  match: (path: string) => path === "/watch",
  init: () => watchFeatureInstance.init(),
  fetchVideoData: (url: string) => fetchVideoData(url),
} satisfies WatchFeatureInterface;
