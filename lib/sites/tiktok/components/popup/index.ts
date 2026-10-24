// lib/sites/tiktok/components/popup/index.ts
//
// Popup orchestrator: owns the config, wiring, open/close state, and
// persistence. Rendering lives in main-page.ts and DOM placement in
// inject.ts — the same split as the YouTube Dropdown.

import { createElement, DATA_ATTRS, ELEMENT_CLASSES } from "@/lib/core/utils";
import { TIKTOK_EVENTS } from "../../events";
import { TIKTOK_CLASSES, TIKTOK_IDS } from "../../selectors";
import {
  loadTiktokConfig,
  saveTiktokConfig,
} from "../../features/config-store";
import { DEFAULT_CONFIG } from "../../types";
import type { TiktokConfig } from "../../types";
import { settingsIcon } from "@/lib/core/components/icons";
import { PopupInjector } from "./inject";
import { createMainPage, UNMUTE_TOGGLE_ID } from "./main-page";

export class TiktokPopup {
  private root: HTMLElement | null = null;
  private button: HTMLButtonElement | null = null;
  private panel: HTMLElement | null = null;
  private config: TiktokConfig = { ...DEFAULT_CONFIG };
  private isOpen = false;
  private destroyed = false;
  private readonly injector = new PopupInjector(() => this.root);
  private readonly cleanupFns: Array<() => void> = [];

  async init(): Promise<void> {
    // storage -> element -> execute: config first, then mount.
    this.config = await loadTiktokConfig();
    this.createUI();
    this.attachListeners();
    this.injector.inject();
  }

  /** Re-mount after TikTok re-renders its chrome (SPA navigation). */
  ensureMounted(): void {
    if (this.destroyed) return;

    if (this.panel && !this.panel.isConnected) {
      document.body.appendChild(this.panel);
    }

    this.injector.inject();
  }

  destroy(): void {
    this.destroyed = true;

    for (const cleanup of this.cleanupFns) cleanup();
    this.cleanupFns.length = 0;

    this.root?.remove();
    this.panel?.remove();
    this.root = null;
    this.button = null;
    this.panel = null;
  }

  private createUI(): void {
    this.root = createElement("div", { id: TIKTOK_IDS.popup });

    this.button = createElement("button", {
      id: TIKTOK_IDS.popupButton,
      type: "button",
      attrs: {
        "aria-label": "TikTok Enhancer Settings",
        "aria-expanded": "false",
      },
    });
    this.button.appendChild(settingsIcon());
    this.root.appendChild(this.button);

    this.panel = createElement("div", {
      id: TIKTOK_IDS.popupPanel,
      attrs: {
        role: "dialog",
        "aria-label": "TikTok Enhancer Settings",
      },
    });
    this.panel.hidden = true;
    this.panel.appendChild(createMainPage(this.config));

    document.body.appendChild(this.panel);
  }

  private attachListeners(): void {
    this.attachButtonListener();
    this.attachPanelListener();
    this.attachDocumentListeners();
  }

  private attachButtonListener(): void {
    if (!this.button) return;

    const handleClick = (event: Event) => {
      event.stopPropagation();
      this.setOpen(!this.isOpen);
    };

    this.button.addEventListener("click", handleClick);
    this.cleanupFns.push(() =>
      this.button?.removeEventListener("click", handleClick),
    );
  }

  private attachPanelListener(): void {
    if (!this.panel) return;

    const handlePanelClick = (event: Event) => {
      event.stopPropagation();
      const target = event.target as HTMLElement;
      const item = target.closest<HTMLElement>(
        `.${ELEMENT_CLASSES.toggleItem}`,
      );
      if (item) this.handleToggle(item);
    };

    this.panel.addEventListener("click", handlePanelClick);
    this.cleanupFns.push(() =>
      this.panel?.removeEventListener("click", handlePanelClick),
    );
  }

  private attachDocumentListeners(): void {
    const handleDocumentClick = (event: Event) => {
      if (!this.isOpen) return;
      const target = event.target as Node | null;
      if (
        target &&
        (this.panel?.contains(target) || this.root?.contains(target))
      ) {
        return;
      }
      this.setOpen(false);
    };

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && this.isOpen) {
        this.setOpen(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);
    document.addEventListener("keydown", handleKeydown);

    this.cleanupFns.push(() => {
      document.removeEventListener("click", handleDocumentClick);
      document.removeEventListener("keydown", handleKeydown);
    });
  }

  private handleToggle(item: HTMLElement): void {
    if (item.getAttribute(DATA_ATTRS.toggleId) !== UNMUTE_TOGGLE_ID) return;

    this.config = { ...this.config, unmute: !this.config.unmute };
    this.renderToggle();

    // Keep the UI responsive even if storage is slow; persistence still goes
    // through the shared choke point and the event is dispatched regardless
    // (same in-memory-first behaviour as the YouTube dropdown).
    this.dispatchSetting();
    void this.persist();
  }

  private renderToggle(): void {
    const item = this.panel?.querySelector<HTMLElement>(
      `.${ELEMENT_CLASSES.toggleItem}`,
    );
    if (!item) return;

    const active = this.config.unmute;
    item.setAttribute("aria-checked", String(active));

    const toggle = item.querySelector<HTMLElement>(
      `.${ELEMENT_CLASSES.toggleSwitch}`,
    );
    toggle?.classList.toggle("active", active);
  }

  private async persist(): Promise<void> {
    await saveTiktokConfig(this.config);
  }

  private dispatchSetting(): void {
    window.dispatchEvent(
      new CustomEvent(TIKTOK_EVENTS.setting, {
        detail: { config: { ...this.config } },
      }),
    );
  }

  private setOpen(open: boolean): void {
    if (!this.panel || !this.button) return;

    this.isOpen = open;
    this.panel.hidden = !open;
    this.button.setAttribute("aria-expanded", String(open));
    this.button.classList.toggle(TIKTOK_CLASSES.popupActive, open);
  }
}
