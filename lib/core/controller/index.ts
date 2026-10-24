// lib/core/controller/index.ts
//
// Shared feature lifecycle for all sites. Runs one active feature at a time,
// re-syncs on SPA navigation, and uses a generation counter so an async init
// that loses a race can never leave duplicate listeners behind.

import type { Feature } from "../types/feature";

interface ActiveFeature {
  feature: Feature;
  itemId: string | null;
  destroy?: () => void;
}

export interface FeatureControllerOptions {
  /**
   * Identity of the page's current item (YouTube: ?v=, TikTok: the active
   * video id). Returning the same value for the same page means `sync()`
   * can bail out early instead of restarting the feature.
   */
  getItemId?: () => string | null;
}

export class FeatureController {
  private active: ActiveFeature | null = null;
  private generation = 0;

  constructor(private readonly options: FeatureControllerOptions = {}) {}

  async sync(features: Feature[]): Promise<void> {
    const gen = ++this.generation;
    const path = location.pathname;
    const itemId = this.options.getItemId?.() ?? null;
    const nextFeature = features.find((f) => f.match(path)) ?? null;

    const isSameItem =
      this.active?.feature === nextFeature && this.active?.itemId === itemId;

    if (isSameItem) return;

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
      itemId,
      destroy: cleanup,
    };
  }

  destroyActive(): void {
    this.generation++;
    this.active?.destroy?.();
    this.active = null;
  }
}
