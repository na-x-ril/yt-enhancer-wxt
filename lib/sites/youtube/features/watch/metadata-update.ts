// lib/sites/youtube/features/watch/metadata-update.ts
//
// Parses live view-count / date updates pushed by YouTube through the
// /youtubei/v1/updated_metadata fetch interceptor. Pure: callers decide
// what to do with the extracted strings.
//
// YouTube ships these updates in two shapes:
//  1. Legacy `actions: [{ updateViewershipAction | updateDateTextAction }]`.
//  2. Current `frameworkUpdates.entityBatchUpdate.mutations[]` — each
//     mutation carries a `payload.viewCountEntity` (and friends). This is
//     what WEB sends as of 2026; the legacy shape is kept for safety.

import type {
  UpdateDateTextAction,
  UpdateViewershipAction,
} from "../../types/VideoData";

export interface MetadataUpdate {
  viewCount?: string;
  dateText?: string;
  exactCount?: number;
}

/** `detail` of the `EVENTS.metadataUpdate` CustomEvent. */
export interface MetadataUpdateDetail {
  actions?: Array<UpdateViewershipAction | UpdateDateTextAction>;
  frameworkUpdates?: FrameworkUpdates;
}

interface TextRuns {
  simpleText?: string;
  runs?: Array<{ text?: string }>;
}

interface ViewCountEntity {
  viewCount?: TextRuns;
  shortViewCount?: TextRuns;
  extraShortViewCount?: TextRuns;
  unlabeledViewCountValue?: TextRuns;
  originalViewCount?: string;
}

interface EntityMutation {
  payload?: {
    viewCountEntity?: ViewCountEntity;
    // Mutations carry other entities too (likeCountEntity, ...); ignore them.
    [key: string]: unknown;
  };
}

export interface FrameworkUpdates {
  entityBatchUpdate?: {
    mutations?: EntityMutation[];
  };
}

function textOf(value: TextRuns | undefined): string | undefined {
  if (!value) return undefined;
  if (typeof value.simpleText === "string" && value.simpleText) {
    return value.simpleText;
  }
  const joined = value.runs?.map((run) => run.text ?? "").join("");
  return joined ? joined : undefined;
}

function parseExactCount(original: string | undefined): number | undefined {
  if (!original) return undefined;
  const parsed = parseInt(original, 10);
  return Number.isNaN(parsed) ? undefined : parsed;
}

/** Parses the legacy `actions[]` payload. */
export function parseMetadataActions(
  actions: Array<UpdateViewershipAction | UpdateDateTextAction>,
): MetadataUpdate | null {
  const viewershipAction = actions.find(
    (action): action is UpdateViewershipAction =>
      "updateViewershipAction" in action,
  );
  const dateTextAction = actions.find(
    (action): action is UpdateDateTextAction => "updateDateTextAction" in action,
  );

  const renderer =
    viewershipAction?.updateViewershipAction?.viewCount?.videoViewCountRenderer;

  const viewCountString =
    renderer?.viewCount?.simpleText ??
    renderer?.viewCount?.runs?.map((r) => r.text).join("");

  const originalViewCount = renderer?.originalViewCount
    ? parseInt(renderer.originalViewCount, 10)
    : null;

  const newDateText = dateTextAction?.updateDateTextAction?.dateText;
  const dateTextString =
    newDateText?.simpleText ??
    newDateText?.runs?.map((r) => r.text).join("");

  if (!viewCountString && !dateTextString) return null;

  return {
    ...(viewCountString ? { viewCount: viewCountString } : {}),
    ...(dateTextString ? { dateText: dateTextString } : {}),
    ...(originalViewCount !== null ? { exactCount: originalViewCount } : {}),
  };
}

/** Parses the current `frameworkUpdates.entityBatchUpdate` payload. */
export function parseFrameworkUpdates(
  frameworkUpdates: FrameworkUpdates | undefined,
): MetadataUpdate | null {
  const mutations = frameworkUpdates?.entityBatchUpdate?.mutations;
  if (!Array.isArray(mutations)) return null;

  for (const mutation of mutations) {
    const entity = mutation?.payload?.viewCountEntity;
    if (!entity) continue;

    // `viewCount` holds the full string ("1,392 watching now" /
    // "1,234,567 views"); `shortViewCount` is only a fallback.
    const viewCount =
      textOf(entity.viewCount) ?? textOf(entity.shortViewCount) ?? undefined;
    if (!viewCount) return null;

    const exactCount =
      parseExactCount(entity.originalViewCount) ??
      parseExactCount(textOf(entity.unlabeledViewCountValue));

    return {
      viewCount,
      ...(exactCount !== undefined ? { exactCount } : {}),
    };
  }

  return null;
}

/** Parses whichever update shape YouTube sent. */
export function parseMetadataUpdate(
  detail: MetadataUpdateDetail,
): MetadataUpdate | null {
  const fromActions = Array.isArray(detail.actions)
    ? parseMetadataActions(detail.actions)
    : null;

  return fromActions ?? parseFrameworkUpdates(detail.frameworkUpdates);
}
