// lib/sites/youtube/features/codec/index.ts

import { loadFeatureConfig } from "../config-store";
import type { CodecConfig } from "./types";
import { DEFAULT_CONFIG, sanitizeCodecConfig, STORAGE_KEY } from "./types";

const VP9_RE = /vp0?9/i;
const AV1_RE = /av0?1/i;
const VP8_RE = /vp8/i;
const AVC_RE = /avc/i;

declare global {
  interface Window {
    __ytEnhancerCodecPatched?: boolean;
    __ytEnhancerOriginalIsTypeSupported?: (type: string) => boolean;
    __ytEnhancerOriginalCanPlayType?: (
      this: HTMLMediaElement,
      type: string,
    ) => CanPlayTypeResult;
  }
}

// Keep in sync with resolveBlockedPatterns(): this is the config-based
// variant used outside the interceptor (e.g. getRemainingCodecs).
export function isCodecBlocked(input: string, config: CodecConfig): boolean {
  if (config.blockVp9 && VP9_RE.test(input)) return true;
  if (config.blockAv1 && AV1_RE.test(input)) return true;
  if (config.blockVp8 && VP8_RE.test(input)) return true;
  if (config.blockAvc && AVC_RE.test(input)) return true;
  return false;
}

/**
 * Resolves the enabled block patterns once per config change. The player
 * probes isTypeSupported/canPlayType constantly, so the interceptor uses
 * this precomputed list instead of re-branching on the config on every
 * call — and touches nothing at all when every codec is allowed.
 */
function resolveBlockedPatterns(config: CodecConfig): RegExp[] {
  const patterns: RegExp[] = [];
  if (config.blockVp9) patterns.push(VP9_RE);
  if (config.blockAv1) patterns.push(AV1_RE);
  if (config.blockVp8) patterns.push(VP8_RE);
  if (config.blockAvc) patterns.push(AVC_RE);
  return patterns;
}

function isBrowserSupported(mimeType: string): boolean {
  if (typeof MediaSource === "undefined") return true;
  const original =
    window.__ytEnhancerOriginalIsTypeSupported ??
    MediaSource.isTypeSupported.bind(MediaSource);
  try {
    return original(mimeType);
  } catch {
    return true;
  }
}

export function probeCodecSupport(codec: string): boolean {
  const container = /^av0?1|^avc/i.test(codec) ? "video/mp4" : "video/webm";
  return isBrowserSupported(`${container}; codecs="${codec}"`);
}

export function getRemainingCodecs(
  videoCodecs: string[],
  config: CodecConfig,
): string[] {
  return videoCodecs.filter((codec) => !isCodecBlocked(codec, config));
}

export class CodecInterceptor {
  private blockedPatterns: RegExp[] = resolveBlockedPatterns(DEFAULT_CONFIG);
  private cleanupFns: Array<() => void> = [];
  private subscribed = false;

  patch(): void {
    if (window.__ytEnhancerCodecPatched) return;
    window.__ytEnhancerCodecPatched = true;

    const interceptor = this;

    if (typeof MediaSource !== "undefined") {
      const originalIsTypeSupported = MediaSource.isTypeSupported.bind(
        MediaSource,
      );
      window.__ytEnhancerOriginalIsTypeSupported = originalIsTypeSupported;
      MediaSource.isTypeSupported = (type: string): boolean => {
        if (interceptor.isBlocked(type)) return false;
        return originalIsTypeSupported(type);
      };
    }

    const originalCanPlayType = HTMLMediaElement.prototype.canPlayType;
    window.__ytEnhancerOriginalCanPlayType = originalCanPlayType;
    HTMLMediaElement.prototype.canPlayType = function (
      this: HTMLMediaElement,
      type: string,
    ): CanPlayTypeResult {
      if (interceptor.isBlocked(type)) return "";
      return originalCanPlayType.call(this, type);
    };
  }

  private isBlocked(type: string): boolean {
    for (const pattern of this.blockedPatterns) {
      if (pattern.test(type)) return true;
    }
    return false;
  }

  async loadConfig(): Promise<void> {
    this.updateConfig(
      await loadFeatureConfig(STORAGE_KEY, "codec config", sanitizeCodecConfig),
    );
  }

  updateConfig(config: CodecConfig): void {
    this.blockedPatterns = resolveBlockedPatterns(config);
  }

  subscribe(): void {
    if (this.subscribed) return;
    this.subscribed = true;

    const handleSetting = (e: Event) => {
      const detail = (e as CustomEvent<{ config?: unknown }>).detail;
      if (!detail || !detail.config) return;
      this.updateConfig(sanitizeCodecConfig(detail.config));
    };

    window.addEventListener("yt-enhancer-codec-setting", handleSetting);
    this.cleanupFns.push(() =>
      window.removeEventListener("yt-enhancer-codec-setting", handleSetting),
    );
  }

  destroy(): void {
    for (const fn of this.cleanupFns) {
      try {
        fn();
      } catch (error) {
        console.warn("[Codec] Cleanup error:", error);
      }
    }
    this.cleanupFns = [];
    this.subscribed = false;
    // NOTE: the MediaSource/canPlayType patch above is intentionally
    // page-lifetime. The player probes codecs continuously, so restoring
    // the originals mid-session would silently change playback behavior.
  }

  static readonly shared = new CodecInterceptor();
}