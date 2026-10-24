// lib/sites/tiktok/features/feed/index.ts
//
// Feature path: "/", "/foryou", "/following".
//
// Self-contained on purpose: when you open this folder you see the whole
// behaviour for the feed. shared/ only provides primitives (playback policy,
// volume-switch lookup, predicates).

import type { Feature } from "@/lib/core/types/feature";
import { TIKTOK_EVENTS } from "../../events";
import type { TiktokSettingEventDetail } from "../../events";
import { loadTiktokConfig } from "../config-store";
import { sanitizeTiktokConfig } from "../../types";
import type { TiktokConfig } from "../../types";
import { PlaybackController } from "../shared/playback";
import { VolumeSwitch } from "../shared/volume-switch";

class FeedFeature {
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

    // `play` does not bubble, but capture phase still reaches document.
    document.addEventListener("play", onPlay, true);
    window.addEventListener(TIKTOK_EVENTS.setting, onSetting);

    // The first video may already be playing before this listener exists.
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

const feedFeatureInstance = new FeedFeature();

export const feedFeature = {
  match: (path: string) =>
    path === "/" || path === "/foryou" || path === "/following",
  init: () => feedFeatureInstance.init(),
} satisfies Feature;
