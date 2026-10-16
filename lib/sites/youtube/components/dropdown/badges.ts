// lib/sites/youtube/components/dropdown/badges.ts
//
// Badge text for the main-page navigation items. Shared by the initial
// render (main-page.ts) and the runtime refresh (index.ts) so both compute
// the same label.

import { ALL_CATEGORIES } from "../../features/sponsorblock/types";
import type { SponsorBlockConfig } from "../../features/sponsorblock/types";
import type { CodecConfig } from "../../features/codec/types";

function countBadge(count: number): string {
  return count === 0 ? "Off" : `${count} on`;
}

export function codecBadgeText(config: CodecConfig): string {
  const active = [
    config.blockVp9,
    config.blockAv1,
    config.blockVp8,
    config.blockAvc,
  ].filter(Boolean).length;
  return countBadge(active);
}

export function sbBadgeText(config: SponsorBlockConfig): string {
  const active = ALL_CATEGORIES.filter(
    (category) => config.categories[category] !== "disabled",
  ).length;
  return countBadge(active);
}
