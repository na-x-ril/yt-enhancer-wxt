// lib/core/bridge/bridge.ts

function isBrowser(): boolean {
  return (
    typeof window !== "undefined" && typeof window.postMessage === "function"
  );
}

export const storageBridge = {
  get: (key: string): Promise<any> => {
    if (!isBrowser()) {
      return Promise.reject(
        new Error("storageBridge.get: window.postMessage tidak tersedia"),
      );
    }
    return new Promise((resolve) => {
      window.postMessage({ type: "YT_ENHANCER_GET", key }, "*");
      const handler = (event: MessageEvent) => {
        if (
          event.source === window &&
          event.data.type === "YT_ENHANCER_GET_RESPONSE" &&
          event.data.key === key
        ) {
          window.removeEventListener("message", handler);
          resolve(event.data.value);
        }
      };
      window.addEventListener("message", handler);
    });
  },

  set: (key: string, value: any): Promise<void> => {
    if (!isBrowser())
      return Promise.reject(
        new Error("storageBridge.set: window.postMessage tidak tersedia"),
      );
    return new Promise((resolve) => {
      window.postMessage({ type: "YT_ENHANCER_SET", key, value }, "*");
      const handler = (event: MessageEvent) => {
        if (
          event.source === window &&
          event.data.type === "YT_ENHANCER_SET_RESPONSE" &&
          event.data.key === key
        ) {
          window.removeEventListener("message", handler);
          resolve();
        }
      };
      window.addEventListener("message", handler);
    });
  },

  remove: (key: string): Promise<void> => {
    if (!isBrowser())
      return Promise.reject(
        new Error("storageBridge.remove: window.postMessage tidak tersedia"),
      );
    return new Promise((resolve) => {
      window.postMessage({ type: "YT_ENHANCER_REMOVE", key }, "*");
      const handler = (event: MessageEvent) => {
        if (
          event.source === window &&
          event.data.type === "YT_ENHANCER_REMOVE_RESPONSE" &&
          event.data.key === key
        ) {
          window.removeEventListener("message", handler);
          resolve();
        }
      };
      window.addEventListener("message", handler);
    });
  },

  clear: (): Promise<void> => {
    if (!isBrowser())
      return Promise.reject(
        new Error("storageBridge.clear: window.postMessage tidak tersedia"),
      );
    return new Promise((resolve) => {
      window.postMessage({ type: "YT_ENHANCER_CLEAR" }, "*");
      const handler = (event: MessageEvent) => {
        if (
          event.source === window &&
          event.data.type === "YT_ENHANCER_CLEAR_RESPONSE"
        ) {
          window.removeEventListener("message", handler);
          resolve();
        }
      };
      window.addEventListener("message", handler);
    });
  },

  getAll: (): Promise<Record<string, any>> => {
    if (!isBrowser())
      return Promise.reject(
        new Error("storageBridge.getAll: window.postMessage tidak tersedia"),
      );
    return new Promise((resolve) => {
      window.postMessage({ type: "YT_ENHANCER_GET_ALL" }, "*");
      const handler = (event: MessageEvent) => {
        if (
          event.source === window &&
          event.data.type === "YT_ENHANCER_GET_ALL_RESPONSE"
        ) {
          window.removeEventListener("message", handler);
          resolve(event.data.value);
        }
      };
      window.addEventListener("message", handler);
    });
  },

  clearByPrefix: async (prefix: string): Promise<void> => {
    const all = await storageBridge.getAll();
    const keysToRemove = Object.keys(all).filter((key) =>
      key.startsWith(prefix),
    );
    await Promise.all(keysToRemove.map((key) => storageBridge.remove(key)));
  },

  clearByPattern: async (pattern: RegExp): Promise<void> => {
    const all = await storageBridge.getAll();
    const keysToRemove = Object.keys(all).filter((key) => pattern.test(key));
    await Promise.all(keysToRemove.map((key) => storageBridge.remove(key)));
  },
};

// Hanya definisikan properti __storage jika window ada
if (typeof window !== "undefined") {
  (window as any).__storage = storageBridge;
}
