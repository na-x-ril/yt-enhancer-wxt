import { describe, expect, it } from "vitest";
import {
  ALL_CATEGORIES,
  DEFAULT_CONFIG,
  isSBMode,
  sanitizeSBConfig,
  sanitizeSBMode,
} from "./types";

describe("isSBMode", () => {
  it("accepts the three known modes", () => {
    expect(isSBMode("auto")).toBe(true);
    expect(isSBMode("show_skip")).toBe(true);
    expect(isSBMode("disabled")).toBe(true);
  });

  it("rejects unknown values", () => {
    expect(isSBMode("skip")).toBe(false);
    expect(isSBMode("")).toBe(false);
    expect(isSBMode(undefined)).toBe(false);
    expect(isSBMode(null)).toBe(false);
    expect(isSBMode(42)).toBe(false);
  });
});

describe("sanitizeSBMode", () => {
  it("keeps valid modes and coerces the rest to disabled", () => {
    expect(sanitizeSBMode("auto")).toBe("auto");
    expect(sanitizeSBMode("show_skip")).toBe("show_skip");
    expect(sanitizeSBMode("skip")).toBe("disabled");
    expect(sanitizeSBMode(undefined)).toBe("disabled");
  });
});

describe("sanitizeSBConfig", () => {
  it("returns defaults for missing input", () => {
    expect(sanitizeSBConfig(undefined)).toEqual(DEFAULT_CONFIG);
    expect(sanitizeSBConfig(null)).toEqual(DEFAULT_CONFIG);
    expect(sanitizeSBConfig("sponsor")).toEqual(DEFAULT_CONFIG);
  });

  it("keeps valid per-category modes", () => {
    const config = sanitizeSBConfig({
      categories: { sponsor: "auto", intro: "show_skip" },
    });
    expect(config.categories.sponsor).toBe("auto");
    expect(config.categories.intro).toBe("show_skip");
    // Untouched categories fall back to defaults.
    expect(config.categories.outro).toBe(DEFAULT_CONFIG.categories.outro);
  });

  it("coerces invalid modes to disabled without dropping categories", () => {
    const config = sanitizeSBConfig({
      categories: { sponsor: "skip-please", filler: 123 },
    });
    expect(config.categories.sponsor).toBe("disabled");
    expect(config.categories.filler).toBe("disabled");
    for (const cat of ALL_CATEGORIES) {
      expect(config.categories[cat]).toBeDefined();
    }
  });

  it("ignores unknown categories", () => {
    const config = sanitizeSBConfig({
      categories: { not_a_category: "auto" },
    });
    expect(
      (config.categories as Record<string, unknown>).not_a_category,
    ).toBeUndefined();
  });
});
