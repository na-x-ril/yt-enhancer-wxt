// entrypoints/tiktok-main.content.ts

import { FeatureController } from "@/lib/core/controller";
import { FEATURES } from "@/lib/sites/tiktok/features";
import { TiktokPopup } from "@/lib/sites/tiktok/components/popup";
import "@/lib/sites/tiktok/styles/style.scss";

class TikTokContentScript {
  private readonly controller = new FeatureController();
  private readonly popup = new TiktokPopup();
  private lastHref: string = location.href;
  private lastPath: string = location.pathname;
  private observer: MutationObserver | null = null;
  private mutationRaf: number | null = null;
  private destroyed = false;

  async init(): Promise<void> {
    await this.popup.init();
    await this.controller.sync(FEATURES);
    this.startObserver();
  }

  private startObserver(): void {
    this.observer = new MutationObserver(() => this.scheduleMutationCheck());
    this.observer.observe(document.body, { childList: true, subtree: true });
  }

  /**
   * TikTok mutates the DOM constantly (progress, timers, comments). Coalesce
   * to at most one check per frame, same approach as the YouTube script.
   */
  private scheduleMutationCheck(): void {
    if (this.mutationRaf !== null || this.destroyed) return;
    this.mutationRaf = requestAnimationFrame(() => {
      this.mutationRaf = null;
      if (this.destroyed) return;
      this.handleMutation();
    });
  }

  private handleMutation(): void {
    const href = location.href;
    if (href !== this.lastHref) {
      this.lastHref = href;

      const path = location.pathname;
      if (path !== this.lastPath) {
        this.lastPath = path;
        void this.controller.sync(FEATURES);
      }
    }

    this.popup.ensureMounted();
  }

  destroy(): void {
    this.destroyed = true;
    if (this.mutationRaf !== null) {
      cancelAnimationFrame(this.mutationRaf);
      this.mutationRaf = null;
    }
    this.observer?.disconnect();
    this.controller.destroyActive();
    this.popup.destroy();
  }
}

export default defineContentScript({
  matches: ["*://*.tiktok.com/*"],
  runAt: "document_idle",
  // ISOLATED on purpose: direct browser.storage access, no 5s bridge.
  world: "ISOLATED",
  cssInjectionMode: "manifest",
  async main() {
    const script = new TikTokContentScript();
    await script.init();
  },
});
