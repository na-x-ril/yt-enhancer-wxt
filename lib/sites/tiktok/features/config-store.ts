// lib/sites/tiktok/features/config-store.ts
//
// TikTok's app script runs in ISOLATED, so it can use browser.storage
// directly. No postMessage bridge and therefore no 5s bridge timeout.

import {
  DEFAULT_CONFIG,
  sanitizeTiktokConfig,
  STORAGE_KEY,
} from "../types";
import type { TiktokConfig } from "../types";

function getLocalStorage(): typeof browser.storage.local {
  if (typeof browser === "undefined" || !browser.storage?.local) {
    throw new Error("browser.storage.local is not available");
  }
  return browser.storage.local;
}

export async function loadTiktokConfig(): Promise<TiktokConfig> {
  try {
    const stored = await getLocalStorage().get(STORAGE_KEY);
    return sanitizeTiktokConfig(stored[STORAGE_KEY]);
  } catch (error) {
    console.warn("[TikTok] Failed to load config:", error);
    return { ...DEFAULT_CONFIG };
  }
}

export async function saveTiktokConfig(config: TiktokConfig): Promise<void> {
  try {
    await getLocalStorage().set({ [STORAGE_KEY]: config });
  } catch (error) {
    console.warn("[TikTok] Failed to save config:", error);
  }
}
