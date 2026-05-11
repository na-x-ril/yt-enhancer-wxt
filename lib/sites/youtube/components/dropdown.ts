// lib/sites/youtube/components/dropdown.ts

import { storageBridge } from "@/lib/core/bridge/bridge";
import { buildSVG, createElement, ELEMENT_IDS } from "@/lib/core/utils";

interface DropdownConfig {
  autoLoop: boolean;
  qualityService: boolean;
  autoCaption: boolean;
  preferredQuality: string;
}

type ToggleKey = keyof Omit<DropdownConfig, "preferredQuality">;

const STORAGE_KEY = "dropdown_config";

const DEFAULT_CONFIG: DropdownConfig = {
  autoLoop: true,
  qualityService: true,
  autoCaption: true,
  preferredQuality: "hd1080",
};

const TOGGLE_ITEMS: Array<{ id: ToggleKey; label: string }> = [
  { id: "autoLoop", label: "Auto Loop" },
  { id: "qualityService", label: "Quality Service" },
  { id: "autoCaption", label: "Auto Caption" },
];

const QUALITY_OPTIONS = [
  { value: "highres", label: "2160p", description: "4K" },
  { value: "hd1440", label: "1440p", description: "2K" },
  { value: "hd1080", label: "1080p", description: "Full HD" },
  { value: "hd720", label: "720p", description: "HD" },
  { value: "large", label: "480p", description: "SD" },
  { value: "medium", label: "360p", description: "" },
  { value: "small", label: "240p", description: "" },
  { value: "tiny", label: "144p", description: "" },
];

export class Dropdown {
  private container: HTMLElement | null = null;
  private button: HTMLElement | null = null;
  private menu: HTMLElement | null = null;
  private config: DropdownConfig = { ...DEFAULT_CONFIG };
  private isOpen = false;
  private cleanupFns: Array<() => void> = [];

  async init() {
    await this.loadConfig();
    this.createUI();
    this.attachListeners();
  }

  private async loadConfig() {
    try {
      const saved = await storageBridge.get(STORAGE_KEY);
      if (saved) {
        this.config = { ...DEFAULT_CONFIG, ...saved };
      }
    } catch (error) {
      console.warn("Failed to load dropdown config:", error);
    }
  }

  private createUI() {
    this.createContainer();
    this.createButton();
    this.createMenu();
  }

  private createContainer() {
    this.container = createElement("div", { id: ELEMENT_IDS.dropdown });
  }

  private createButton() {
    this.button = createElement("button", {
      id: ELEMENT_IDS.dropdownButton,
      ariaLabel: "YT Enhancer Settings",
      ariaExpanded: "false",
    });
    this.button.appendChild(
      buildSVG(
        "0 0 24 24",
        [
          {
            d: "M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94L14.4 2.81c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z",
            attrs: { fill: "currentColor" },
          },
        ],
        { width: "24", height: "24", xmlns: "http://www.w3.org/2000/svg" },
      ),
    );

    this.container?.appendChild(this.button);
  }

  private createMenu() {
    this.menu = createElement("div", { id: ELEMENT_IDS.menu, role: "menu" });

    const header = this.createHeader();
    this.menu.appendChild(header);

    TOGGLE_ITEMS.forEach(({ id, label }) => {
      this.menu?.appendChild(this.createToggleItem(id, label));
    });

    this.menu?.appendChild(this.createQualitySelector());
  }

  private createHeader(): HTMLElement {
    const header = createElement("div", { id: ELEMENT_IDS.menuHeader });

    const title = createElement("span", {
      className: "header-title",
      textContent: "YT Enhancer Settings",
    });

    const refreshButton = createElement("button", {
      className: "header-refresh",
      ariaLabel: "Refresh player features",
    });
    refreshButton.appendChild(
      buildSVG("0 0 24 24", [
        {
          d: "M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z",
          attrs: { fill: "currentColor" },
        },
      ]),
    );

    refreshButton.onclick = async (e) => {
      e.stopPropagation();

      refreshButton.disabled = true;

      const svg = refreshButton.querySelector<SVGElement>("svg");
      if (svg) {
        svg.style.transition = "transform 0.5s ease";
        svg.style.transform = "rotate(360deg)";
      }

      window.dispatchEvent(new CustomEvent("yt-enhancer-refresh"));

      setTimeout(() => {
        refreshButton.disabled = false;
        if (svg) svg.style.transform = "rotate(0deg)";
      }, 500);
    };

    header.append(title, refreshButton);
    return header;
  }

