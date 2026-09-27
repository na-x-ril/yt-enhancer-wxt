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
    // document_start can race the ISOLATED bridge (its message listener
    // may not be registered yet when this posts). Retry once; if that
    // also fails the interceptor keeps defaults until the next
    // codec-setting broadcast heals it.
    void interceptor.loadConfig().catch(() => {
      setTimeout(() => {
        void interceptor.loadConfig().catch((error) => {
          console.warn("[Codec] Failed to load config after retry:", error);
        });
      }, 1000);
    });
  },
});