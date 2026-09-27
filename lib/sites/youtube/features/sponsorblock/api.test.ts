import { describe, expect, it } from "vitest";
import { getActiveCategories } from "./api";
import { DEFAULT_CONFIG } from "./types";

describe("getActiveCategories", () => {
  it("excludes disabled categories", () => {
    expect(getActiveCategories(DEFAULT_CONFIG)).toEqual(
      expect.arrayContaining(["sponsor", "selfpromo"]),
    );
    expect(getActiveCategories(DEFAULT_CONFIG)).not.toContain("intro");
  });

  it("returns empty when everything is disabled", () => {
    expect(
      getActiveCategories({
        categories: {
          sponsor: "disabled",
          intro: "disabled",
          outro: "disabled",
          interaction: "disabled",
          selfpromo: "disabled",
          music_offtopic: "disabled",
          preview: "disabled",
          filler: "disabled",
        },
      }),
    ).toEqual([]);
  });

  it("includes both auto and show_skip modes", () => {
    const active = getActiveCategories({
      categories: { ...DEFAULT_CONFIG.categories, intro: "auto" },
    });
    expect(active).toContain("sponsor");
    expect(active).toContain("intro");
  });
});
