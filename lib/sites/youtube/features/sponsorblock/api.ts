import { storageBridge } from "@/lib/core/bridge/bridge";
import { SB_API_BASE, CACHE_DURATION_MS } from "./constants";
import type {
  Segment,
  CachedSegments,
  SponsorBlockConfig,
  SponsorBlockCategory,
} from "./types";

function cacheKey(videoId: string): string {
  return `sb_cache_${videoId}`;
}

export function getActiveCategories(
  config: SponsorBlockConfig,
): SponsorBlockCategory[] {
  return Object.entries(config.categories)
    .filter(([, mode]) => mode !== "disabled")
    .map(([cat]) => cat as SponsorBlockCategory);
}

export async function fetchSegments(
  videoId: string,
  config: SponsorBlockConfig,
): Promise<Segment[]> {
  const key = cacheKey(videoId);
  const cached = (await storageBridge.get(key)) as CachedSegments | undefined;

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION_MS) {
    return cached.segments;
  }

  const activeCategories = getActiveCategories(config);
  if (activeCategories.length === 0) return [];

  const url = `${SB_API_BASE}/skipSegments?videoID=${encodeURIComponent(videoId)}&categories=${encodeURIComponent(JSON.stringify(activeCategories))}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      if (res.status === 404) return [];
      throw new Error(`SB API: ${res.status}`);
    }
    const segments: Segment[] = await res.json();
    await storageBridge.set(key, {
      segments,
      timestamp: Date.now(),
    } satisfies CachedSegments);
    return segments;
  } catch (error) {
    if (cached) return cached.segments;
    throw error;
  }
}

export async function clearCache(videoId: string): Promise<void> {
  await storageBridge.remove(cacheKey(videoId));
}

export function isFullyDisabled(config: SponsorBlockConfig): boolean {
  return Object.values(config.categories).every((m) => m === "disabled");
}
