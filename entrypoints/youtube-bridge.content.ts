// entrypoints/youtube-bridge.content.ts

const KNOWN_REQUESTS = new Set([
  "YT_ENHANCER_GET",
  "YT_ENHANCER_SET",
  "YT_ENHANCER_REMOVE",
  "YT_ENHANCER_CLEAR",
  "YT_ENHANCER_GET_ALL",
]);

interface BridgeRequest {
  type: string;
  key: string;
  value?: unknown;
}

function isBridgeRequest(data: unknown): data is BridgeRequest {
  return (
    typeof data === "object" &&
    data !== null &&
    typeof (data as BridgeRequest).type === "string"
  );
}

export default defineContentScript({
  matches: ["*://*.youtube.com/*"],
  excludeMatches: ["*://*.youtube.com/live_chat*"],
  // All frames: MAIN-world scripts (codec patch, dropdown) run with
  // allFrames:true and post to their OWN window. Without this, any
  // storage call from a subframe hangs until the bridge timeout.
  allFrames: true,
  runAt: "document_start",
  world: "ISOLATED",
  main() {
    window.addEventListener("message", async (event) => {
      if (event.source !== window || !isBridgeRequest(event.data)) return;

      const { type, key, value } = event.data;
      // Ignore messages posted by the page itself (YouTube posts many).
      if (!KNOWN_REQUESTS.has(type)) return;

      const responseType = `${type}_RESPONSE`;
      try {
        switch (type) {
          case "YT_ENHANCER_GET": {
            const result = await browser.storage.local.get(key);
            window.postMessage(
              { type: responseType, key, value: result[key] },
              "*",
            );
            break;
          }
          case "YT_ENHANCER_SET": {
            await browser.storage.local.set({ [key]: value });
            window.postMessage({ type: responseType, key }, "*");
            break;
          }
          case "YT_ENHANCER_REMOVE": {
            await browser.storage.local.remove(key);
            window.postMessage({ type: responseType, key }, "*");
            break;
          }
          case "YT_ENHANCER_CLEAR": {
            await browser.storage.local.clear();
            window.postMessage({ type: responseType, key }, "*");
            break;
          }
          case "YT_ENHANCER_GET_ALL": {
            const all = await browser.storage.local.get(null);
            window.postMessage({ type: responseType, key, value: all }, "*");
            break;
          }
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.warn(`[YT-Enhancer] Storage bridge failed for ${type}:`, error);
        window.postMessage({ type: responseType, key, error: message }, "*");
      }
    });
  },
});
