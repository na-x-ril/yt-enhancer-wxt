// lib/sites/tiktok/features/shared/logic.ts
//
// Pure media-state predicates for the playback layer. DOM lookup/state
// matching belongs to selectors.ts, not here.

export function needsUnmute(state: {
  muted: boolean;
  volume: number;
}): boolean {
  return state.muted || state.volume === 0;
}
