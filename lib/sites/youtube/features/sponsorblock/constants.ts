import type { SponsorBlockCategory, SBMode } from "./types";

export const SB_API_BASE = "https://sponsor.ajay.app/api";
export const CACHE_DURATION_MS = 3 * 60 * 60 * 1000;

export const CATEGORY_COLORS: Record<SponsorBlockCategory, string> = {
  sponsor: "#00ff00",
  intro: "#ff00ff",
  outro: "#ff8800",
  interaction: "#ff0000",
  selfpromo: "#ffff00",
  music_offtopic: "#0088ff",
  preview: "#00ffff",
  filler: "#888888",
};

export const CATEGORY_LABELS: Record<SponsorBlockCategory, string> = {
  sponsor: "Sponsor",
  intro: "Intro",
  outro: "Outro",
  interaction: "Interaction",
  selfpromo: "Self Promotion",
  music_offtopic: "Music Offtopic",
  preview: "Preview",
  filler: "Filler",
};

export const MODE_LABELS: Record<SBMode, string> = {
  auto: "Auto Skip",
  show_skip: "Show Skip",
  disabled: "Disabled",
};
