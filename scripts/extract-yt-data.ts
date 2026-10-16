// scripts/extract-yt-data.ts

import { $ } from "bun";
import { mkdirSync } from "fs";
import { join } from "path";

const VIDEO_STATUS = ["nonlive", "live", "waslive", "upcoming"] as const;
type VideoStatus = (typeof VIDEO_STATUS)[number];

const BASE_DIR = ".dev/VideoData";
const INITIAL_DATA_DIR = join(BASE_DIR, "InitialData");
const INITIAL_PLAYER_RESPONSE_DIR = join(BASE_DIR, "InitialPlayerResponse");
const UPDATED_METADATA_DIR = join(BASE_DIR, "UpdatedMetadata");

function parseArgs(): {
  videoId: string;
  status: VideoStatus;
  outputPath: string;
} {
  const [, , videoId, status, outputPath] = process.argv;

  if (!videoId || !status || !outputPath) {
    console.error(
      "Usage: bun scripts/extract-yt-data.ts <videoId> <status> <outputPath>",
    );
    console.error("Status options:", VIDEO_STATUS.join(", "));
    process.exit(1);
  }

  if (!VIDEO_STATUS.includes(status as VideoStatus)) {
    console.error(
      `Invalid status: "${status}". Must be one of: ${VIDEO_STATUS.join(", ")}`,
    );
    process.exit(1);
  }

  return { videoId, status: status as VideoStatus, outputPath };
}

function ensureDirectories() {
  mkdirSync(INITIAL_DATA_DIR, { recursive: true });
  mkdirSync(INITIAL_PLAYER_RESPONSE_DIR, { recursive: true });
  mkdirSync(UPDATED_METADATA_DIR, { recursive: true });
}

const PAGE_USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

function matchPage(html: string, pattern: RegExp, label: string): string {
  const match = html.match(pattern);

  if (!match?.[1]) {
    throw new Error(`Could not find ${label} in page source`);
  }

  return match[1];
}

/**
 * Fetches the `/youtubei/v1/updated_metadata` payload YouTube pushes during
 * playback (live view count, like count, ...). Only live streams advertise an
 * `updatedMetadataEndpoint`, so non-live pages return null.
 */
async function fetchUpdatedMetadata(
  html: string,
  videoId: string,
): Promise<object | null> {
  const paramsMatch = html.match(
    /"updatedMetadataEndpoint":\{[^{}]*?"params":"([^"]+)"/,
  );

  if (!paramsMatch?.[1]) {
    console.log(
      "Skipped updated_metadata: no updatedMetadataEndpoint (not live)",
    );
    return null;
  }

  const apiKey = matchPage(
    html,
    /"INNERTUBE_API_KEY":"([^"]+)"/,
    "INNERTUBE_API_KEY",
  );
  const clientVersion = matchPage(
    html,
    /"INNERTUBE_CLIENT_VERSION":"([^"]+)"/,
    "INNERTUBE_CLIENT_VERSION",
  );

  const url = `https://www.youtube.com/youtubei/v1/updated_metadata?key=${apiKey}&prettyPrint=false`;
  console.log(`Fetching: ${url}`);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": "en-US,en;q=0.9",
      "User-Agent": PAGE_USER_AGENT,
    },
    body: JSON.stringify({
      context: { client: { clientName: "WEB", clientVersion, hl: "en" } },
      videoId,
      params: paramsMatch[1],
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch updated_metadata: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
}

async function fetchYouTubePage(videoId: string): Promise<string> {
  const url = `https://www.youtube.com/watch?v=${videoId}`;
  console.log(`Fetching: ${url}`);

  const response = await fetch(url, {
    headers: {
      "User-Agent": PAGE_USER_AGENT,
      "Accept-Language": "en-US,en;q=0.9",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch page: ${response.status} ${response.statusText}`,
    );
  }

  return response.text();
}

function extractJson(html: string, variableName: string): string {
  const pattern = new RegExp(`var ${variableName}\\s*=\\s*(\\{.*?\\});`, "s");
  const match = html.match(pattern);

  if (!match?.[1]) {
    throw new Error(`Could not find ${variableName} in page source`);
  }

  return match[1];
}

function parseAndValidateJson(raw: string, label: string): object {
  try {
    return JSON.parse(raw);
  } catch {
    throw new Error(`Failed to parse ${label} as JSON`);
  }
}

async function writeJson(dirPath: string, name: string, data: object) {
  const filePath = join(dirPath, `${name}.json`);
  await Bun.write(filePath, JSON.stringify(data, null, 2));
  console.log(`Written: ${filePath}`);
  return filePath;
}

async function runQuicktype(outputPath: string) {
  console.log(
    `Running: bunx quicktype ${BASE_DIR} -o ${outputPath} --just-types`,
  );
  try {
    await $`bunx quicktype ${BASE_DIR} -o ${outputPath} --just-types`;
    console.log(`Types generated: ${outputPath}`);
  } catch {
    throw new Error("quicktype failed. Make sure bunx can download it.");
  }
}

async function runPrettier(outputPath: string) {
  console.log(`Running: bunx prettier --write ${outputPath}`);
  try {
    await $`bunx prettier --write ${outputPath}`;
  } catch {
    throw new Error("prettier failed. Make sure bunx can download it.");
  }
}

async function main() {
  const { videoId, status, outputPath } = parseArgs();

  // One file per (status, video): the sample corpus accumulates instead of
  // overwriting, so quicktype keeps coverage contributed by earlier videos.
  const name = `${status}.${videoId}`;

  ensureDirectories();

  const html = await fetchYouTubePage(videoId);

  const rawInitialData = extractJson(html, "ytInitialData");
  const rawInitialPlayerResponse = extractJson(html, "ytInitialPlayerResponse");

  const initialData = parseAndValidateJson(rawInitialData, "ytInitialData");
  const initialPlayerResponse = parseAndValidateJson(
    rawInitialPlayerResponse,
    "ytInitialPlayerResponse",
  );

  await writeJson(INITIAL_DATA_DIR, name, initialData);
  await writeJson(INITIAL_PLAYER_RESPONSE_DIR, name, initialPlayerResponse);

  const updatedMetadata = await fetchUpdatedMetadata(html, videoId);
  if (updatedMetadata) {
    await writeJson(UPDATED_METADATA_DIR, name, updatedMetadata);
  }

  await runQuicktype(outputPath);
  await runPrettier(outputPath);

  console.log("\nDone.");
}

main().catch((err) => {
  console.error("Error:", (err as Error).message);
  process.exit(1);
});
