// lib/sites/youtube/features/watch/player-data.ts
//
// Data layer for the watch page: obtain ytInitialData /
// ytInitialPlayerResponse (from the page globals, falling back to a page
// fetch), and derive view count, badges, date text, qualities, and codecs
// from them. The derivations are pure; only the acquisition steps touch
// the environment.

import { fetchData } from "@/lib/core/utils";
import type { Quality, VideoStateValue } from "../../types/player";
import { isQuality, QUALITY_RANK, VideoState } from "../../types/player";
import type {
  InitialData,
  InitialPlayerResponse,
  InitialPlayerResponseVideoDetails,
  PlayerMicroformatRenderer,
  ResultsContent,
} from "../../types/VideoData";

export interface PageData {
  ytInitialData: InitialData | null;
  ytInitialPlayerResponse: InitialPlayerResponse | null;
}

export function parseVideoPage(html: string): PageData {
  const initialDataMatch = html.match(/var ytInitialData\s*=\s*(\{.*?\});/);
  const initialPlayerResponseMatch = html.match(
    /var ytInitialPlayerResponse\s*=\s*(\{.*?\});/,
  );

  return {
    ytInitialData: initialDataMatch?.[1]
      ? JSON.parse(initialDataMatch[1])
      : null,
    ytInitialPlayerResponse: initialPlayerResponseMatch?.[1]
      ? JSON.parse(initialPlayerResponseMatch[1])
      : null,
  };
}

export async function fetchVideoData(url: string): Promise<PageData> {
  const html = await fetchData(url);
  return parseVideoPage(html);
}

/**
 * Reads the page's own ytInitialData / ytInitialPlayerResponse globals
 * (the script runs in MAIN world) to avoid re-downloading the whole watch
 * page. Returns null when the globals are missing, or when the player
 * response belongs to a different video than `videoId`. After an SPA
 * navigation YouTube can leave the globals pointed at the previous video,
 * so the caller must fall back to a network fetch in that case.
 */
export function getPageData(videoId: string | null): PageData | null {
  if (typeof window === "undefined") return null;

  const win = window as unknown as {
    ytInitialData?: InitialData;
    ytInitialPlayerResponse?: InitialPlayerResponse;
  };
  const response = win.ytInitialPlayerResponse;
  if (!response) return null;
  if (videoId && response.videoDetails?.videoId !== videoId) return null;

  const initialData = win.ytInitialData;
  if (!initialData) return null;

  return { ytInitialData: initialData, ytInitialPlayerResponse: response };
}

export function getVideoState(
  microformat: PlayerMicroformatRenderer,
  videoDetails: InitialPlayerResponseVideoDetails,
): VideoStateValue {
  const liveDetails = microformat?.liveBroadcastDetails;

  if (liveDetails?.isLiveNow === true) {
    return VideoState.LIVE;
  } else if (liveDetails?.isLiveNow === false && !videoDetails.isUpcoming) {
    return VideoState.PAST_LIVE;
  } else if (liveDetails?.isLiveNow === false && videoDetails.isUpcoming) {
    return VideoState.UPCOMING;
  } else {
    return VideoState.VOD;
  }
}

export function getAvailableQualities(
  response: InitialPlayerResponse,
): Quality[] {
  // YouTube no longer ships progressive `streamingData.formats`, so the
  // adaptive list is the only source.
  const formats = response.streamingData?.adaptiveFormats ?? [];
  const qualities = new Set<Quality>();
  for (const fmt of formats) {
    // YouTube may report qualities the app does not model (e.g. `hd2160`).
    if (isQuality(fmt.quality)) {
      qualities.add(fmt.quality);
    }
  }
  return Array.from(qualities);
}

export function getAvailableCodecs(response: InitialPlayerResponse): {
  video: string[];
  audio: string[];
} {
  // YouTube no longer ships progressive `streamingData.formats`, so the
  // adaptive list is the only source.
  const formats = response.streamingData?.adaptiveFormats ?? [];
  const video = new Set<string>();
  const audio = new Set<string>();
  for (const fmt of formats) {
    const match = fmt.mimeType.match(/codecs="([^"]+)"/);
    if (!match) continue;
    // Unreachable when match succeeds (group is required), but guarded
    // for noUncheckedIndexedAccess without `!` assertions.
    const codecsStr = match[1];
    if (!codecsStr) continue;
    const codecs = codecsStr.split(",").map((c) => c.trim());
    if (fmt.mimeType.startsWith("audio/")) {
      codecs.forEach((c) => audio.add(c));
    } else {
      codecs.forEach((c, i) => (i === 0 ? video : audio).add(c));
    }
  }
  return { video: Array.from(video).sort(), audio: Array.from(audio).sort() };
}

