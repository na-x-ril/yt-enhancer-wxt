import { describe, expect, it } from "vitest";
import { DEFAULT_CONFIG, normalizeSavedConfig } from "./player";

describe("normalizeSavedConfig", () => {
  it("returns defaults for missing input", () => {
    expect(normalizeSavedConfig(undefined)).toEqual(DEFAULT_CONFIG);
    expect(normalizeSavedConfig(null)).toEqual(DEFAULT_CONFIG);
    expect(normalizeSavedConfig([])).toEqual(DEFAULT_CONFIG);
  });

  it("keeps valid values", () => {
    expect(
      normalizeSavedConfig({
        autoLoop: false,
        autoCaption: false,
        qualityService: false,
        quality: "hd720",
        sbEnabled: false,
      }),
    ).toEqual({
      autoLoop: false,
      autoCaption: false,
      qualityService: false,
      quality: "hd720",
      sbEnabled: false,
    });
  });

  it("migrates the legacy preferredQuality field", () => {
    expect(normalizeSavedConfig({ preferredQuality: "hd720" }).quality).toBe(
      "hd720",
    );
  });

  it("prefers quality over legacy preferredQuality", () => {
    expect(
      normalizeSavedConfig({ quality: "hd1080", preferredQuality: "hd720" })
        .quality,
    ).toBe("hd1080");
  });

  it("falls back per-field on invalid values", () => {
    const config = normalizeSavedConfig({
      autoLoop: "yes",
      quality: "8k",
      preferredQuality: "also-nope",
      sbEnabled: 1,
    });
    expect(config.autoLoop).toBe(DEFAULT_CONFIG.autoLoop);
    expect(config.quality).toBe(DEFAULT_CONFIG.quality);
    expect(config.sbEnabled).toBe(DEFAULT_CONFIG.sbEnabled);
  });
});
