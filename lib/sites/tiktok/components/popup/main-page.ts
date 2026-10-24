// lib/sites/tiktok/components/popup/main-page.ts
//
// Renders the popup body. Always handler-less, exactly like the YouTube
// dropdown main page: index.ts owns the click delegation.

import {
  createElement,
  DATA_ATTRS,
  ELEMENT_CLASSES,
} from "@/lib/core/utils";
import { createToggleSwitch } from "@/lib/core/components/toggle";
import { TIKTOK_CLASSES } from "../../selectors";
import type { TiktokConfig } from "../../types";

export const UNMUTE_TOGGLE_ID = "unmute";

export function createMainPage(config: TiktokConfig): HTMLElement {
  const page = createElement("div", { className: "tt-enhancer-page" });
  page.appendChild(createHeader());
  page.appendChild(
    createToggleItem({
      id: UNMUTE_TOGGLE_ID,
      label: "Auto unmute",
      description: "Feed & pencarian",
      isActive: config.unmute,
    }),
  );
  return page;
}

function createHeader(): HTMLElement {
  const header = createElement("div", {
    className: "tt-enhancer-popup-header",
  });
  header.appendChild(
    createElement("span", {
      className: "tt-enhancer-popup-title",
      textContent: "TikTok Enhancer",
    }),
  );
  return header;
}

function createToggleItem(item: {
  id: string;
  label: string;
  description: string;
  isActive: boolean;
}): HTMLElement {
  const row = createElement("button", {
    type: "button",
    className: `${ELEMENT_CLASSES.toggleItem} ${TIKTOK_CLASSES.toggleRow}`,
    attrs: {
      [DATA_ATTRS.toggleId]: item.id,
      role: "switch",
      "aria-checked": String(item.isActive),
    },
  });

  const text = createElement("span", { className: TIKTOK_CLASSES.toggleText });
  text.append(
    createElement("span", {
      className: "tt-enhancer-toggle-name",
      textContent: item.label,
    }),
    createElement("span", {
      className: "tt-enhancer-toggle-desc",
      textContent: item.description,
    }),
  );

  row.append(text, createToggleSwitch(item.isActive));
  return row;
}
