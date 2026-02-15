// lib/sites/youtube/types/feature.ts

export interface Feature {
  match: (path: string) => boolean;
  init?: () => void | (() => void) | Promise<() => void>;
  destroy?: () => void;
}
