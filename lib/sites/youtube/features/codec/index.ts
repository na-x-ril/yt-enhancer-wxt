// lib/sites/youtube/features/codec/index.ts

import { storageBridge } from "@/lib/core/bridge/bridge";
import {
  CodecConfig,
  DEFAULT_CONFIG,
  sanitizeCodecConfig,
  STORAGE_KEY,
} from "./types";

const VP9_RE = /vp0?9/i;
const AV1_RE = /av0?1/i;
const VP8_RE = /vp8/i;

declare global {
  interface Window {
    __ytEnhancerCodecPatched?: boolean;
  }
}

export class CodecInterceptor {
  private config: CodecConfig = { ...DEFAULT_CONFIG };
  private cleanupFns: Array<() => void> = [];

  patch(): void {
    if (window.__ytEnhancerCodecPatched) return;
    window.__ytEnhancerCodecPatched = true;

    const interceptor = this;

    if (typeof MediaSource !== "undefined") {
      const originalIsTypeSupported = MediaSource.isTypeSupported.bind(
        MediaSource,
      );
      MediaSource.isTypeSupported = (type: string): boolean => {
        if (interceptor.isBlocked(type)) return false;
        return originalIsTypeSupported(type);
      };
    }

    const originalCanPlayType = HTMLMediaElement.prototype.canPlayType;
    HTMLMediaElement.prototype.canPlayType = function (
      this: HTMLMediaElement,
      type: string,
    ): CanPlayTypeResult {
      if (interceptor.isBlocked(type)) return "";
      return originalCanPlayType.call(this, type);
    };
  }

  private isBlocked(type: string): boolean {
    if (this.config.blockVp9 && VP9_RE.test(type)) return true;
    if (this.config.blockAv1 && AV1_RE.test(type)) return true;
    if (this.config.blockVp8 && VP8_RE.test(type)) return true;
    return false;
  }

  async loadConfig(): Promise<void> {
    try {
      const saved = await storageBridge.get(STORAGE_KEY);
      this.updateConfig(sanitizeCodecConfig(saved));
    } catch (error) {
      console.warn("[Codec] Failed to load config:", error);
    }
  }

  updateConfig(config: CodecConfig): void {
    this.config = { ...config };
  }

  subscribe(): void {
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
      } catch {}
    }
    this.cleanupFns = [];
  }

  static readonly shared = new CodecInterceptor();
}