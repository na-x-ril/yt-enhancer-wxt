// lib/sites/youtube/types/player.ts

import { InitialPlayerResponse } from "./VideoData";

export interface YouTubePlayer {
  setLoop: (loop: boolean) => void;
  setLoopVideo: (loop: boolean) => void;
  setPlaybackQualityRange: (resolution: string) => Promise<void>;
  playVideo: () => void;
  pauseVideo: () => void;

  getVideoData: () => {
    video_id: string;
    title: string;
    author: string;
    isLive?: boolean;
  };

  getPlaylist: () => string[];
  getPlaylistIndex: () => number;

  addEventListener: (event: string, listener: (...args: any[]) => void) => void;

  removeEventListener: (
    event: string,
    listener: (...args: any[]) => void,
  ) => void;

  [key: string]: any;
}

export const VideoState = {
  VOD: 1,
  PAST_LIVE: 2,
  LIVE: 3,
  UPCOMING: 4,
} as const satisfies Record<string, number>;

export type VideoStateValue = (typeof VideoState)[keyof typeof VideoState];

export const QUALITY_RANK = {
  highres: 8,
  hd1440: 7,
  hd1080: 6,
  hd720: 5,
  large: 4,
  medium: 3,
  small: 2,
  tiny: 1,
} satisfies Record<string, number>;

export type Quality = keyof typeof QUALITY_RANK;

export interface Config {
  autoLoop: boolean;
  autoCaption: boolean;
  qualityService: boolean;
  quality: Quality;
  sbEnabled: boolean;
}

export const DEFAULT_CONFIG = {
  autoLoop: true,
  autoCaption: true,
  qualityService: true,
  quality: "hd1080",
  sbEnabled: true,
} satisfies Config;

export interface State {
  id: string | null;
  state: VideoStateValue | null;
  player: YouTubePlayer | null;
  playerResponse: InitialPlayerResponse | null;
  videoBadges: string[];
  currentViewCount: number;
  currentDateText: string;
  lastSavedTime: number;
  isDestroyed: boolean;
  isCaptionActive: boolean;
}

export type BooleanKeys<T> = {
  [K in keyof T]: T[K] extends boolean ? K : never;
}[keyof T];

export type SettingEvent = {
  setting: BooleanKeys<Config>;
  value: boolean;
};
