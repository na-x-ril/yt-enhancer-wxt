// lib/sites/tiktok/features/search/index.ts
//
// Feature path: "/search" (and nested search routes).
//
// Each result card can have its own autoplaying preview, so every video that
// is currently playing gets unmuted through its media element. Public surface
// is only { match, init }, same shape as watchFeature.

import type { Feature } from "@/lib/core/types/feature";
import { waitForElement } from "@/lib/core/utils";
import { TIKTOK_EVENTS } from "../../events";
import type { TiktokSettingEventDetail } from "../../events";
import {
  VOLUME_BUTTON_MUTED_SELECTOR,
  TIKTOK_SELECTORS,
} from "../../selectors";
import { sanitizeTiktokConfig } from "../../types";
import type { TiktokConfig } from "../../types";
import { loadTiktokConfig } from "../config-store";
import { PlaybackController } from "../shared/playback";

const VIDEO_TIMEOUT_MS = 10000;
const RECHECK_DELAY_MS = 300;

/** Nearest ancestor that owns a muted volume button — one per video card. */
function findMutedVolumeButtonFor(
  video: HTMLVideoElement,
): HTMLElement | null {
  let el: HTMLElement | null = video.parentElement;

  for (let depth = 0; el && depth < 8; depth++, el = el.parentElement) {
    const button = el.querySelector<HTMLElement>(
      VOLUME_BUTTON_MUTED_SELECTOR,
    );
    if (button) return button;
  }

  return null;
}

class SearchFeature {
  private config: TiktokConfig | null = null;
  private destroyed = false;
  private readonly recheckTimers = new Set<ReturnType<typeof setTimeout>>();
  private readonly playback = new PlaybackController(() => this.unmutePage());

  async init(): Promise<() => void> {
    this.destroyed = false;
    // storage -> elements -> execute
    this.config = await loadTiktokConfig();

    const onPlay = (event: Event) => {
      if (event.target instanceof HTMLVideoElement) {
        this.unmutePage(event.target);
      }
    };
    const onSetting = (event: Event) => this.handleSetting(event);

    // `play` does not bubble, but capture phase still reaches document.
    document.addEventListener("play", onPlay, true);
    window.addEventListener(TIKTOK_EVENTS.setting, onSetting);

    // Results may already be autoplaying before this listener exists.
    this.unmutePage();
    if (this.config.unmute) void this.waitForVideos();

    return () => {
      document.removeEventListener("play", onPlay, true);
      window.removeEventListener(TIKTOK_EVENTS.setting, onSetting);
      this.clearRechecks();
      this.playback.destroy();
      this.destroyed = true;
    };
  }

  private handleSetting(event: Event): void {
    const detail = (event as CustomEvent<TiktokSettingEventDetail>).detail;
    this.config = sanitizeTiktokConfig(detail?.config);

    if (this.config.unmute) {
      this.unmutePage();
    }
  }

  private unmutePage(focus?: HTMLVideoElement): void {
    if (this.destroyed || !this.config?.unmute) return;

    this.unmutePlayingVideos();
    if (focus) this.unmuteVideo(focus);
  }

  private unmutePlayingVideos(): void {
    const videos = document.querySelectorAll<HTMLVideoElement>(
      TIKTOK_SELECTORS.video,
    );
    for (const video of videos) {
      if (!video.paused && !video.ended) {
        this.unmuteVideo(video);
      }
    }
  }

  /**
   * Search cards re-apply `muted` when React re-renders, sometimes after our
   * initial unmute. One short re-check closes that gap without turning into a
   * permanent observer that would fight a manual mute.
   */
  private unmuteVideo(video: HTMLVideoElement): void {
    this.clickOrUnmute(video);

    const timer = setTimeout(() => {
      this.recheckTimers.delete(timer);
      if (this.destroyed || !this.config?.unmute) return;
      if (!video.paused && !video.ended && video.muted) {
        this.clickOrUnmute(video);
      }
    }, RECHECK_DELAY_MS);

    this.recheckTimers.add(timer);
  }

  /** Prefer the card's own button; fall back to the media element. */
  private clickOrUnmute(video: HTMLVideoElement): void {
    const button = findMutedVolumeButtonFor(video);

    if (button) {
      button.click();
      this.playback.checkPlayback(video);
      return;
    }

    this.playback.unmute(video);
  }

  private clearRechecks(): void {
    for (const timer of this.recheckTimers) clearTimeout(timer);
    this.recheckTimers.clear();
  }

  /**
   * document_idle can land before the list renders. Reuse the shared
   * waitForElement helper; after this, `play` events drive everything.
   */
  private async waitForVideos(): Promise<void> {
    if (document.querySelector(TIKTOK_SELECTORS.video)) return;

    await waitForElement(TIKTOK_SELECTORS.video, VIDEO_TIMEOUT_MS);
    if (this.destroyed) return;
    this.unmutePage();
  }
}

const searchFeatureInstance = new SearchFeature();

export const searchFeature = {
  match: (path: string) => path === "/search" || path.startsWith("/search/"),
  init: () => searchFeatureInstance.init(),
} satisfies Feature;
