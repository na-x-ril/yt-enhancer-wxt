// lib/sites/youtube/events.ts
//
// Single source of truth for the window CustomEvent names the extension
// dispatches between components. `docs/EVENTS.md` documents the payloads;
// this module owns the string identities so dispatch/listener sites can
// never drift.

export const EVENTS = {
  refresh: "yt-enhancer-refresh",
  setting: "yt-enhancer-setting",
  quality: "yt-enhancer-quality",
  codecReload: "yt-enhancer-codec-reload",
  codecSetting: "yt-enhancer-codec-setting",
  codecsUpdated: "yt-enhancer-codecs-updated",
  sbSetting: "yt-enhancer-sb-setting",
  metadataUpdate: "yt-enhancer-metadata-update",
} as const satisfies Record<string, string>;
