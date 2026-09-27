// lib/sites/youtube/features/index.ts

import type { Feature } from "../types/feature";
import { watchFeature } from "./watch";

// NOTE: live-chat auto-select lives entirely in
// entrypoints/youtube-livechat-patch.content.ts (document_start), so there
// is no livechat feature entry here — the previous match-only stub ran
// nothing and only obscured that fact.
export const FEATURES: Feature[] = [watchFeature];
