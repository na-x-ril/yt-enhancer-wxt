// lib/sites/youtube/components/dropdown/index.ts
//
// Dropdown orchestrator: owns the main config, wiring, open/close state,
// and navigation between pages. Rendering lives in main-page.ts (plus the
// sponsorblock/codec pages), codec validation in codec-section.ts, and DOM
// placement in inject.ts.

import {
  createElement,
  DATA_ATTRS,
  ELEMENT_CLASSES,
  ELEMENT_IDS,
} from "@/lib/core/utils";
import { EVENTS } from "@/lib/sites/youtube/events";
import { createSponsorBlockPage } from "../dropdown-pages/sponsorblock-page";
import { createCodecPage } from "../dropdown-pages/codec-page";
import { settingsIcon } from "../icons";
import type { SponsorBlockConfig } from "../../features/sponsorblock/types";
import {
  STORAGE_KEY as SB_STORAGE_KEY,
  DEFAULT_CONFIG as SB_DEFAULT_CONFIG,
  sanitizeSBConfig,
} from "../../features/sponsorblock/types";
import type { CodecConfig } from "../../features/codec/types";
import {
  STORAGE_KEY as CODEC_STORAGE_KEY,
  sanitizeCodecConfig,
} from "../../features/codec/types";
import {
  loadFeatureConfig,
  saveFeatureConfig,
} from "../../features/config-store";
import type { Config, Quality } from "../../types/player";
import {
  DEFAULT_CONFIG,
  normalizeSavedConfig,
  STORAGE_KEY,
} from "../../types/player";
import { CodecSection } from "./codec-section";
import { injectDropdownButton, MenuInjector } from "./inject";
import { sbBadgeText } from "./badges";
import {
  createMainPage,
  isToggleKey,
  QUALITY_VALUES,
  qualityLabel,
  type DropdownPage,
  type ToggleKey,
} from "./main-page";

export class Dropdown {
  private container: HTMLElement | null = null;
  private button: HTMLButtonElement | null = null;
  private menu: HTMLElement | null = null;
  private mainPage: HTMLElement | null = null;
  private sbPage: HTMLElement | null = null;
  private codecPage: HTMLElement | null = null;
  private config: Config = { ...DEFAULT_CONFIG };
  private sbConfig: SponsorBlockConfig = { ...SB_DEFAULT_CONFIG };
  private codecSection!: CodecSection;
  private menuInjector!: MenuInjector;
  private isOpen = false;
  private currentPage: DropdownPage = "main";
  private cleanupFns: Array<() => void> = [];

  async init() {
    await this.loadConfig();
    await this.loadSBConfig();
    const codecConfig = await this.loadCodecConfig();

    this.codecSection = new CodecSection(codecConfig, {
      getMenu: () => this.menu,
      onChange: (config) => void this.persistCodecConfig(config),
      onApply: () => this.emit(EVENTS.codecReload),
    });
    this.menuInjector = new MenuInjector(() => this.menu);

    this.dispatchCodecSetting();
    this.dispatchSBSetting();
    this.createUI();
    this.attachListeners();
  }

  private async loadConfig() {
    this.config = await loadFeatureConfig(
      STORAGE_KEY,
      "dropdown config",
      normalizeSavedConfig,
    );
  }

  private async loadSBConfig() {
    this.sbConfig = await loadFeatureConfig(
      SB_STORAGE_KEY,
      "SponsorBlock config",
      sanitizeSBConfig,
    );
  }

  private async loadCodecConfig(): Promise<CodecConfig> {
    return loadFeatureConfig(
      CODEC_STORAGE_KEY,
      "codec config",
      sanitizeCodecConfig,
    );
  }

  private createUI() {
    this.container = createElement("div", { id: ELEMENT_IDS.dropdown });

    this.button = createElement("button", {
      id: ELEMENT_IDS.dropdownButton,
      ariaLabel: "YT Enhancer Settings",
      ariaExpanded: "false",
    });
    this.button.appendChild(settingsIcon());
    this.container.appendChild(this.button);

    this.createMenu();
  }

  private createMenu() {
    this.menu = createElement("div", { id: ELEMENT_IDS.menu, role: "menu" });

    this.mainPage = createMainPage({
      config: this.config,
      sbConfig: this.sbConfig,
      codecConfig: this.codecSection.getConfig(),
      onNavigate: (page) => this.navigateTo(page),
      onRefresh: () => this.emit(EVENTS.refresh),
    });
    this.menu.appendChild(this.mainPage);

    this.sbPage = createElement("div", { className: "slide-page" });
    this.sbPage.appendChild(
      createSponsorBlockPage(
        () => this.sbConfig,
        () => this.navigateTo("main"),
        (newConfig) => void this.onSBConfigChange(newConfig),
      ),
    );
    this.menu.appendChild(this.sbPage);

    this.codecPage = createElement("div", { className: "slide-page" });
    this.codecPage.appendChild(
      createCodecPage(
        () => this.codecSection.getConfig(),
        () => this.navigateTo("main"),
        (id, value) => this.codecSection.toggle(id, value),
        () => this.codecSection.apply(),
      ),
    );
    this.menu.appendChild(this.codecPage);
  }

