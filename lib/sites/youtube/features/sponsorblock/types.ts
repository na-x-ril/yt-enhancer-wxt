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
