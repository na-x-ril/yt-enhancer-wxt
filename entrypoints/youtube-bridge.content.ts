// entrypoints/youtube-bridge.content.ts

export default defineContentScript({
  matches: ["*://*.youtube.com/*"],
  excludeMatches: ["*://*.youtube.com/live_chat*"],
  runAt: "document_start",
  world: "ISOLATED",
  main() {
    window.addEventListener("message", async (event) => {
      if (event.source !== window) return;

      const { type, key, value } = event.data;

      switch (type) {
        case "YT_ENHANCER_GET": {
          const result = await browser.storage.local.get(key);
          window.postMessage(
            { type: "YT_ENHANCER_GET_RESPONSE", key, value: result[key] },
            "*",
          );
          break;
        }
        case "YT_ENHANCER_SET": {
          await browser.storage.local.set({ [key]: value });
          window.postMessage({ type: "YT_ENHANCER_SET_RESPONSE", key }, "*");
          break;
        }
        case "YT_ENHANCER_REMOVE": {
          await browser.storage.local.remove(key);
          window.postMessage({ type: "YT_ENHANCER_REMOVE_RESPONSE", key }, "*");
          break;
        }
        case "YT_ENHANCER_CLEAR": {
          await browser.storage.local.clear();
          window.postMessage({ type: "YT_ENHANCER_CLEAR_RESPONSE" }, "*");
          break;
        }
        case "YT_ENHANCER_GET_ALL": {
          const all = await browser.storage.local.get(null);
          window.postMessage(
            { type: "YT_ENHANCER_GET_ALL_RESPONSE", value: all },
            "*",
          );
          break;
        }
      }
    });
  },
});
