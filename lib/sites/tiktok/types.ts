// lib/sites/tiktok/types.ts

export interface TiktokConfig {
  unmute: boolean;
}

export const STORAGE_KEY = "tiktok_config";

export const DEFAULT_CONFIG: TiktokConfig = {
  unmute: true,
};

/** Accepts anything from storage and always returns a usable config. */
export function sanitizeTiktokConfig(saved: unknown): TiktokConfig {
  if (saved === null || typeof saved !== "object") {
    return { ...DEFAULT_CONFIG };
  }

  const unmute = (saved as Record<string, unknown>).unmute;
  return {
    unmute: typeof unmute === "boolean" ? unmute : DEFAULT_CONFIG.unmute,
  };
}
