// lib/sites/tiktok/features/shared/logic.test.ts

import { describe, expect, it } from "vitest";
import { needsUnmute } from "./logic";

describe("needsUnmute", () => {
  it("covers muted and zero-volume videos", () => {
    expect(needsUnmute({ muted: true, volume: 1 })).toBe(true);
    expect(needsUnmute({ muted: false, volume: 0 })).toBe(true);
    expect(needsUnmute({ muted: false, volume: 0.5 })).toBe(false);
  });
});