  private createToggleItem(id: ToggleKey, label: string): HTMLElement {
    const item = createElement("div", {
      className: "toggle-item",
      attrs: { "data-id": id },
      role: "menuitemcheckbox",
      ariaChecked: String(this.config[id]),
    });

    const labelSpan = createElement("span", {
      className: "toggle-item-label",
      textContent: label,
    });

    const toggleSwitch = this.createToggleSwitch(this.config[id]);

    item.append(labelSpan, toggleSwitch);
    return item;
  }

  private createToggleSwitch(isActive: boolean): HTMLElement {
    const toggleSwitch = createElement("div", {
      className: `toggle-switch ${isActive ? "active" : ""}`,
    });

    const toggleKnob = createElement("div", { className: "toggle-knob" });

    toggleSwitch.appendChild(toggleKnob);
    return toggleSwitch;
  }

  private createQualitySelector(): HTMLElement {
    const container = createElement("div", {
      className: "quality-selector-container",
    });

    const labelWrapper = createElement("div", {
      className: "quality-selector-header",
    });

    const label = createElement("span", {
      className: "quality-selector-label",
      textContent: "Preferred Quality",
    });

    const currentQuality = QUALITY_OPTIONS.find(
      (opt) => opt.value === this.config.preferredQuality,
    );
    const badge = createElement("span", {
      id: "quality-badge",
      className: "quality-badge",
      textContent: currentQuality?.label || "1080p",
    });

    labelWrapper.append(label, badge);

    const selectWrapper = createElement("div", {
      className: "quality-select-wrapper",
    });

    const select = createElement("select", {
      id: "quality-selector",
      className: "quality-selector",
      ariaLabel: "Select preferred video quality",
    });

    QUALITY_OPTIONS.forEach(({ value, label, description }) => {
      const option = createElement("option", {
        value: value,
        textContent: description ? `${label} (${description})` : label,
        selected: value === this.config.preferredQuality,
      });
      select.appendChild(option);
    });

    const icon = createElement("span", { className: "quality-select-icon" });
    icon.appendChild(
      buildSVG(
        "0 0 16 16",
        [
          {
            d: "M4 6L8 10L12 6",
            attrs: {
              stroke: "currentColor",
              "stroke-width": "2",
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
            },
          },
        ],
        { width: "16", height: "16" },
      ),
    );

    selectWrapper.append(select, icon);
    container.append(labelWrapper, selectWrapper);
    return container;
  }

  private attachListeners() {
    this.attachButtonListener();
    this.attachMenuListener();
    this.attachQualityListener();
    this.attachDocumentListeners();
  }

  private attachButtonListener() {
    if (!this.button) return;

    const handleClick = (e: Event) => {
      e.stopPropagation();
      this.toggleMenu();
    };

    this.button.addEventListener("click", handleClick);
    this.cleanupFns.push(() =>
      this.button?.removeEventListener("click", handleClick),
    );
  }

  private attachMenuListener() {
    if (!this.menu) return;

    const handleMenuClick = (e: Event) => {
      e.stopPropagation();

      const target = e.target as HTMLElement;
      const item = target.closest<HTMLElement>(".toggle-item");

      if (item) {
        this.handleToggle(item);
      }
    };

    this.menu.addEventListener("click", handleMenuClick);
    this.cleanupFns.push(() =>
      this.menu?.removeEventListener("click", handleMenuClick),
    );
  }

