// lib/sites/tiktok/features/index.test.ts
//
// Each feature exposes only { match, init }. Path ownership is tested here,
// not through internal helpers.

import { describe, expect, it } from "vitest";
import { feedFeature } from "./feed";
import { searchFeature } from "./search";
import { videoFeature } from "./video";

describe("feedFeature.match", () => {
  it("owns the feed paths only", () => {
    expect(feedFeature.match("/")).toBe(true);
    expect(feedFeature.match("/foryou")).toBe(true);
    expect(feedFeature.match("/following")).toBe(true);
    expect(feedFeature.match("/search")).toBe(false);
    expect(feedFeature.match("/@user/video/123")).toBe(false);
  });
});

describe("videoFeature.match", () => {
  it("owns single-video pages, including the one opened from search", () => {
    expect(videoFeature.match("/@user/video/123")).toBe(true);
    expect(videoFeature.match("/video/123")).toBe(true);
    expect(videoFeature.match("/@user")).toBe(false);
    expect(videoFeature.match("/search")).toBe(false);
  });
});

describe("searchFeature.match", () => {
  it("owns search paths and subroutes", () => {
    expect(searchFeature.match("/search")).toBe(true);
    expect(searchFeature.match("/search/video")).toBe(true);
    expect(searchFeature.match("/search/user")).toBe(true);
    expect(searchFeature.match("/search/live")).toBe(true);
    expect(searchFeature.match("/searching")).toBe(false);
    expect(searchFeature.match("/")).toBe(false);
  });
});
