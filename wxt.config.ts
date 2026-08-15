// wxt.config.ts
import { defineConfig } from "wxt";

export default defineConfig({
  manifest: ({ browser }) => ({
    name: "YT-Enhancer",
    description: "Enhance your YouTube experience",
    version: "1.0.0",
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
            },
          }
        : undefined,
  }),
});
