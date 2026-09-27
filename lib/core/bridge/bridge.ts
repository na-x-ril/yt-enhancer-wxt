// lib/core/bridge/bridge.ts

const BRIDGE_TIMEOUT_MS = 5000;

function isBrowser(): boolean {
  return (
    typeof window !== "undefined" && typeof window.postMessage === "function"
  );
}

interface BridgeRequest {
  type: string;
  key?: string;
  value?: unknown;
}

interface BridgeResponse {
  type: string;
  key?: unknown;
  value?: unknown;
  error?: unknown;
}

function isBridgeResponse(data: unknown): data is BridgeResponse {
  return (
    typeof data === "object" &&
    data !== null &&
    typeof (data as BridgeResponse).type === "string"
  );
}

/**
 * Sends a request to the ISOLATED-world bridge and waits for its response.
 * Always settles: rejects on timeout or on an error response, and always
 * removes its message listener (no accumulation on failure).
 */
function request<T>(message: BridgeRequest, responseType: string): Promise<T> {
  if (!isBrowser()) {
    return Promise.reject(
      new Error("storageBridge: window.postMessage tidak tersedia"),
    );
  }

  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => {
      window.removeEventListener("message", handler);
      reject(
        new Error(
          `storageBridge: tidak ada respons ${responseType} dalam ${BRIDGE_TIMEOUT_MS}ms`,
        ),
      );
    }, BRIDGE_TIMEOUT_MS);

    const handler = (event: MessageEvent) => {
      if (event.source !== window || !isBridgeResponse(event.data)) return;
      const data = event.data;
      if (data.type !== responseType) return;
      if (message.key !== undefined && data.key !== message.key) return;

      clearTimeout(timer);
      window.removeEventListener("message", handler);

      if (typeof data.error === "string") {
        reject(new Error(data.error));
      } else {
        resolve(data.value as T);
      }
    };

    window.addEventListener("message", handler);
    window.postMessage(message, "*");
  });
}

export const storageBridge = {
  get: (key: string): Promise<any> =>
    request({ type: "YT_ENHANCER_GET", key }, "YT_ENHANCER_GET_RESPONSE"),

  set: (key: string, value: any): Promise<void> =>
    request(
      { type: "YT_ENHANCER_SET", key, value },
      "YT_ENHANCER_SET_RESPONSE",
    ),

  remove: (key: string): Promise<void> =>
    request(
      { type: "YT_ENHANCER_REMOVE", key },
      "YT_ENHANCER_REMOVE_RESPONSE",
    ),

  clear: (): Promise<void> =>
    request({ type: "YT_ENHANCER_CLEAR" }, "YT_ENHANCER_CLEAR_RESPONSE"),

  getAll: (): Promise<Record<string, any>> =>
    request({ type: "YT_ENHANCER_GET_ALL" }, "YT_ENHANCER_GET_ALL_RESPONSE"),
};

// Hanya definisikan properti __storage jika window ada
if (typeof window !== "undefined") {
  (window as any).__storage = storageBridge;
}
