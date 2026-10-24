// entrypoints/youtube-main.content.ts

import { FeatureController } from "@/lib/core/controller";
import { FEATURES } from "@/lib/sites/youtube/features";
import { Dropdown } from "@/lib/sites/youtube/components/dropdown";
import {
  ELEMENT_IDS,
  ELEMENT_SELECTORS,
  getVideoId,
  waitForElement,
} from "@/lib/core/utils";
import "@/lib/sites/youtube/styles/style.scss";

class YouTubeContentScript {
  private controller: FeatureController;
  private dropdown: Dropdown | null = null;
  private lastHref: string = location.href;
  private lastPath: string = location.pathname;
  private lastVideoId: string | null = getVideoId();
  private observer: MutationObserver | null = null;
  private mutationRaf: number | null = null;
  private destroyed = false;

  constructor() {
    this.controller = new FeatureController({ getItemId: getVideoId });
  }

  async init(): Promise<void> {
    await this.controller.sync(FEATURES);
    await this.initDropdown();
    this.startObserver();
  }

  private async initDropdown(): Promise<void> {
    if (!this.dropdown) {
      this.dropdown = new Dropdown();
      await this.dropdown.init();
    }

    void this.waitForTargetAndInject();
  }

  private async waitForTargetAndInject(): Promise<void> {
    const target = await waitForElement(ELEMENT_SELECTORS.videoEnd, 15000);
    if (target && !this.destroyed) {
      this.dropdown?.inject();
    }
  }

  private startObserver(): void {
    this.observer = new MutationObserver(() => this.scheduleMutationCheck());
    this.observer.observe(document.body, { childList: true, subtree: true });
  }

  /**
   * YouTube mutates the DOM constantly (progress bar, view count, ads,
   * comments). Running the full check on every mutation is wasteful, so
   * coalesce to at most once per frame.
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
    // Parsing the URL is the only non-trivial work here, so gate it on an
    // actual href change instead of doing it on every mutation.
    const href = location.href;
    if (href !== this.lastHref) {
      this.lastHref = href;

      const currentPath = location.pathname;
      const currentVideoId = getVideoId();
      const pathChanged = currentPath !== this.lastPath;
      const videoChanged = currentVideoId !== this.lastVideoId;

      if (pathChanged || videoChanged) {
        this.lastPath = currentPath;
        this.lastVideoId = currentVideoId;
        void this.controller.sync(FEATURES);
      }
    }

    if (!document.querySelector(`#${ELEMENT_IDS.dropdown}`)) {
      this.dropdown?.inject();
    }
  }

  destroy(): void {
    this.destroyed = true;
    if (this.mutationRaf !== null) {
      cancelAnimationFrame(this.mutationRaf);
      this.mutationRaf = null;
    }
    this.observer?.disconnect();
    this.controller.destroyActive();
    this.dropdown?.destroy();
  }
}

export default defineContentScript({
  matches: ["*://www.youtube.com/*"],
  // The app (dropdown, watch, SponsorBlock) has nothing to do inside the
  // live-chat iframe, and its storage calls would hang forever because the
  // ISOLATED bridge deliberately excludes live_chat frames.
  excludeMatches: ["*://*.youtube.com/live_chat*"],
  runAt: "document_idle",
  allFrames: true,
  world: "MAIN",
  cssInjectionMode: "manifest",
  async main() {
    const script = new YouTubeContentScript();
    await script.init();
  },
});
