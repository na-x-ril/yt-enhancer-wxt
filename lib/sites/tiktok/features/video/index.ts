// lib/sites/tiktok/features/video/index.ts
//
// Feature path: /@user/video/:id and /video/:id — including the video opened
// from a search result.
//
// Self-contained on purpose: same behaviour as the feed, but visible here so
// the video-detail path can be read and changed on its own.

import type { Feature } from "@/lib/core/types/feature";
import { TIKTOK_EVENTS } from "../../events";
import type { TiktokSettingEventDetail } from "../../events";
import { loadTiktokConfig } from "../config-store";
import { sanitizeTiktokConfig } from "../../types";
import type { TiktokConfig } from "../../types";
import { PlaybackController } from "../shared/playback";
import { VolumeSwitch } from "../shared/volume-switch";

const VIDEO_PATH = /^\/@[^/]+\/video\//;
const SHORT_VIDEO_PATH = /^\/video\//;

class VideoFeature {
  private config: TiktokConfig | null = null;
  private destroyed = false;
  private readonly playback = new PlaybackController(() => this.unmute());
  private readonly volumeSwitch = new VolumeSwitch(this.playback);

  async init(): Promise<() => void> {
    this.destroyed = false;
    // storage -> element -> execute
    this.config = await loadTiktokConfig();

    const onPlay = (event: Event) => {
      if (event.target instanceof HTMLVideoElement) this.unmute();
    };
    const onSetting = (event: Event) => this.handleSetting(event);

    document.addEventListener("play", onPlay, true);
    window.addEventListener(TIKTOK_EVENTS.setting, onSetting);

    this.unmute();
    if (this.config.unmute) void this.volumeSwitch.waitAndRun();

    return () => {
      document.removeEventListener("play", onPlay, true);
      window.removeEventListener(TIKTOK_EVENTS.setting, onSetting);
      this.volumeSwitch.destroy();
      this.playback.destroy();
      this.destroyed = true;
    };
  }

  private handleSetting(event: Event): void {
    const detail = (event as CustomEvent<TiktokSettingEventDetail>).detail;
    this.config = sanitizeTiktokConfig(detail?.config);

    if (this.config.unmute) {
      this.unmute();
      void this.volumeSwitch.waitAndRun();
    }
  }

  private unmute(): void {
    if (this.destroyed || !this.config?.unmute) return;
    void this.volumeSwitch.run();
  }
}

const videoFeatureInstance = new VideoFeature();

export const videoFeature = {
  match: (path: string) =>
    VIDEO_PATH.test(path) || SHORT_VIDEO_PATH.test(path),
  init: () => videoFeatureInstance.init(),
} satisfies Feature;