export function selectBestQuality(
  preferred: Quality,
  available: Quality[],
): string {
  if (available.length === 0) return preferred;

  const preferredRank = QUALITY_RANK[preferred] ?? 0;
  const sorted = available
    .map((q) => ({ quality: q, rank: QUALITY_RANK[q] ?? 0 }))
    .sort((a, b) => a.rank - b.rank);

  const lowest = sorted[0];
  const highest = sorted[sorted.length - 1];
  // Unreachable: `available` is non-empty so `sorted` is too. The fallback
  // only satisfies noUncheckedIndexedAccess without `!` assertions.
  if (!lowest || !highest) return preferred;

  const minRank = lowest.rank;
  const maxRank = highest.rank;

  if (preferredRank >= maxRank) return highest.quality;
  if (preferredRank <= minRank) return lowest.quality;

  const exact = sorted.find((item) => item.rank === preferredRank);
  if (exact) return exact.quality;

  return sorted.reduce((prev, curr) =>
    Math.abs(curr.rank - preferredRank) < Math.abs(prev.rank - preferredRank)
      ? curr
      : prev,
  ).quality;
}

function findVideoPrimaryInfo(
  contents: ResultsContent[],
): ResultsContent | undefined {
  return contents.find(
    (
      item,
    ): item is ResultsContent & {
      videoPrimaryInfoRenderer: NonNullable<
        ResultsContent["videoPrimaryInfoRenderer"]
      >;
    } => item.videoPrimaryInfoRenderer !== undefined,
  );
}

export function getViewCount(
  data: InitialData,
  state: VideoStateValue | null,
): string | null {
  const contents =
    data.contents.twoColumnWatchNextResults?.results.results.contents;
  if (!contents) return null;
  const videoPrimaryInfo = findVideoPrimaryInfo(contents);

  if (!videoPrimaryInfo?.videoPrimaryInfoRenderer) return null;

  const content =
    videoPrimaryInfo.videoPrimaryInfoRenderer.viewCount.videoViewCountRenderer
      .viewCount;

  return state === VideoState.UPCOMING || state === VideoState.LIVE
    ? (content?.runs?.map((r) => r.text).join("") ?? null)
    : (content?.simpleText ?? null);
}

export function getVideoBadges(
  data: InitialData,
  state: VideoStateValue | null,
): string[] {
  if (state !== VideoState.VOD) return [];

  const contents =
    data.contents.twoColumnWatchNextResults?.results.results.contents;
  if (!contents) return [];
  const videoPrimaryInfo = findVideoPrimaryInfo(contents);

  if (!videoPrimaryInfo?.videoPrimaryInfoRenderer) return [];

  const badges = videoPrimaryInfo.videoPrimaryInfoRenderer.badges;
  if (!badges?.length) return [];

  return badges.map((badge) => badge.metadataBadgeRenderer.label);
}

export function getDateText(
  ytInitialData: InitialData,
  ytInitialPlayerResponse: InitialPlayerResponse,
  state: VideoStateValue | null,
): string | null {
  if (state === VideoState.UPCOMING) {
    return (
      ytInitialPlayerResponse.playabilityStatus.liveStreamability?.liveStreamabilityRenderer.offlineSlate?.liveStreamOfflineSlateRenderer.mainText.runs
        ?.map((r) => r.text)
        .join("") ?? null
    );
  }

  const contents =
    ytInitialData.contents.twoColumnWatchNextResults?.results.results.contents;
  if (!contents) return null;
  const videoPrimaryInfo = findVideoPrimaryInfo(contents);

  if (!videoPrimaryInfo?.videoPrimaryInfoRenderer) return null;

  const content = videoPrimaryInfo.videoPrimaryInfoRenderer;
  return state === VideoState.LIVE
    ? (content?.dateText?.simpleText ?? null)
    : (content?.relativeDateText?.simpleText ?? null);
}

export function getDVREnabled(response: InitialPlayerResponse): boolean {
  return response.videoDetails.isLiveDvrEnabled === true;
}
