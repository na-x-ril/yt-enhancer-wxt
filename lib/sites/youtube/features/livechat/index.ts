// lib/sites/youtube/features/livechat/index.ts

export const livechatFeature = {
  match: (path: string) =>
    path === "/live_chat" || path === "/live_chat_replay",
};
