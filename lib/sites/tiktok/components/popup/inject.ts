// lib/sites/tiktok/components/popup/inject.ts
//
// DOM placement only. The popup button is mounted into TikTok's top-right
// action bar; the panel lives on <body> so the bar's overflow cannot clip it.

import { waitForElement } from "@/lib/core/utils";
import { TIKTOK_SELECTORS } from "../../selectors";

const INJECT_TIMEOUT_MS = 10000;

/**
 * Mounts the button once the action bar exists. Bounded by a timeout (same
 * pattern as the YouTube MenuInjector), and re-entrant calls are ignored
 * while a pending attempt is running.
 */
export class PopupInjector {
  private pending = false;

  constructor(private readonly getRoot: () => HTMLElement | null) {}

  inject(): void {
    const root = this.getRoot();
    if (!root || root.isConnected || this.pending) return;

    const bar = document.querySelector<HTMLElement>(
      TIKTOK_SELECTORS.topRightActionBar,
    );
    if (bar) {
      bar.insertAdjacentElement("afterbegin", root);
      return;
    }

    this.pending = true;
    void (async () => {
      const found = await waitForElement<HTMLElement>(
        TIKTOK_SELECTORS.topRightActionBar,
        INJECT_TIMEOUT_MS,
      );
      this.pending = false;

      // Destroy may have run while waiting — never touch detached DOM.
      const current = this.getRoot();
      if (!found || !current || current.isConnected) return;
      found.insertAdjacentElement("afterbegin", current);
    })();
  }
}
