// lib/sites/tiktok/features/shared/volume-switch.ts
//
// Main-player pages (feed, video detail). The selector itself only matches a
// button that reports aria-pressed="false" (muted), so there is no manual
// state query: find the topmost muted button, then press it.

import { waitForElement } from "@/lib/core/utils";
import {
  VOLUME_BUTTON_MUTED_SELECTOR,
  TIKTOK_SELECTORS,
} from "../../selectors";
import type { PlaybackController } from "./playback";

const SWITCH_TIMEOUT_MS = 10000;
const ACTION_TIMEOUT_MS = 1500;

export class VolumeSwitch {
  private destroyed = false;

  constructor(private readonly playback: PlaybackController) {}

  /** Initial wait: use the full timeout while the player UI hydrates. */
  async waitAndRun(): Promise<void> {
    await this.run(SWITCH_TIMEOUT_MS);
  }

  async run(timeoutMs: number = ACTION_TIMEOUT_MS): Promise<void> {
    if (this.destroyed) return;

    const button = await waitForElement<HTMLElement>(
      VOLUME_BUTTON_MUTED_SELECTOR,
      timeoutMs,
    );
    if (!button || this.destroyed) return;

    button.click();

    const video = document.querySelector<HTMLVideoElement>(
      TIKTOK_SELECTORS.video,
    );
    if (video) this.playback.checkPlayback(video);
  }

  destroy(): void {
    this.destroyed = true;
  }
}
