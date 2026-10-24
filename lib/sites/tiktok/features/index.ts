// lib/sites/tiktok/features/index.ts

import type { Feature } from "@/lib/core/types/feature";
import { feedFeature } from "./feed";
import { searchFeature } from "./search";
import { videoFeature } from "./video";

// One folder per feature path, same as the YouTube site:
//   features/feed/   → "/", "/foryou", "/following"
//   features/video/  → "/@user/video/:id", "/video/:id"
//   features/search/ → "/search" and its subroutes
export const FEATURES: Feature[] = [feedFeature, videoFeature, searchFeature];
