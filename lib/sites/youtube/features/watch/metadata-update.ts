// lib/sites/youtube/features/watch/metadata-update.ts
//
// Parses live view-count / date updates pushed by YouTube through the
// /youtubei/v1/updated_metadata fetch interceptor. Pure: callers decide
// what to do with the extracted strings.

import type {
  UpdateDateTextAction,
  UpdateViewershipAction,
} from "../../types/VideoData";

export interface MetadataUpdate {
  viewCount?: string;
  dateText?: string;
  exactCount?: number;
}

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
