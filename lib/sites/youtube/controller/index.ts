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
  private generation = 0;

  async sync(features: Feature[]): Promise<void> {
    const gen = ++this.generation;
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

    const cleanup = await nextFeature.init?.();

    if (gen !== this.generation) {
      cleanup?.();
      return;
    }

    this.active = {
      feature: nextFeature,
      videoId: currentVideoId,
      destroy: cleanup,
    };
  }

  destroyActive(): void {
    this.generation++;
    this.active?.destroy?.();
    this.active = null;
  }
}