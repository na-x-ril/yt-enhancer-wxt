import { describe, expect, it } from "vitest";
import {
  parseFrameworkUpdates,
  parseMetadataActions,
  parseMetadataUpdate,
} from "./metadata-update";

// Trimmed real WEB response captured 2026-10-16 (live video): the update is
// carried as an entityBatchUpdate mutation, not the legacy `actions[]`.
const frameworkUpdatesSample = {
  entityBatchUpdate: {
    mutations: [
      {
        entityKey: "Egt5RFg3MXFQekh2SSDCASgB",
        type: "ENTITY_MUTATION_TYPE_REPLACE",
        payload: {
          viewCountEntity: {
            key: "Egt5RFg3MXFQekh2SSDCASgB",
            viewCount: {
              runs: [{ text: "1,392" }, { text: " watching now" }],
              simpleText: "1,392 watching now",
            },
            shortViewCount: {
              runs: [{ text: "1.3K" }, { text: " watching" }],
              simpleText: "1.3K watching",
            },
            extraShortViewCount: { simpleText: "1.3K" },
            viewCountLength: 18,
            shortViewCountLength: 13,
            extraShortViewCountLength: 4,
          },
        },
      },
      {
        entityKey: "Egt5RFg3MXFQekh2SSC9AygB",
        type: "ENTITY_MUTATION_TYPE_REPLACE",
        payload: {
          likeCountEntity: {
            likeCountIfIndifferent: { content: "209" },
            likeCountLabel: { content: "Likes" },
          },
        },
      },
    ],
    timestamp: { seconds: "1792158887", nanos: 869497411 },
  },
};

describe("parseFrameworkUpdates", () => {
  it("extracts the view count from the entityBatchUpdate shape", () => {
    const update = parseFrameworkUpdates(frameworkUpdatesSample);
    expect(update).not.toBeNull();
    expect(update?.viewCount).toBe("1,392 watching now");
    // No originalViewCount in the sample -> no exact count.
    expect(update?.exactCount).toBeUndefined();
  });

  it("falls back to shortViewCount when viewCount is absent", () => {
    const update = parseFrameworkUpdates({
      entityBatchUpdate: {
        mutations: [
          {
            payload: {
              viewCountEntity: { shortViewCount: { simpleText: "1.3K views" } },
            },
          },
        ],
      },
    });
    expect(update?.viewCount).toBe("1.3K views");
  });

  it("reads originalViewCount as the exact count", () => {
    const update = parseFrameworkUpdates({
      entityBatchUpdate: {
        mutations: [
          {
            payload: {
              viewCountEntity: {
                viewCount: { simpleText: "1,234,567 views" },
                originalViewCount: "1234567",
              },
            },
          },
        ],
      },
    });
    expect(update?.viewCount).toBe("1,234,567 views");
    expect(update?.exactCount).toBe(1234567);
  });

  it("ignores mutations without a view count entity", () => {
    const update = parseFrameworkUpdates({
      entityBatchUpdate: {
        mutations: [
          { payload: { likeCountEntity: { likeCountLabel: { content: "Likes" } } } },
        ],
      },
    });
    expect(update).toBeNull();
  });

  it("returns null for missing or empty frameworkUpdates", () => {
    expect(parseFrameworkUpdates(undefined)).toBeNull();
    expect(parseFrameworkUpdates({})).toBeNull();
    expect(
      parseFrameworkUpdates({ entityBatchUpdate: { mutations: [] } }),
    ).toBeNull();
  });
});

describe("parseMetadataActions", () => {
  it("still parses the legacy actions shape", () => {
    const update = parseMetadataActions([
      {
        updateViewershipAction: {
          viewCount: {
            videoViewCountRenderer: {
              viewCount: { simpleText: "1,234 views" },
              originalViewCount: "1234",
            },
          },
        },
      },
    ]);
    expect(update?.viewCount).toBe("1,234 views");
    expect(update?.exactCount).toBe(1234);
  });
});

describe("parseMetadataUpdate", () => {
  it("prefers the legacy actions when present", () => {
    const update = parseMetadataUpdate({
      actions: [
        {
          updateDateTextAction: {
            dateText: { simpleText: "Streamed 2 hours ago" },
          },
        },
      ],
      frameworkUpdates: frameworkUpdatesSample,
    });
    expect(update?.dateText).toBe("Streamed 2 hours ago");
  });

  it("falls back to frameworkUpdates", () => {
    const update = parseMetadataUpdate({
      frameworkUpdates: frameworkUpdatesSample,
    });
    expect(update?.viewCount).toBe("1,392 watching now");
  });

  it("returns null when neither shape carries data", () => {
    expect(parseMetadataUpdate({})).toBeNull();
  });
});
