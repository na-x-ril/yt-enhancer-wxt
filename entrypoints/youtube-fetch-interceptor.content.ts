// entrypoints/youtube-fetch-interceptor.content.ts

import { EVENTS } from "@/lib/sites/youtube/events";

export default defineContentScript({
  matches: ["*://www.youtube.com/*"],
  world: "MAIN",
  runAt: "document_start",
  main() {
    const win = window as unknown as Record<string, unknown>;

    if (win.__ytEnhancerFetchPatched) return;
    win.__ytEnhancerFetchPatched = true;

    const originalFetch = window.fetch.bind(window);

    Object.defineProperty(window, "fetch", {
      value: async function patchedFetch(
        input: RequestInfo | URL,
        init?: RequestInit,
      ): Promise<Response> {
        const response = await originalFetch(input, init);

        if (!location.pathname.startsWith("/watch")) return response;

        const url =
          typeof input === "string"
            ? input
            : input instanceof URL
              ? input.href
              : (input as Request).url;

        if (url?.includes("/youtubei/v1/updated_metadata")) {
          try {
            const data = await response.clone().json();
            // WEB currently ships updates as `frameworkUpdates`
            // (entityBatchUpdate mutations); older clients used `actions`.
            if (data.actions || data.frameworkUpdates) {
              window.dispatchEvent(
                new CustomEvent(EVENTS.metadataUpdate, {
                  detail: {
                    actions: data.actions,
                    frameworkUpdates: data.frameworkUpdates,
                  },
                }),
              );
            }
          } catch (error) {
            console.warn("Failed to parse metadata response:", error);
          }
        }

        return response;
      },
      writable: true,
      configurable: true,
    });
  },
});
