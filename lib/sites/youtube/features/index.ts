// lib/sites/youtube/features/index.ts

import type { Feature } from "../types/feature";
import { watchFeature } from "./watch";
import { livechatFeature } from "./livechat";

export const FEATURES: Feature[] = [watchFeature, livechatFeature];
