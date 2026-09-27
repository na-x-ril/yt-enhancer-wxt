import { storageBridge } from "@/lib/core/bridge/bridge";
import type { YouTubePlayer } from "../../types/player";
import { getVideoId } from "@/lib/core/utils";
import { fetchSegments, clearCache, isFullyDisabled } from "./api";
import { renderSegments, clearMarkers } from "./progress-bar";
import { showSkipButton, hideSkipButton } from "./skip-button";
import { STORAGE_KEY, DEFAULT_CONFIG, sanitizeSBConfig } from "./types";
import type { Segment, SponsorBlockConfig, SBMode } from "./types";

export class SponsorBlockManager {
  private config: SponsorBlockConfig = { ...DEFAULT_CONFIG };
  private segments: Segment[] = [];
  private player: YouTubePlayer | null = null;
  private videoId: string | null = null;
  private cleanupFns: Array<() => void> = [];
  private lastSegmentIndex = -1;
  private isDestroyed = false;
  private timeCheckInterval: ReturnType<typeof setInterval> | null = null;
  private currentSkipCallback: (() => void) | null = null;

  async init(player: YouTubePlayer): Promise<void> {
    if (this.isDestroyed) return;
    this.player = player;
    this.videoId = getVideoId();
    if (!this.videoId) return;

    await this.loadConfig();
    await this.fetchAndRender();
    this.registerListeners();
  }

  async onConfigChange(newConfig: SponsorBlockConfig): Promise<void> {
    this.config = newConfig;
    if (this.isDestroyed || !this.videoId) return;

    // Reset per-segment tracking so the current playback position is
    // re-evaluated under the new mode on the next tick. Without this,
    // switching mode while inside a segment (e.g. show_skip -> auto)
    // is ignored because checkCurrentSegment only reacts to transitions.
    this.lastSegmentIndex = -1;
    this.currentSkipCallback = null;
    hideSkipButton();

    if (isFullyDisabled(this.config)) {
      this.stopTimeCheck();
      clearMarkers();
      this.segments = [];
      return;
    }

    // Segment cache is keyed per video only, so a config change that
    // (de)activates categories must invalidate it. Otherwise a newly
    // enabled category stays missing until the cache expires.
    await clearCache(this.videoId);
    await this.fetchAndRender();
  }

  private async loadConfig(): Promise<void> {
    try {
      const saved = await storageBridge.get(STORAGE_KEY);
      this.config = sanitizeSBConfig(saved);
    } catch {
      console.warn("[SB] Failed to load config");
    }
  }

  private async fetchAndRender(): Promise<void> {
    if (!this.videoId || isFullyDisabled(this.config)) return;

    try {
      this.segments = await fetchSegments(this.videoId, this.config);
    } catch {
      this.segments = [];
    }

    renderSegments(this.segments, this.player?.getDuration() ?? 0);
    this.syncTimeCheck();
  }

  private startTimeCheck(): void {
    if (this.timeCheckInterval) return;
    this.timeCheckInterval = setInterval(() => {
      this.checkCurrentSegment();
    }, 250);
  }

  private stopTimeCheck(): void {
    if (this.timeCheckInterval !== null) {
      clearInterval(this.timeCheckInterval);
      this.timeCheckInterval = null;
    }
  }

  private syncTimeCheck(): void {
    if (this.segments.length > 0) {
      this.startTimeCheck();
    } else {
      this.stopTimeCheck();
    }
  }

  private handleKeydown = (e: KeyboardEvent): void => {
    if (e.key === "Enter" && this.currentSkipCallback) {
      this.currentSkipCallback();
      this.currentSkipCallback = null;
    }
  };

  private checkCurrentSegment(): void {
    const player = this.player;
    if (!player || this.isDestroyed || isFullyDisabled(this.config)) return;

    const currentTime = player.getCurrentTime();
    if (typeof currentTime !== "number") return;

    let foundIndex = -1;
    for (let i = 0; i < this.segments.length; i++) {
      const seg = this.segments[i];
      if (currentTime >= seg.segment[0] && currentTime < seg.segment[1]) {
        foundIndex = i;
        break;
      }
    }

    if (foundIndex === -1 && this.lastSegmentIndex === -1) return;

    if (foundIndex !== this.lastSegmentIndex) {
      this.lastSegmentIndex = foundIndex;

      if (foundIndex === -1) {
        this.currentSkipCallback = null;
        hideSkipButton();
        return;
      }

      const segment = this.segments[foundIndex];
      const mode = this.config.categories[segment.category] || "disabled";

      if (mode === "auto") {
        player.seekTo(segment.segment[1], true);
        this.lastSegmentIndex = -1;
      } else if (mode === "show_skip") {
        const onSkip = () => {
          player.seekTo(segment.segment[1], true);
          this.lastSegmentIndex = -1;
          this.currentSkipCallback = null;
          hideSkipButton();
        };
        this.currentSkipCallback = onSkip;
        showSkipButton(segment, onSkip);
      }
    }
  }

  private onSBConfigChange(newConfig: SponsorBlockConfig): void {
    void this.onConfigChange(newConfig);
  }

  private registerListeners(): void {
    const handleSetting = (e: Event) => {
      if (this.isDestroyed) return;
      const detail = (e as CustomEvent<{ type?: unknown; config?: unknown }>)
        .detail;
      if (!detail || detail.type !== "sponsorblock") return;
      this.onSBConfigChange(sanitizeSBConfig(detail.config));
    };

    window.addEventListener("yt-enhancer-sb-setting", handleSetting);
    document.addEventListener("keydown", this.handleKeydown);

    this.cleanupFns.push(() => {
      window.removeEventListener("yt-enhancer-sb-setting", handleSetting);
      document.removeEventListener("keydown", this.handleKeydown);
    });
  }

  async refreshCache(): Promise<void> {
    if (this.videoId) {
      await clearCache(this.videoId);
      await this.fetchAndRender();
    }
  }

  destroy(): void {
    this.isDestroyed = true;
    this.stopTimeCheck();
    hideSkipButton();
    clearMarkers();

    for (const fn of this.cleanupFns) {
      try {
        fn();
      } catch {}
    }
    this.cleanupFns = [];
    this.segments = [];
    this.player = null;
    this.lastSegmentIndex = -1;
    this.currentSkipCallback = null;
  }
}
