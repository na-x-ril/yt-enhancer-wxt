// lib/sites/tiktok/features/shared/playback.ts
//
// Playback-policy layer: audio blocked by the browser and the pause that can
// follow an unmute. Both page modes (feed/search) delegate here instead of
// duplicating the Chrome autoplay workarounds.

import { needsUnmute } from "./logic";

const RESUME_CHECK_DELAY_MS = 200;

export class PlaybackController {
  private gestureCleanup: (() => void) | null = null;
  private readonly resumeTimers = new Set<ReturnType<typeof setTimeout>>();
  private destroyed = false;

  constructor(private readonly onUserGesture: () => void) {}

  /** Chrome only allows unmuting after the user has interacted with the page. */
  waitForUserGesture(): void {
    if (this.gestureCleanup || this.destroyed) return;

    const gestures = ["pointerdown", "keydown"] as const;
    const handler = () => {
      this.clearGestureWait();
      // Activation lands with the event itself; defer one tick so
      // hasBeenActive is definitely true.
      setTimeout(() => this.onUserGesture(), 0);
    };

    for (const gesture of gestures) {
      document.addEventListener(gesture, handler, true);
    }

    this.gestureCleanup = () => {
      for (const gesture of gestures) {
        document.removeEventListener(gesture, handler, true);
      }
    };
  }

  /**
   * Removes `muted` without leaving the video paused when the browser still
   * blocks audible playback. Safe to call on an already-audible video.
   */
  unmute(video: HTMLVideoElement): void {
    if (!needsUnmute(video)) return;

    const wasPlaying = !video.paused && !video.ended;
    video.muted = false;
    if (video.volume === 0) video.volume = 1;
    if (wasPlaying) this.checkPlayback(video);
  }

  /** Exposed for the volume-switch flow, which only resumes (never unmutes). */
  checkPlayback(video: HTMLVideoElement): void {
    if (this.destroyed) return;
    if (video.paused && !video.ended) {
      this.scheduleResumeCheck(video);
    }
  }

  destroy(): void {
    this.destroyed = true;
    this.clearGestureWait();
    this.clearResumeTimers();
  }

  private scheduleResumeCheck(video: HTMLVideoElement): void {
    const timer = setTimeout(() => {
      this.resumeTimers.delete(timer);
      if (this.destroyed) return;
      if (video.paused && !video.ended) this.ensurePlaying(video);
    }, RESUME_CHECK_DELAY_MS);

    this.resumeTimers.add(timer);
  }

  private ensurePlaying(video: HTMLVideoElement): void {
    void video.play().catch((error) => this.handleBlockedAudio(video, error));
  }

  private handleBlockedAudio(video: HTMLVideoElement, error: unknown): void {
    console.warn(
      "[TikTokUnmute] Audible playback blocked by autoplay policy:",
      error,
    );

    // Keep the video playing (muted) instead of leaving it paused; retry the
    // audible version after the next real user gesture.
    video.muted = true;
    void video
      .play()
      .catch((playError) =>
        console.warn("[TikTokUnmute] Muted resume failed:", playError),
      );
    this.waitForUserGesture();
  }

  private clearGestureWait(): void {
    this.gestureCleanup?.();
    this.gestureCleanup = null;
  }

  private clearResumeTimers(): void {
    for (const timer of this.resumeTimers) clearTimeout(timer);
    this.resumeTimers.clear();
  }
}
