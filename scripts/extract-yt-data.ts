// scripts/extract-yt-data.ts

import { execSync } from "child_process";
import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";

const VIDEO_STATUS = ["nonlive", "live", "waslive", "upcoming"] as const;
type VideoStatus = (typeof VIDEO_STATUS)[number];

const BASE_DIR = ".dev/VideoData";
const INITIAL_DATA_DIR = join(BASE_DIR, "InitialData");
const INITIAL_PLAYER_RESPONSE_DIR = join(BASE_DIR, "InitialPlayerResponse");

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
}

async function fetchYouTubePage(videoId: string): Promise<string> {
  const url = `https://www.youtube.com/watch?v=${videoId}`;
  console.log(`Fetching: ${url}`);

  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
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

function writeJson(dirPath: string, status: VideoStatus, data: object) {
  const filePath = join(dirPath, `${status}.json`);
  writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  console.log(`Written: ${filePath}`);
  return filePath;
}

function runQuicktype(outputPath: string) {
  const cmd = `quicktype ${BASE_DIR} -o ${outputPath} --just-types`;
  console.log(`Running: ${cmd}`);

  try {
    execSync(cmd, { stdio: "inherit" });
    console.log(`Types generated: ${outputPath}`);
  } catch {
    throw new Error(
      "quicktype failed. Make sure it is installed: npm i -g quicktype",
    );
  }
}

async function main() {
  const { videoId, status, outputPath } = parseArgs();

  ensureDirectories();

  const html = await fetchYouTubePage(videoId);

  const rawInitialData = extractJson(html, "ytInitialData");
  const rawInitialPlayerResponse = extractJson(html, "ytInitialPlayerResponse");

  const initialData = parseAndValidateJson(rawInitialData, "ytInitialData");
  const initialPlayerResponse = parseAndValidateJson(
    rawInitialPlayerResponse,
    "ytInitialPlayerResponse",
  );

  writeJson(INITIAL_DATA_DIR, status, initialData);
  writeJson(INITIAL_PLAYER_RESPONSE_DIR, status, initialPlayerResponse);

  runQuicktype(outputPath);

  console.log("\nDone.");
}

main().catch((err) => {
  console.error("Error:", (err as Error).message);
  process.exit(1);
});
