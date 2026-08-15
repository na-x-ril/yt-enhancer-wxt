// entrypoints/youtube-codec-patch.content.ts

import { CodecInterceptor } from "@/lib/sites/youtube/features/codec";

export default defineContentScript({
  matches: ["*://*.youtube.com/*"],
  excludeMatches: ["*://*.youtube.com/live_chat*"],
  allFrames: true,
  world: "MAIN",
  runAt: "document_start",
  main() {
    const interceptor = CodecInterceptor.shared;

    interceptor.patch();
    interceptor.subscribe();
    void interceptor.loadConfig();
  },
});