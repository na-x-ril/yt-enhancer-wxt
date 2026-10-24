// lib/sites/tiktok/types.test.ts

import { describe, expect, it } from "vitest";
import { DEFAULT_CONFIG, sanitizeTiktokConfig } from "./types";

describe("sanitizeTiktokConfig", () => {
  it("falls back to defaults for non-objects", () => {
    expect(sanitizeTiktokConfig(undefined)).toEqual(DEFAULT_CONFIG);
    expect(sanitizeTiktokConfig(null)).toEqual(DEFAULT_CONFIG);
    expect(sanitizeTiktokConfig("nope")).toEqual(DEFAULT_CONFIG);
  });

  it("keeps a valid boolean", () => {
    expect(sanitizeTiktokConfig({ unmute: false })).toEqual({ unmute: false });
    expect(sanitizeTiktokConfig({ unmute: true })).toEqual({ unmute: true });
  });

  it("ignores invalid values", () => {
    expect(sanitizeTiktokConfig({ unmute: "false" })).toEqual(DEFAULT_CONFIG);
    expect(sanitizeTiktokConfig({})).toEqual(DEFAULT_CONFIG);
  });
});
