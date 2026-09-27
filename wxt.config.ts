// wxt.config.ts
import { defineConfig } from "wxt";

export default defineConfig({
  manifest: ({ browser }) => ({
    name: "YT-Enhancer",
    permissions: ["storage"],
    host_permissions: ["*://*.youtube.com/*"],
    icons: {
      16: "icons/youtube-gear.svg",
      32: "icons/youtube-gear.svg",
      48: "icons/youtube-gear.svg",
      128: "icons/youtube-gear.svg",
    },
    browser_specific_settings:
      browser === "firefox"
        ? {
            gecko: {
              id: "yt-enhancer@example.com",
              strict_min_version: "109.0",
              // Required for new AMO submissions (Nov 2025+). Honest value:
              // when SponsorBlock is enabled, watched video IDs are sent to
              // https://sponsor.ajay.app to fetch skip segments. Everything
              // else stays in browser.storage.local. Confirm at submission.
              data_collection_permissions: {
                required: ["websiteContent"],
              },
            },
          }
        : undefined,
  }),
  zip: {
    // WXT 0.21 allowlist: only these are zipped as review sources.
    // Needs nothing but the rebuild inputs (bun install + bun run zip:firefox).
    includeSources: [
      "entrypoints",
      "lib",
      "public",
      "package.json",
      "bun.lock",
      "tsconfig.json",
      "wxt.config.ts",
      "README.md",
      "LICENSE",
    ],
    // Git-ignored dev fixtures that would otherwise ride along inside lib/.
    excludeSources: [
      "lib/sites/youtube/features/watch/index.dev.ts",
      "lib/sites/youtube/features/sponsorblock/test-data.ts",
    ],
  },
});
