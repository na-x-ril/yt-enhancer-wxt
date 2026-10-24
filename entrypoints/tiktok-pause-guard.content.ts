// entrypoints/tiktok-pause-guard.content.ts
//
// MAIN world is required: the guard patches the page's
// HTMLMediaElement.prototype.pause, which isolated worlds cannot affect.
// Kept separate from the unmute app so this feature stays independent.

import { HiddenPauseGuard } from "@/lib/sites/tiktok/hidden-pause-guard";

export default defineContentScript({
  matches: ["*://*.tiktok.com/*"],
  runAt: "document_start",
  world: "MAIN",
  allFrames: true,
  main() {
    new HiddenPauseGuard().start();
  },
});