  private navigateTo(page: DropdownPage) {
    if (page === this.currentPage || !this.menu) return;

    const prevEl = this.getPageElement(this.currentPage);
    const nextEl = this.getPageElement(page);
    if (!prevEl || !nextEl) return;

    prevEl.classList.remove("visible");
    this.currentPage = page;
    nextEl.classList.add("visible");
  }

  private getPageElement(page: DropdownPage): HTMLElement | null {
    switch (page) {
      case "main":
        return this.mainPage;
      case "sponsorblock":
        return this.sbPage;
      case "codec":
        return this.codecPage;
    }
  }

  private async persistCodecConfig(config: CodecConfig) {
    await saveFeatureConfig(CODEC_STORAGE_KEY, "codec config", config);
    this.dispatchCodecSetting();
  }

  private async onSBConfigChange(newConfig: SponsorBlockConfig) {
    this.sbConfig = newConfig;
    this.refreshSBNavBadge();

    await saveFeatureConfig(
      SB_STORAGE_KEY,
      "SponsorBlock config",
      this.sbConfig,
    );
    this.dispatchSBSetting();
  }

  private refreshSBNavBadge() {
    const badge = this.menu?.querySelector<HTMLElement>(
      `#${ELEMENT_IDS.sbNavBadge}`,
    );
    if (badge) badge.textContent = sbBadgeText(this.sbConfig);
  }

  private attachListeners() {
    this.attachButtonListener();
    this.attachMenuListener();
    this.attachQualityListener();
    this.attachDocumentListeners();
    this.attachCodecSnapshotListener();
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
      const item = target.closest<HTMLElement>(
        `.${ELEMENT_CLASSES.toggleItem}`,
      );

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
    const select = this.menu?.querySelector<HTMLSelectElement>(
      `#${ELEMENT_IDS.qualitySelector}`,
    );
    if (!select) return;

    const handleChange = (e: Event) => {
      const qualityValue = (e.target as HTMLSelectElement).value;
      if (!QUALITY_VALUES.has(qualityValue)) return;

      const quality = qualityValue as Quality;

      const badge = this.menu?.querySelector<HTMLElement>(
        `#${ELEMENT_IDS.menuSectionBadge}`,
      );
      if (badge) badge.textContent = qualityLabel(quality);

      this.config.quality = quality;
      void this.saveConfig();
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

  private attachCodecSnapshotListener() {
    const handleCodecsUpdated = (e: Event) => {
      const detail = (e as CustomEvent<{ video?: unknown; audio?: unknown }>)
        .detail;
      if (
        !detail ||
        !Array.isArray(detail.video) ||
        !Array.isArray(detail.audio)
      ) {
        return;
      }
      this.codecSection.updateSnapshot({
        video: detail.video.filter((c): c is string => typeof c === "string"),
        audio: detail.audio.filter((c): c is string => typeof c === "string"),
      });
    };

    window.addEventListener(EVENTS.codecsUpdated, handleCodecsUpdated);
    this.cleanupFns.push(() =>
      window.removeEventListener(EVENTS.codecsUpdated, handleCodecsUpdated),
    );
  }

  private handleToggle(item: HTMLElement) {
    const raw = item.getAttribute(DATA_ATTRS.toggleId);
    if (!raw || !isToggleKey(raw)) return;

    const toggleSwitch = item.querySelector<HTMLElement>(
      `.${ELEMENT_CLASSES.toggleSwitch}`,
    );
    if (!toggleSwitch) return;

    const newValue = !toggleSwitch.classList.contains("active");

    this.updateToggleUI(toggleSwitch, newValue);
    item.setAttribute("aria-checked", String(newValue));

    this.config[raw] = newValue;

    void this.saveConfig();
    this.dispatchSettingChange(raw, newValue);
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

    if (this.currentPage !== "main") {
      this.navigateTo("main");
    }

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
    await saveFeatureConfig(STORAGE_KEY, "dropdown config", this.config);
  }

  private emit(name: string, detail?: unknown) {
    window.dispatchEvent(
      new CustomEvent(name, detail === undefined ? undefined : { detail }),
    );
  }

  private dispatchCodecSetting() {
    this.emit(EVENTS.codecSetting, { config: this.codecSection.getConfig() });
  }

  private dispatchSBSetting() {
    this.emit(EVENTS.sbSetting, {
      type: "sponsorblock",
      config: this.sbConfig,
    });
  }

  private dispatchSettingChange(setting: ToggleKey, value: boolean) {
    this.emit(EVENTS.setting, { setting, value });
  }

  private dispatchQualityChange(quality: Quality) {
    this.emit(EVENTS.quality, { quality });
  }

  inject() {
    if (this.container) injectDropdownButton(this.container);
    this.menuInjector.inject();
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
    this.mainPage = null;
    this.sbPage = null;
    this.codecPage = null;
    this.isOpen = false;
  }

  getConfig(): Readonly<Config> {
    return { ...this.config };
  }
}
