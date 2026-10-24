// lib/sites/tiktok/hidden-pause-guard.ts
//
// TikTok pauses its player when the tab becomes hidden. This MAIN-world guard
// patches HTMLMediaElement.prototype.pause and ignores pause() calls made
// while the document is hidden, unless the user just pressed something
// (manual pause). It is independent from the unmute flow.

const USER_INPUT_WINDOW_MS = 1000;

export class HiddenPauseGuard {
  private lastUserInputAt = 0;
  private destroyed = false;
  private readonly originalPause = HTMLMediaElement.prototype.pause;
  private cleanupFns: Array<() => void> = [];

  start(): void {
    const markUserInput = () => {
      this.lastUserInputAt = Date.now();
    };

    document.addEventListener("keydown", markUserInput, true);
    document.addEventListener("pointerdown", markUserInput, true);

    const guard = this;
    HTMLMediaElement.prototype.pause = function patchedPause(
      this: HTMLMediaElement,
    ): void {
      if (guard.destroyed) {
        guard.originalPause.call(this);
        return;
      }

      const userPausedRecently =
        Date.now() - guard.lastUserInputAt <= USER_INPUT_WINDOW_MS;
      if (document.hidden && !userPausedRecently) {
        return;
      }

      guard.originalPause.call(this);
    };

    this.cleanupFns.push(
      () => document.removeEventListener("keydown", markUserInput, true),
      () => document.removeEventListener("pointerdown", markUserInput, true),
    );
  }

  destroy(): void {
    this.destroyed = true;
    HTMLMediaElement.prototype.pause = this.originalPause;
    for (const cleanup of this.cleanupFns) cleanup();
    this.cleanupFns = [];
  }
}
