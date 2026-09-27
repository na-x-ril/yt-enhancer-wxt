// lib/sites/youtube/features/config-store.ts
//
// Single choke point for loading/saving feature configs.
//
// Every feature used to hand-roll the same try/catch + sanitize dance with
// subtly different fallbacks (e.g. Dropdown merged SB categories by hand
// instead of using sanitizeSBConfig). All loads/saves go through here so a
// storage failure behaves the same everywhere: warn once, fall back to
// sanitized defaults, never hang (see bridge timeout in lib/core/bridge).

import { storageBridge } from "@/lib/core/bridge/bridge";

/**
 * Loads and sanitizes a feature config. Never throws: on storage failure
 * returns sanitized defaults so the feature keeps working degraded.
 */
export async function loadFeatureConfig<T>(
  storageKey: string,
  label: string,
  sanitize: (saved: unknown) => T,
): Promise<T> {
  try {
    return sanitize(await storageBridge.get(storageKey));
  } catch (error) {
    console.warn(`[YT-Enhancer] Failed to load ${label}:`, error);
    return sanitize(undefined);
  }
}

/**
 * Persists a feature config. Returns false (instead of throwing) on
 * storage failure so callers can decide whether to still broadcast
 * the in-memory state to already-running features.
 */
export async function saveFeatureConfig(
  storageKey: string,
  label: string,
  value: unknown,
): Promise<boolean> {
  try {
    await storageBridge.set(storageKey, value);
    return true;
  } catch (error) {
    console.warn(`[YT-Enhancer] Failed to save ${label}:`, error);
    return false;
  }
}
