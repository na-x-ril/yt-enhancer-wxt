import { describe, expect, it } from "vitest";
import type {
  UpdatedMetadataAction,
  UpdatedMetadataFrameworkUpdates,
} from "../../types/VideoData";
import {
  parseFrameworkUpdates,
  parseMetadataActions,
  parseMetadataUpdate,
} from "./metadata-update";

// The generated types mirror the exact samples captured from YouTube; the
// parser is deliberately tolerant of thinner payloads, so partial fixtures go
// through these helpers.
const actions = (list: unknown[]): UpdatedMetadataAction[] =>
  list as UpdatedMetadataAction[];

const frameworkUpdates = (
  mutations: unknown[],
): UpdatedMetadataFrameworkUpdates =>
  ({ entityBatchUpdate: { mutations } }) as UpdatedMetadataFrameworkUpdates;

// Real WEB payload captured 2026-10-16 (live video, logged-in): the view-count
// update arrives as an entityBatchUpdate mutation, not the legacy `actions[]`.
const frameworkUpdatesSample = frameworkUpdates([
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
      likeCountEntity: { likeCountLabel: { content: "Likes" } },
    },
  },
]);

describe("parseFrameworkUpdates", () => {
  it("extracts the view count from the entityBatchUpdate shape", () => {
    const update = parseFrameworkUpdates(frameworkUpdatesSample);
    expect(update).not.toBeNull();
    expect(update?.viewCount).toBe("1,392 watching now");
    // The entity carries no exact count; the parser downstream handles it.
    expect(update?.exactCount).toBeUndefined();
  });

  it("reads the locale-independent exact count from viewCountNumber", () => {
    const update = parseFrameworkUpdates(
      frameworkUpdates([
        {
          payload: {
            viewCountEntity: {
              viewCount: { simpleText: "5,219 views" },
              viewCountNumber: "5219",
            },
          },
        },
      ]),
    );
    expect(update?.viewCount).toBe("5,219 views");
    expect(update?.exactCount).toBe(5219);
  });

  it("falls back to shortViewCount when viewCount is absent", () => {
    const update = parseFrameworkUpdates(
      frameworkUpdates([
        {
          payload: {
            viewCountEntity: { shortViewCount: { simpleText: "1.3K views" } },
          },
        },
      ]),
    );
    expect(update?.viewCount).toBe("1.3K views");
  });

  it("ignores mutations without a view count entity", () => {
    const update = parseFrameworkUpdates(
      frameworkUpdates([
        {
          payload: {
            likeCountEntity: { likeCountLabel: { content: "Likes" } },
          },
        },
      ]),
    );
    expect(update).toBeNull();
  });

  it("returns null for missing or empty frameworkUpdates", () => {
    expect(parseFrameworkUpdates(undefined)).toBeNull();
    expect(parseFrameworkUpdates(frameworkUpdates([]))).toBeNull();
  });
});

describe("parseMetadataActions", () => {
  it("still parses the legacy actions shape", () => {
    const update = parseMetadataActions(
      actions([
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
      ]),
    );
    expect(update?.viewCount).toBe("1,234 views");
    expect(update?.exactCount).toBe(1234);
  });
});

describe("parseMetadataUpdate", () => {
  it("merges actions and frameworkUpdates from the same payload", () => {
    // Logged-in VOD (captured 2026-10-16): the date text rides in `actions[]`
    // while the view count arrives through `frameworkUpdates`. Both must
    // survive, otherwise the view count never refreshes.
    const update = parseMetadataUpdate({
      actions: actions([
        { updateDateTextAction: { dateText: { simpleText: "1h ago" } } },
      ]),
      frameworkUpdates: frameworkUpdates([
        {
          payload: {
            viewCountEntity: {
              viewCount: { simpleText: "5,219 views" },
              viewCountNumber: "5219",
            },
          },
        },
      ]),
    });
    expect(update?.dateText).toBe("1h ago");
    expect(update?.viewCount).toBe("5,219 views");
    expect(update?.exactCount).toBe(5219);
  });

  it("lets actions win a field both shapes provide", () => {
    const update = parseMetadataUpdate({
      actions: actions([
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
      ]),
      frameworkUpdates: frameworkUpdatesSample,
    });
    expect(update?.viewCount).toBe("1,234 views");
    expect(update?.exactCount).toBe(1234);
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
