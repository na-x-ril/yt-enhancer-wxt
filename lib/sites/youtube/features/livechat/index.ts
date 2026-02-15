// lib/sites/youtube/features/livechat/index.ts

import { delay, waitForElement } from "@/lib/core/utils";

export const livechatFeature = (() => {
  let allChatButton: HTMLButtonElement | null = null;

  // ===== Main Functions =====
  const clickAllChatButton = async () => {
    try {
      allChatButton = await waitForElement<HTMLButtonElement>(
        "a.yt-simple-endpoint:nth-child(2)",
      );

      if (allChatButton) {
        console.log("All chat button found, clicking...");
        allChatButton.click();
      } else {
        console.warn("All chat button not found");
      }
    } catch (err) {
      console.error("Failed to click all chat button:", err);
    }
  };

  // ===== Module Interface =====
  return {
    match: (path: string) => {
      return path === "/live_chat" || path === "/live_chat_replay";
    },

    init: async () => {
      console.log("Livechat feature initialized");

      await delay(500);
      await clickAllChatButton();

      return () => {
        allChatButton = null;
        console.log("Livechat feature destroyed");
      };
    },
  };
})();
