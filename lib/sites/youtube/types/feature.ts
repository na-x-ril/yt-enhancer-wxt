// lib/sites/youtube/types/feature.ts

import { InitialData, InitialPlayerResponse } from "./VideoData";

export interface Feature {
  match: (path: string) => boolean;
  init?: () => Promise<(() => void) | undefined>;
  destroy?: () => void;
}

export interface WatchFeatureInterface extends Feature {
  fetchVideoData: (url: string) => Promise<{
    ytInitialData: InitialData | null;
    ytInitialPlayerResponse: InitialPlayerResponse | null;
  }>;
}
