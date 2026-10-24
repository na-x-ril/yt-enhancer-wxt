// lib/sites/tiktok/events.ts
//
// Same contract as the YouTube site: components never call each other
// directly across the popup/feature boundary. The popup writes config and
// dispatches; the feature listens.

import type { TiktokConfig } from "./types";

export const TIKTOK_EVENTS = {
  setting: "tiktok-enhancer-setting",
} as const;

export interface TiktokSettingEventDetail {
  config: TiktokConfig;
}
