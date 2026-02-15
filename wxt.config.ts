// wxt.config.ts
import { defineConfig } from "wxt";

export default defineConfig({
  manifest: ({ browser, manifestVersion }) => {
    const basePermissions = ["storage", "tabs", "scripting"];
    const mv2Permissions = ["webRequest", "webRequestBlocking"];
    const mv3Permissions = ["webRequest"];

    return {
      name: "YT-Enhancer",
      description: "Enhance your YouTube experience",
      version: "1.0.0",
      permissions: [
        ...basePermissions,
        ...(manifestVersion === 2 ? mv2Permissions : mv3Permissions),
      ],
      host_permissions:
        manifestVersion === 3 ? ["*://*.youtube.com/*"] : undefined,
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
                strict_min_version: "91.0",
              },
            }
          : undefined,
    };
  },
});
