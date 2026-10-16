// lib/sites/youtube/components/dropdown/main-page.ts
//
// Renders the dropdown's main settings page. Toggle rows are intentionally
// handler-less: index.ts handles their clicks through event delegation, and
// it also owns the quality <select> change listener.

import {
  createElement,
  DATA_ATTRS,
  ELEMENT_CLASSES,
  ELEMENT_IDS,
} from "@/lib/core/utils";
import { chevronIcon, refreshIcon } from "../icons";
import { createToggleSwitch } from "../toggle";
import type { CodecConfig } from "../../features/codec/types";
import type { SponsorBlockConfig } from "../../features/sponsorblock/types";
import type { BooleanKeys, Config, Quality } from "../../types/player";
import { codecBadgeText, sbBadgeText } from "./badges";

export type DropdownPage = "main" | "sponsorblock" | "codec";
export type ToggleKey = BooleanKeys<Config>;

const TOGGLE_ITEMS: Array<{ id: ToggleKey; label: string }> = [
  { id: "autoLoop", label: "Auto Loop" },
  { id: "qualityService", label: "Quality Service" },
  { id: "autoCaption", label: "Auto Caption" },
  { id: "sbEnabled", label: "SponsorBlock" },
];

export const QUALITY_OPTIONS: Array<{
  value: Quality;
  label: string;
  description: string;
}> = [
  { value: "highres", label: "2160p", description: "4K" },
  { value: "hd1440", label: "1440p", description: "2K" },
  { value: "hd1080", label: "1080p", description: "Full HD" },
  { value: "hd720", label: "720p", description: "HD" },
  { value: "large", label: "480p", description: "SD" },
  { value: "medium", label: "360p", description: "" },
  { value: "small", label: "240p", description: "" },
  { value: "tiny", label: "144p", description: "" },
];

export const QUALITY_VALUES = new Set<string>(
  QUALITY_OPTIONS.map((option) => option.value),
);

const TOGGLE_IDS = new Set<string>(TOGGLE_ITEMS.map((item) => item.id));

export function isToggleKey(value: string): value is ToggleKey {
  return TOGGLE_IDS.has(value);
}

export function qualityLabel(value: Quality): string {
  return QUALITY_OPTIONS.find((option) => option.value === value)?.label ?? "1080p";
}

export interface MainPageDeps {
  config: Config;
  sbConfig: SponsorBlockConfig;
  codecConfig: CodecConfig;
  onNavigate: (page: DropdownPage) => void;
  onRefresh: () => void;
}

export function createMainPage(deps: MainPageDeps): HTMLElement {
  const page = createElement("div", { className: "slide-page visible" });
  page.appendChild(createHeader(deps.onRefresh));

  for (const { id, label } of TOGGLE_ITEMS) {
    page.appendChild(createToggleItem(id, label, deps.config[id]));
  }

  page.appendChild(createQualitySelector(deps.config.quality));
  page.appendChild(
    createNavItem({
      label: "SponsorBlock",
      badgeId: ELEMENT_IDS.sbNavBadge,
      badgeText: sbBadgeText(deps.sbConfig),
      buttonLabel: "Configure SponsorBlock",
      onConfigure: () => deps.onNavigate("sponsorblock"),
    }),
  );
  page.appendChild(
    createNavItem({
      label: "Codec Blocker",
      badgeId: ELEMENT_IDS.codecNavBadge,
      badgeText: codecBadgeText(deps.codecConfig),
      buttonLabel: "Configure codec blocking",
      onConfigure: () => deps.onNavigate("codec"),
    }),
  );

  return page;
}

function createHeader(onRefresh: () => void): HTMLElement {
  const header = createElement("div", { id: ELEMENT_IDS.menuHeader });

  const title = createElement("span", {
    className: "header-title",
    textContent: "YT Enhancer Settings",
  });

  const refreshButton = createElement("button", {
    className: "header-refresh",
    ariaLabel: "Refresh player features",
  });
  refreshButton.appendChild(refreshIcon());

  refreshButton.onclick = (e) => {
    e.stopPropagation();
    refreshButton.disabled = true;

    const svg = refreshButton.querySelector<SVGElement>("svg");
    if (svg) {
      svg.style.transition = "transform 0.5s ease";
      svg.style.transform = "rotate(360deg)";
    }

    onRefresh();

    setTimeout(() => {
      // The menu may have been destroyed while waiting.
      if (!refreshButton.isConnected) return;
      refreshButton.disabled = false;
      if (svg) svg.style.transform = "rotate(0deg)";
    }, 500);
  };

  header.append(title, refreshButton);
  return header;
}

function createToggleItem(
  id: ToggleKey,
  label: string,
  isActive: boolean,
): HTMLElement {
  const item = createElement("div", {
    className: ELEMENT_CLASSES.toggleItem,
    attrs: { [DATA_ATTRS.toggleId]: id },
    role: "menuitemcheckbox",
    ariaChecked: String(isActive),
  });

  const labelSpan = createElement("span", {
    className: "toggle-item-label",
    textContent: label,
  });

  item.append(labelSpan, createToggleSwitch(isActive));
  return item;
}

function createQualitySelector(quality: Quality): HTMLElement {
  const container = createElement("div", { className: "menu-section" });

  const labelWrapper = createElement("div", { className: "menu-section-header" });

  const label = createElement("span", {
    className: "menu-section-label",
    textContent: "Preferred Quality",
  });

  const badge = createElement("span", {
    id: ELEMENT_IDS.menuSectionBadge,
    className: "menu-section-badge",
    textContent: qualityLabel(quality),
  });

  labelWrapper.append(label, badge);

  const selectWrapper = createElement("div", {
    className: "quality-select-wrapper",
  });

  const select = createElement("select", {
    id: ELEMENT_IDS.qualitySelector,
    className: "quality-selector",
    ariaLabel: "Select preferred video quality",
  });

  for (const { value, label: optionLabel, description } of QUALITY_OPTIONS) {
    select.appendChild(
      createElement("option", {
        value,
        textContent: description ? `${optionLabel} (${description})` : optionLabel,
        selected: value === quality,
      }),
    );
  }

  const icon = createElement("span", { className: "quality-select-icon" });
  icon.appendChild(chevronIcon());

  selectWrapper.append(select, icon);
  container.append(labelWrapper, selectWrapper);
  return container;
}

function createNavItem(options: {
  label: string;
  badgeId: string;
  badgeText: string;
  buttonLabel: string;
  onConfigure: () => void;
}): HTMLElement {
  const container = createElement("div", { className: "menu-section" });

  const header = createElement("div", { className: "menu-section-header" });

  const label = createElement("span", {
    className: "menu-section-label",
    textContent: options.label,
  });

  const badge = createElement("span", {
    id: options.badgeId,
    className: "menu-section-badge",
    textContent: options.badgeText,
  });

  header.append(label, badge);

  const selectWrapper = createElement("div", {
    className: "quality-select-wrapper",
  });

  const button = createElement("button", {
    className: "quality-selector",
    ariaLabel: options.buttonLabel,
  });
  button.textContent = "Configure →";

  button.onclick = (e) => {
    e.stopPropagation();
    options.onConfigure();
  };

  selectWrapper.appendChild(button);
  container.append(header, selectWrapper);
  return container;
}
