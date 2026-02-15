// entrypoints/youtube-main.content.ts

import { syncFeatures } from "@/lib/sites/youtube/controller";
import { FEATURES } from "@/lib/sites/youtube/features";
import { Dropdown } from "@/lib/sites/youtube/components/dropdown";
import { getVideoId } from "@/lib/core/utils";
import "@/lib/sites/youtube/styles/style.scss";

export default defineContentScript({
  matches: ["*://www.youtube.com/*"],
  runAt: "document_idle",
  world: "MAIN",
  cssInjectionMode: "manifest",
  main() {
    let dropdown: Dropdown | null = null;

    const initDropdown = async () => {
      if (!dropdown) {
        dropdown = new Dropdown();
        await dropdown.init();
      }

      const waitForTarget = setInterval(() => {
        const target = document.querySelector("#end");
        if (target) {
          clearInterval(waitForTarget);
          dropdown!.inject();
        }
      }, 100);
    };

    syncFeatures(FEATURES);
    initDropdown();

    let lastPath = location.pathname;
    let lastVideoId = getVideoId();

    const observer = new MutationObserver(() => {
      const currentPath = location.pathname;
      const currentVideoId = getVideoId();

      if (currentPath !== lastPath || currentVideoId !== lastVideoId) {
        lastPath = currentPath;
        lastVideoId = currentVideoId;
        syncFeatures(FEATURES);
      }

      if (!document.querySelector("#yt-enhancer-dropdown")) {
        dropdown?.inject();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  },
});
