// lib/sites/youtube/features/watch/time-tracking.ts
//
// Resume-playback: saves the playback position every few seconds and
// restores it on load. Operates on the shared mutable State plus the
// player — no other feature state involved.

import { storageBridge } from "@/lib/core/bridge/bridge";
import type { State, YouTubePlayer } from "../../types/player";
import { VideoState } from "../../types/player";

export function canTrackTime(state: State): boolean {
  return (
    !state.isDestroyed &&
    state.player !== null &&
    state.id !== null &&
    state.state !== VideoState.LIVE
  );
}

export async function saveTime(state: State): Promise<void> {
  if (!canTrackTime(state)) return;
  const player = state.player;
  if (!player) return;
  try {
    const currentTime = player.getCurrentTime();
    const duration = player.getDuration();
    if (!currentTime || !duration) return;

    const key = `video_time_${state.id}`;

    if (currentTime < 30 || duration - currentTime < 30) {
      await storageBridge.remove(key);
      state.lastSavedTime = 0;
      return;
    }

    if (Math.abs(currentTime - state.lastSavedTime) >= 3) {
      await storageBridge.set(key, currentTime);
      state.lastSavedTime = currentTime;
    }
  } catch (error) {
    console.warn("[WatchFeature] Save time error:", error);
  }
}

export async function restoreTime(state: State): Promise<void> {
  if (!canTrackTime(state)) return;
  const player = state.player;
  if (!player) return;
  try {
    const key = `video_time_${state.id}`;
    const savedTime = (await storageBridge.get(key)) as number | undefined;
    const duration = player.getDuration();
    if (!savedTime || !duration) return;

    if (savedTime < 30 || duration - savedTime < 30) {
      await storageBridge.remove(key);
      return;
    }

    player.seekTo(savedTime, true);
  } catch (error) {
    console.warn("[WatchFeature] Restore time error:", error);
  }
}

export function setupTimeTracking(
  state: State,
  player: YouTubePlayer,
): (() => void) | null {
  if (state.isDestroyed || state.state === VideoState.LIVE) return null;
  try {
    const onPause = () => void saveTime(state);
    const onStateChange = (...args: unknown[]) => {
      const [playerState] = args;
      if (playerState === 2 || playerState === 0) void saveTime(state);
    };

    player.addEventListener("onPause", onPause);
    player.addEventListener("onStateChange", onStateChange);

    return () => {
      player.removeEventListener("onPause", onPause);
      player.removeEventListener("onStateChange", onStateChange);
    };
  } catch (error) {
    console.warn("[WatchFeature] Setup time tracking error:", error);
    return null;
  }
}
