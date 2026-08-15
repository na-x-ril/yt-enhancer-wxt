export interface Segment {
  segment: [number, number];
  UUID: string;
  category: SponsorBlockCategory;
  videoDuration: number;
  actionType: string;
  locked: number;
  votes: number;
  description: string;
}

export interface CachedSegments {
  segments: Segment[];
  timestamp: number;
}

export type SBMode = "auto" | "show_skip" | "disabled";

export const SB_MODES: SBMode[] = ["auto", "show_skip", "disabled"];

export function isSBMode(value: unknown): value is SBMode {
  return typeof value === "string" && (SB_MODES as string[]).includes(value);
}

export function sanitizeSBMode(mode: unknown): SBMode {
  return isSBMode(mode) ? mode : "disabled";
}

export function sanitizeSBConfig(input: unknown): SponsorBlockConfig {
  const categories: Record<SponsorBlockCategory, SBMode> = {
    ...DEFAULT_CONFIG.categories,
  };

  if (input && typeof input === "object") {
    const rawCategories = (input as { categories?: unknown }).categories;
    if (rawCategories && typeof rawCategories === "object") {
      for (const cat of ALL_CATEGORIES) {
        categories[cat] = sanitizeSBMode(
          (rawCategories as Record<string, unknown>)[cat],
        );
      }
    }
  }

  return { categories };
}

export type SponsorBlockCategory =
  | "sponsor"
  | "intro"
  | "outro"
  | "interaction"
  | "selfpromo"
  | "music_offtopic"
  | "preview"
  | "filler";

export interface SponsorBlockConfig {
  categories: Record<SponsorBlockCategory, SBMode>;
}

export const STORAGE_KEY = "sponsorblock_config";

export const ALL_CATEGORIES: SponsorBlockCategory[] = [
  "sponsor",
  "intro",
  "outro",
  "interaction",
  "selfpromo",
  "music_offtopic",
  "preview",
  "filler",
];

export const DEFAULT_CONFIG: SponsorBlockConfig = {
  categories: {
    sponsor: "show_skip",
    intro: "disabled",
    outro: "disabled",
    interaction: "disabled",
    selfpromo: "show_skip",
    music_offtopic: "disabled",
    preview: "disabled",
    filler: "disabled",
  },
};
