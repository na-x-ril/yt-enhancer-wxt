// lib/sites/youtube/features/watch/re-edge.ts
//
// Live "re-edge": briefly plays a live stream at 2x to catch up to the
// live edge, compensating for DVR buffering. Owns all of its runtime
// fields (previously scattered across the shared State); the host only
// supplies guards and the player.

import { ELEMENT_IDS } from "@/lib/core/utils";
import type { YouTubePlayer } from "../../types/player";

const RE_EDGE_SPEED = 2;
const RE_EDGE_TIMEOUT_MS = 60000;
const RE_EDGE_CLAMP_OFFSET = 1;

export interface ReEdgeHost {
  isDestroyed: () => boolean;
  isLive: () => boolean;
  getPlayer: () => YouTubePlayer | null;
  isDvrEnabled: () => boolean;
}

export class ReEdgeController {
  private active = false;
  private bufferingStart: number | null = null;
  private timeout: number | null = null;
  private listener: ((...args: unknown[]) => void) | null = null;

  constructor(private readonly host: ReEdgeHost) {}

  start(): void {
    if (this.host.isDestroyed() || !this.host.isLive()) return;
    if (this.active) return;
    const player = this.host.getPlayer();
    if (!player) return;
    const video = document.querySelector<HTMLVideoElement>(
      "video.html5-main-video",
    );
    if (!video) return;

    const isDVR = this.host.isDvrEnabled();
    this.active = true;
    this.bufferingStart = null;
    video.playbackRate = RE_EDGE_SPEED;
    this.setButtonState(true);

    const onStateChange = (...args: unknown[]) => {
      if (!this.active) return;
      const [state] = args;
      if (state === 3) {
        this.bufferingStart = Date.now();
      } else if (state === 1 && this.bufferingStart !== null) {
        const bufferingMs = Date.now() - this.bufferingStart;
        this.finish(isDVR, bufferingMs);
      } else if (state === 2) {
        this.finish(isDVR, 0);
      }
    };

    this.listener = onStateChange;
    player.addEventListener("onStateChange", onStateChange);
    this.timeout = window.setTimeout(() => {
      this.finish(isDVR, 0);
    }, RE_EDGE_TIMEOUT_MS);
    // NOTE: no per-start cleanup registration — destroy() aborts directly.
  }

  finish(isDVR: boolean, bufferingMs: number): void {
    if (!this.active) return;

    if (this.timeout !== null) {
      window.clearTimeout(this.timeout);
      this.timeout = null;
    }

    const player = this.host.getPlayer();
    if (player && this.listener) {
      player.removeEventListener("onStateChange", this.listener);
    }
    this.listener = null;

    if (isDVR && bufferingMs > 0) {
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
        } catch (error) {
          console.warn("[WatchFeature] Re-edge seek error:", error);
        }
      }
    }

    const video = document.querySelector<HTMLVideoElement>(
      "video.html5-main-video",
    );
    if (video) video.playbackRate = 1;

    this.active = false;
    this.bufferingStart = null;
    this.setButtonState(false);
  }

  abort(): void {
    if (!this.active) return;
    this.finish(this.host.isDvrEnabled(), 0);
  }

  private setButtonState(active: boolean): void {
    const button = document.getElementById(ELEMENT_IDS.reEdgeButton);
    if (button) button.classList.toggle("active", active);
  }

  private getLiveEdge(): number | null {
    const video = document.querySelector<HTMLVideoElement>(
      "video.html5-main-video",
    );
    if (!video || video.seekable.length === 0) return null;
    return video.seekable.end(video.seekable.length - 1);
  }
}
