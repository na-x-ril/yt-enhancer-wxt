import { storageBridge } from '@/lib/core/bridge/bridge';
import type { YouTubePlayer } from '../../types/player';
import { getVideoId } from '@/lib/core/utils';
import { fetchSegments, clearCache, getActiveCategories, isFullyDisabled } from './api';
import { renderSegments, clearMarkers } from './progress-bar';
import { showSkipButton, hideSkipButton } from './skip-button';
import { STORAGE_KEY, DEFAULT_CONFIG, ALL_CATEGORIES } from './types';
import type { Segment, SponsorBlockConfig, SBMode } from './types';

export class SponsorBlockManager {
  private config: SponsorBlockConfig = { ...DEFAULT_CONFIG };
  private segments: Segment[] = [];
  private player: YouTubePlayer | null = null;
  private videoId: string | null = null;
  private cleanupFns: Array<() => void> = [];
  private lastSegmentIndex = -1;
  private isDestroyed = false;
  private timeCheckInterval: ReturnType<typeof setInterval> | null = null;

  async init(player: YouTubePlayer): Promise<void> {
    if (this.isDestroyed) return;
    this.player = player;
    this.videoId = getVideoId();
    if (!this.videoId) return;

    await this.loadConfig();
    await this.fetchAndRender();
    this.startTimeCheck();
    this.registerListeners();
  }

  async onConfigChange(newConfig: SponsorBlockConfig): Promise<void> {
    this.config = newConfig;
    if (this.isDestroyed || !this.videoId) return;

    if (isFullyDisabled(this.config)) {
      this.cleanupTimeCheck();
      clearMarkers();
      hideSkipButton();
      this.segments = [];
      return;
    }

    await this.fetchAndRender();
    if (!this.timeCheckInterval) this.startTimeCheck();
  }

  private async loadConfig(): Promise<void> {
    try {
      const saved = await storageBridge.get(STORAGE_KEY);
      if (saved) {
        this.config = { ...DEFAULT_CONFIG, ...saved };
        if (saved.categories) {
          this.config.categories = {
            ...DEFAULT_CONFIG.categories,
            ...saved.categories,
          };
        }
      }
    } catch {
      console.warn('[SB] Failed to load config');
    }
  }

  private async fetchAndRender(): Promise<void> {
    if (!this.videoId || isFullyDisabled(this.config)) return;

    try {
      this.segments = await fetchSegments(this.videoId, this.config);
    } catch (error) {
      console.warn('[SB] Fetch error:', error);
      this.segments = [];
    }

    this.renderProgressBar();
  }

  private renderProgressBar(): void {
    if (isFullyDisabled(this.config)) {
      clearMarkers();
      return;
    }

    const duration = this.player?.getDuration();
    if (!duration || duration <= 0 || this.segments.length === 0) {
      clearMarkers();
      return;
    }

    const cleanup = renderSegments(this.segments, duration);
    this.cleanupFns.push(cleanup);
  }

  private startTimeCheck(): void {
    this.cleanupTimeCheck();

    this.timeCheckInterval = setInterval(() => {
      this.checkCurrentSegment();
    }, 500);
  }

  private cleanupTimeCheck(): void {
    if (this.timeCheckInterval !== null) {
      clearInterval(this.timeCheckInterval);
      this.timeCheckInterval = null;
    }
  }

  private checkCurrentSegment(): void {
    if (!this.player || this.isDestroyed || isFullyDisabled(this.config)) {
      return;
    }

    const currentTime = this.player.getCurrentTime();
    if (typeof currentTime !== 'number') return;

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
        hideSkipButton();
        return;
      }

      const segment = this.segments[foundIndex];
      const mode = this.config.categories[segment.category] || 'disabled';

      if (mode === 'auto') {
        this.player!.seekTo(segment.segment[1], true);
        this.lastSegmentIndex = -1;
      } else if (mode === 'show_skip') {
        showSkipButton(segment, () => {
          this.player!.seekTo(segment.segment[1], true);
          this.lastSegmentIndex = -1;
        });
      }
    }
  }

  private onSBConfigChange(newConfig: SponsorBlockConfig): void {
    void this.onConfigChange(newConfig);
  }

  private registerListeners(): void {
    const handleSetting = (e: Event) => {
      if (this.isDestroyed) return;
      const detail = (e as CustomEvent).detail;
      if (!detail || detail.type !== 'sponsorblock') return;
      this.onSBConfigChange(detail.config as SponsorBlockConfig);
    };

    window.addEventListener('yt-enhancer-sb-setting', handleSetting);
    this.cleanupFns.push(() =>
      window.removeEventListener('yt-enhancer-sb-setting', handleSetting),
    );
  }

  async refreshCache(): Promise<void> {
    if (this.videoId) {
      await clearCache(this.videoId);
      await this.fetchAndRender();
    }
  }

  destroy(): void {
    this.isDestroyed = true;
    this.cleanupTimeCheck();
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
  }
}
