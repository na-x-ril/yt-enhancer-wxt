function get<T = unknown>(obj: unknown, ...keys: string[]): T | undefined {
  let cur: unknown = obj;
  for (const key of keys) {
    if (cur == null || typeof cur !== "object") return;
    cur = (cur as Record<string, unknown>)[key];
  }
  return cur as T | undefined;
}

function patchYtInitialData(): void {
  if (
    location.pathname !== "/live_chat" &&
    location.pathname !== "/live_chat_replay"
  ) {
    return;
  }

  let originalData: unknown;

  Object.defineProperty(window, "ytInitialData", {
    get() {
      return originalData;
    },
    set(value: unknown) {
      if (value && typeof value === "object") {
        try {
          const items = get<Array<Record<string, unknown>>>(
            value,
            "continuationContents",
            "liveChatContinuation",
            "header",
            "liveChatHeaderRenderer",
            "viewSelector",
            "sortFilterSubMenuRenderer",
            "subMenuItems",
          );

          if (items) {
            const liveChat = items.find(
              (item) =>
                typeof item.title === "string" &&
                item.title.toLowerCase().includes("live chat"),
            );
            const topChat = items.find(
              (item) =>
                typeof item.title === "string" &&
                item.title.toLowerCase().includes("top chat"),
            );

            if (liveChat && topChat) {
              liveChat.selected = true;
              topChat.selected = false;

              const liveChatContinuation = get<string>(
                liveChat,
                "continuation",
                "reloadContinuationData",
                "continuation",
              );

              if (liveChatContinuation) {
                const continuations = get<Array<Record<string, unknown>>>(
                  value,
                  "continuationContents",
                  "liveChatContinuation",
                  "continuations",
                );

                if (continuations?.[0]) {
                  const firstEntry = continuations[0];
                  const contKey = Object.keys(firstEntry)[0];
                  if (contKey !== undefined) {
                    const contData = firstEntry[contKey] as
                      | Record<string, unknown>
                      | undefined;
                    if (contData && "continuation" in contData) {
                      contData.continuation = liveChatContinuation;
                    }
                  }
                }
              }
            }
          }
        } catch {
          // non-critical
        }
      }

      originalData = value;
    },
    configurable: true,
    enumerable: true,
  });
}

export default defineContentScript({
  matches: [
    "*://www.youtube.com/live_chat*",
    "*://www.youtube.com/live_chat_replay*",
  ],
  allFrames: true,
  world: "MAIN",
  runAt: "document_start",
  main: patchYtInitialData,
});
