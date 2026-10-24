// lib/sites/youtube/types/feature.ts

import type { Feature } from "@/lib/core/types/feature";
import type { InitialData, InitialPlayerResponse } from "./VideoData";

export type { Feature };

export interface WatchFeatureInterface extends Feature {
  fetchVideoData: (url: string) => Promise<{
    ytInitialData: InitialData | null;
    ytInitialPlayerResponse: InitialPlayerResponse | null;
  }>;
}
