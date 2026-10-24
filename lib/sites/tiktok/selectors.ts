// lib/sites/tiktok/selectors.ts
//
// Every TikTok-owned DOM identity lives here (same rule as the YouTube site:
// third-party markup is brittle, so keep the literals in one place).

export const TIKTOK_SELECTORS = {
  /** Top-right action bar where the extension popup is mounted. */
  topRightActionBar: "#top-right-action-bar",
  /** Muted volume button: aria-pressed="false". */
  volumeButtonMuted: 'button[aria-label="Volume"][aria-pressed="false"]',
  video: "video",
} as const;

/** The action target: topmost muted volume button. */
export const VOLUME_BUTTON_MUTED_SELECTOR =
  TIKTOK_SELECTORS.volumeButtonMuted;

/** IDs owned by the extension itself. */
export const TIKTOK_IDS = {
  popup: "tiktok-enhancer-popup",
  popupButton: "tiktok-enhancer-popup-button",
  popupPanel: "tiktok-enhancer-popup-panel",
} as const;

/** TikTok-only classes (toggle-switch/knob reuse the core ELEMENT_CLASSES). */
export const TIKTOK_CLASSES = {
  popupActive: "tt-enhancer-popup-button-active",
  toggleRow: "tt-enhancer-toggle-row",
  toggleText: "tt-enhancer-toggle-text",
} as const;
