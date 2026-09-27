import { describe, expect, it } from "vitest";
import { DEFAULT_CONFIG, sanitizeCodecConfig } from "./types";

describe("sanitizeCodecConfig", () => {
  it("returns defaults for missing input", () => {
    expect(sanitizeCodecConfig(undefined)).toEqual(DEFAULT_CONFIG);
    expect(sanitizeCodecConfig(null)).toEqual(DEFAULT_CONFIG);
    expect(sanitizeCodecConfig("blockVp9")).toEqual(DEFAULT_CONFIG);
  });

  it("keeps explicit booleans", () => {
    expect(
      sanitizeCodecConfig({ blockVp9: true, blockAv1: true }),
    ).toEqual({
      ...DEFAULT_CONFIG,
      blockVp9: true,
      blockAv1: true,
    });
  });

  it("coerces non-booleans to defaults", () => {
    const config = sanitizeCodecConfig({ blockVp9: "yes", blockAvc: 1 });
    expect(config.blockVp9).toBe(DEFAULT_CONFIG.blockVp9);
    expect(config.blockAvc).toBe(DEFAULT_CONFIG.blockAvc);
  });
});
