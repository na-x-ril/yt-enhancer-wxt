import { createElement, buildSVG } from "@/lib/core/utils";
import {
  MODE_LABELS,
  CATEGORY_LABELS,
  CATEGORY_COLORS,
} from "../../features/sponsorblock/constants";
import type {
  SponsorBlockConfig,
  SBMode,
  SponsorBlockCategory,
} from "../../features/sponsorblock/types";
import { ALL_CATEGORIES, isSBMode } from "../../features/sponsorblock/types";

const MODES: SBMode[] = ["auto", "show_skip", "disabled"];

export function createSponsorBlockPage(
  config: SponsorBlockConfig,
  onBack: () => void,
  onChange: (config: SponsorBlockConfig) => void,
): HTMLElement {
  const page = createElement("div", { className: "sb-page" });

  const header = createElement("div", { className: "sb-page-header" });

  const backBtn = createElement("button", {
    className: "sb-back-btn",
    ariaLabel: "Back to settings",
  });
  backBtn.appendChild(
    buildSVG("0 0 24 24", [
      {
        d: "M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z",
        attrs: { fill: "currentColor" },
      },
    ]),
  );
  backBtn.onclick = (e) => {
    e.stopPropagation();
    onBack();
  };

  const title = createElement("span", {
    className: "sb-page-title",
    textContent: "SponsorBlock",
  });

  header.append(backBtn, title);
  page.appendChild(header);

  for (const cat of ALL_CATEGORIES) {
    page.appendChild(createCategoryModeRow(config, cat, onChange));
  }

  return page;
}

function createCategoryModeRow(
  config: SponsorBlockConfig,
  category: SponsorBlockCategory,
  onChange: (config: SponsorBlockConfig) => void,
): HTMLElement {
  const row = createElement("div", {
    className: "sb-category-row",
    attrs: { "data-category": category },
  });

  const colorDot = createElement("span", {
    className: "sb-category-dot",
    attrs: { "data-color": CATEGORY_COLORS[category] },
  });
  colorDot.style.background = CATEGORY_COLORS[category];

  const labelSpan = createElement("span", {
    className: "sb-category-label",
    textContent: CATEGORY_LABELS[category],
  });

  const selectWrapper = createElement("div", {
    className: "sb-cat-select-wrapper",
  });

  const select = createElement("select", {
    className: "sb-cat-select",
    attrs: { "data-category": category },
  });

  for (const mode of MODES) {
    const option = createElement("option", {
      value: mode,
      textContent: MODE_LABELS[mode],
      selected: mode === config.categories[category],
    });
    select.appendChild(option);
  }

  select.onchange = (e) => {
    e.stopPropagation();
    const raw = (e.target as HTMLSelectElement).value;
    if (!isSBMode(raw)) return;
    const newConfig: SponsorBlockConfig = {
      categories: {
        ...config.categories,
        [category]: raw,
      },
    };
    onChange(newConfig);
  };

  const icon = createElement("span", { className: "sb-cat-select-icon" });
  icon.appendChild(
    buildSVG("0 0 16 16", [
      {
        d: "M4 6L8 10L12 6",
        attrs: {
          stroke: "currentColor",
          "stroke-width": "2",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
        },
      },
    ]),
  );

  selectWrapper.append(select, icon);
  row.append(colorDot, labelSpan, selectWrapper);
  return row;
}
