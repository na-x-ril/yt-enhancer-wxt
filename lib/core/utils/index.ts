// lib/core/utils/index.ts

import type { YouTubePlayer } from "@/lib/sites/youtube/types";

export const ELEMENT_IDS = {
  videoInfo: "yt-enhancer-video-info",
  viewCount: "yt-enhancer-view-count",
  viewSuffix: "yt-enhancer-view-suffix",
  dateText: "yt-enhancer-date-text",
  dvrIndicator: "yt-enhancer-dvr-indicator",
  reEdgeButton: "yt-enhancer-re-edge-btn",
  refreshBtn: "yt-enhancer-refresh-btn",
  dropdown: "yt-enhancer-dropdown",
  dropdownButton: "yt-enhancer-dropdown-button",
  menu: "yt-enhancer-menu",
  menuHeader: "yt-enhancer-menu-header",
} as const satisfies Record<string, string>;

export const ELEMENT_SELECTORS = {
  timeWrapper: ".ytp-delhi-modern div.ytp-time-wrapper",
} as const satisfies Record<string, string>;

export const fetchData = async (url: string): Promise<string> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
  }
  return res.text();
};

export const getVideoId = (): string | null =>
  new URLSearchParams(new URL(location.href).search).get("v");

export const waitForElement = async <T extends Element>(
  selector: string,
  timeout = 5000,
): Promise<T | null> => {
  const existing = document.querySelector<T>(selector);
  if (existing) return existing;

  return new Promise((resolve) => { // check-patterns-safe: always settles via internal timeout below
    let activeElapsed = 0;
    let lastTick = Date.now();

    const cleanup = () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      clearInterval(interval);
    };

    const tryResolve = () => {
      const element = document.querySelector<T>(selector);
      if (element) {
        cleanup();
        resolve(element);
      }
    };

    const onVisibilityChange = () => {
      if (!document.hidden) {
        lastTick = Date.now();
      }
    };

    const observer = new MutationObserver(tryResolve);
    observer.observe(document.body, { childList: true, subtree: true });
    document.addEventListener("visibilitychange", onVisibilityChange);

    const interval = setInterval(() => {
      const now = Date.now();
      if (!document.hidden) {
        activeElapsed += now - lastTick;
      }
      lastTick = now;

      if (activeElapsed >= timeout) {
        cleanup();
        resolve(null);
        return;
      }

      tryResolve();
    }, 100);
  });
};

type ElementProps<K extends keyof HTMLElementTagNameMap> = Partial<
  Omit<HTMLElementTagNameMap[K], "style">
> & {
  style?: Partial<CSSStyleDeclaration>;
  attrs?: Record<string, string>;
};

export const createElement = <K extends keyof HTMLElementTagNameMap>(
  tag: K,
  props?: ElementProps<K>,
): HTMLElementTagNameMap[K] => {
  const el = document.createElement(tag);
  if (!props) return el;

  const { style, attrs, ...rest } = props;

  Object.assign(el, rest);

  if (style) {
    Object.assign(el.style, style);
  }

  if (attrs) {
    for (const [key, value] of Object.entries(attrs)) {
      el.setAttribute(key, value);
    }
  }

  return el;
};

const REQUIRED_METHODS = [
  "getPlayerState",
  "getCurrentTime",
  "getDuration",
  "setPlaybackQualityRange",
  "setLoopVideo",
  "toggleSubtitlesOn",
  "toggleSubtitles",
  "addEventListener",
  "removeEventListener",
  "seekTo",
] as const satisfies readonly (keyof YouTubePlayer)[];

const READY_STATES = new Set([1, 2, 3]);

/**
 * True when a raw `onStateChange` value means the player is usable
 * (playing / paused / buffering). Used by one-shot waiters that cannot
 * afford a full waitForPlayer probe on every state change.
 */
export const isReadyPlayerState = (state: unknown): state is number =>
  typeof state === "number" && READY_STATES.has(state);

const isPlayerReady = (player: YouTubePlayer): boolean => {
  try {
    const allMethodsExist = REQUIRED_METHODS.every(
      (method) => typeof player[method] === "function",
    );
    if (!allMethodsExist) return false;

    const state = player.getPlayerState();
    const duration = player.getDuration();
    if (typeof state !== "number") return false;
    if (typeof duration !== "number" || duration <= 0) return false;

    return READY_STATES.has(state);
  } catch {
    return false;
  }
};

export const waitForPlayer = async (): Promise<YouTubePlayer> => {
  const element = (await waitForElement<HTMLElement>(
    "#movie_player",
    10000,
  )) as unknown as YouTubePlayer;

  if (!element) {
    throw new Error("Player element not found");
  }

  if (isPlayerReady(element)) {
    return element;
  }

  return new Promise((resolve, reject) => {
    const timeout = 10000;
    let activeElapsed = 0;
    let lastTick = Date.now();

  const cleanup = () => {
    clearInterval(checkInterval);
    document.removeEventListener("visibilitychange", onVisibilityChange);
    try {
      element.removeEventListener("onStateChange", onStateChange);
    } catch (error) {
      console.warn("[YT-Enhancer] Player listener cleanup error:", error);
    }
  };

    const tryResolve = () => {
      if (isPlayerReady(element)) {
        cleanup();
        resolve(element);
      }
    };

    const onVisibilityChange = () => {
      if (!document.hidden) {
        lastTick = Date.now();
      }
    };

    const onStateChange = () => {
      tryResolve();
    };

    element.addEventListener("onStateChange", onStateChange);
    document.addEventListener("visibilitychange", onVisibilityChange);

    const checkInterval = setInterval(() => {
      const now = Date.now();
      if (!document.hidden) {
        activeElapsed += now - lastTick;
      }
      lastTick = now;

      if (activeElapsed > timeout) {
        cleanup();
        reject(new Error("Player ready timeout"));
        return;
      }

      tryResolve();
    }, 200);
  });
};

export const buildSVG = (
  viewBox: string,
  paths: Array<{ d: string; attrs?: Record<string, string> }>,
  svgAttrs?: Record<string, string>,
): SVGSVGElement => {
  const NS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("viewBox", viewBox);
  svg.setAttribute("fill", "none");
  if (svgAttrs) {
    for (const [k, v] of Object.entries(svgAttrs)) svg.setAttribute(k, v);
  }
  for (const { d, attrs } of paths) {
    const path = document.createElementNS(NS, "path");
    path.setAttribute("d", d);
    if (attrs) {
      for (const [k, v] of Object.entries(attrs)) path.setAttribute(k, v);
    }
    svg.appendChild(path);
  }
  return svg;
};
