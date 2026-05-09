// entrypoints/youtube-main.content.ts

import { FeatureController } from "@/lib/sites/youtube/controller";
import { FEATURES } from "@/lib/sites/youtube/features";
import { Dropdown } from "@/lib/sites/youtube/components/dropdown";
import { getVideoId } from "@/lib/core/utils";
import "@/lib/sites/youtube/styles/style.scss";

class YouTubeContentScript {
  private controller: FeatureController;
  private dropdown: Dropdown | null = null;
  private lastPath: string = location.pathname;
  private lastVideoId: string | null = getVideoId();
  private observer: MutationObserver | null = null;

  constructor() {
    this.controller = new FeatureController();
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

    this.waitForTargetAndInject();
  }

  private waitForTargetAndInject(): void {
    const interval = setInterval(() => {
      const target = document.querySelector("#end");
      if (target) {
        clearInterval(interval);
        this.dropdown!.inject();
      }
    }, 100);
  }

  private startObserver(): void {
    this.observer = new MutationObserver(() => this.handleMutation());
    this.observer.observe(document.body, { childList: true, subtree: true });
  }

  private handleMutation(): void {
    const currentPath = location.pathname;
    const currentVideoId = getVideoId();

    const pathChanged = currentPath !== this.lastPath;
    const videoChanged = currentVideoId !== this.lastVideoId;

    if (pathChanged || videoChanged) {
      this.lastPath = currentPath;
      this.lastVideoId = currentVideoId;
      this.controller.sync(FEATURES);
    }

    if (!document.querySelector("#yt-enhancer-dropdown")) {
      this.dropdown?.inject();
    }
  }

  destroy(): void {
    this.observer?.disconnect();
    this.controller.destroyActive();
    this.dropdown?.destroy();
  }
}

export default defineContentScript({
  matches: ["*://www.youtube.com/*"],
  runAt: "document_idle",
  allFrames: true,
  world: "MAIN",
  cssInjectionMode: "manifest",
  async main() {
    const script = new YouTubeContentScript();
    await script.init();
  },
});