  private attachQualityListener() {
    const select =
      this.menu?.querySelector<HTMLSelectElement>("#quality-selector");
    if (!select) return;

    const handleChange = (e: Event) => {
      const target = e.target as HTMLSelectElement;
      const quality = target.value;

      // Update badge
      const badge = this.menu?.querySelector("#quality-badge");
      const selectedOption = QUALITY_OPTIONS.find(
        (opt) => opt.value === quality,
      );
      if (badge && selectedOption) {
        badge.textContent = selectedOption.label;
      }

      this.config.preferredQuality = quality;
      this.saveConfig();
      this.dispatchQualityChange(quality);
    };

    select.addEventListener("change", handleChange);
    this.cleanupFns.push(() =>
      select?.removeEventListener("change", handleChange),
    );
  }

  private attachDocumentListeners() {
    const handleDocumentClick = () => {
      if (this.isOpen) this.closeMenu();
    };

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && this.isOpen) {
        this.closeMenu();
      }
    };

    document.addEventListener("click", handleDocumentClick);
    document.addEventListener("keydown", handleKeydown);

    this.cleanupFns.push(() => {
      document.removeEventListener("click", handleDocumentClick);
      document.removeEventListener("keydown", handleKeydown);
    });
  }

  private handleToggle(item: HTMLElement) {
    const id = item.getAttribute("data-id") as ToggleKey | null;
    if (!id || !(id in this.config)) return;

    const toggleSwitch = item.querySelector<HTMLElement>(".toggle-switch");
    if (!toggleSwitch) return;

    const isActive = toggleSwitch.classList.contains("active");
    const newValue = !isActive;

    this.updateToggleUI(toggleSwitch, newValue);
    item.setAttribute("aria-checked", String(newValue));

    this.config[id] = newValue;

    this.saveConfig();
    this.dispatchSettingChange(id, newValue);
  }

  private updateToggleUI(toggleSwitch: HTMLElement, isActive: boolean) {
    if (isActive) {
      toggleSwitch.classList.add("active");
    } else {
      toggleSwitch.classList.remove("active");
    }
  }

  private toggleMenu() {
    if (this.isOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  private openMenu() {
    if (!this.menu || !this.button) return;

    this.menu.classList.add("open");
    this.button.classList.add("active");
    this.button.setAttribute("aria-expanded", "true");
    this.isOpen = true;
  }

  private closeMenu() {
    if (!this.menu || !this.button) return;

    this.menu.classList.remove("open");
    this.button.classList.remove("active");
    this.button.setAttribute("aria-expanded", "false");
    this.isOpen = false;
  }

  private async saveConfig() {
    try {
      await storageBridge.set(STORAGE_KEY, this.config);
    } catch (error) {
      console.warn("Failed to save dropdown config:", error);
    }
  }

  private dispatchSettingChange(setting: ToggleKey, value: boolean) {
    window.dispatchEvent(
      new CustomEvent("yt-enhancer-setting", {
        detail: { setting, value },
      }),
    );
  }

  private dispatchQualityChange(quality: string) {
    window.dispatchEvent(
      new CustomEvent("yt-enhancer-quality", {
        detail: { quality },
      }),
    );
  }

  inject() {
    this.injectButton();
    this.injectMenu();
  }

  private injectButton() {
    const target = document.querySelector<HTMLElement>("#end");
    if (
      target &&
      this.container &&
      !document.querySelector("#yt-enhancer-dropdown")
    ) {
      target.insertAdjacentElement("afterbegin", this.container);
    }
  }

  private injectMenu() {
    if (!this.menu || document.querySelector("#yt-enhancer-menu")) return;

    const waitForPopupContainer = () => {
      const popupContainer = document.querySelector<Element>(
        "ytd-popup-container.style-scope",
      );

      if (popupContainer) {
        popupContainer.appendChild(this.menu!);
      } else {
        requestAnimationFrame(waitForPopupContainer);
      }
    };

    requestAnimationFrame(waitForPopupContainer);
  }

  destroy() {
    this.cleanupFns.forEach((fn) => {
      try {
        fn();
      } catch (error) {
        console.warn("Cleanup error:", error);
      }
    });
    this.cleanupFns = [];

    this.container?.remove();
    this.menu?.remove();

    this.container = null;
    this.button = null;
    this.menu = null;
    this.isOpen = false;
  }

  getConfig(): Readonly<DropdownConfig> {
    return { ...this.config };
  }
}
