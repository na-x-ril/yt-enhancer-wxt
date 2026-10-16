// lib/sites/youtube/components/dropdown/inject.ts
//
// Places the dropdown button and menu into YouTube's page chrome. Kept
// separate from the Dropdown orchestrator because it is purely about
// finding the right host elements.

import {
  ELEMENT_IDS,
  ELEMENT_SELECTORS,
  waitForElement,
} from "@/lib/core/utils";

const MENU_INJECT_TIMEOUT_MS = 5000;

export function injectDropdownButton(container: HTMLElement): void {
  const target = document.querySelector<HTMLElement>(ELEMENT_SELECTORS.videoEnd);
  if (!target) return;
  if (document.querySelector(`#${ELEMENT_IDS.dropdown}`)) return;
  target.insertAdjacentElement("afterbegin", container);
}

/**
 * Injects the menu into YouTube's popup container once it exists, bounded by
 * a timeout (previously an unbounded rAF loop). Re-entrant calls are ignored
 * until the pending attempt settles.
 */
export class MenuInjector {
  private pending = false;

  constructor(private readonly getMenu: () => HTMLElement | null) {}

  inject(): void {
    if (!this.getMenu() || document.querySelector(`#${ELEMENT_IDS.menu}`)) {
      return;
    }
    if (this.pending) return;
    this.pending = true;

    void (async () => {
      const popupContainer = await waitForElement<Element>(
        ELEMENT_SELECTORS.popupContainer,
        MENU_INJECT_TIMEOUT_MS,
      );
      this.pending = false;

      // Destroy may have run while waiting — never touch detached DOM.
      const menu = this.getMenu();
      if (!popupContainer || menu === null) return;
      popupContainer.appendChild(menu);
    })();
  }
}
