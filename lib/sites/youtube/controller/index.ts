// lib/sites/youtube/controller/index.ts

import type { Feature } from "../types/feature";
import { getVideoId } from "@/lib/core/utils";

interface ActiveFeature {
  feature: Feature;
  videoId: string | null;
  destroy?: () => void;
}

export class FeatureController {
  private active: ActiveFeature | null = null;

  async sync(features: Feature[]): Promise<void> {
    const path = location.pathname;
    const currentVideoId = getVideoId();
    const nextFeature = features.find((f) => f.match(path)) ?? null;

    const isSameVideo =
      this.active?.feature === nextFeature &&
      this.active?.videoId === currentVideoId;

    if (isSameVideo) return;

    this.active?.destroy?.();

    if (!nextFeature) {
      this.active = null;
      return;
    }

    const cleanupOrPromise = nextFeature.init?.();
    const cleanup =
      cleanupOrPromise instanceof Promise
        ? await cleanupOrPromise
        : (cleanupOrPromise as (() => void) | undefined);

    this.active = {
      feature: nextFeature,
      videoId: currentVideoId,
      destroy: cleanup,
    };
  }

  destroyActive(): void {
    this.active?.destroy?.();
    this.active = null;
  }
}
