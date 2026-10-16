// lib/sites/youtube/components/toggle.ts
//
// Shared toggle-switch markup used by the dropdown main page and the codec
// page. Centralised so both render the exact same switch structure.

import { createElement, ELEMENT_CLASSES } from "@/lib/core/utils";

export function createToggleSwitch(isActive: boolean): HTMLElement {
  const toggleSwitch = createElement("div", {
    className: `${ELEMENT_CLASSES.toggleSwitch} ${isActive ? "active" : ""}`,
  });
  toggleSwitch.appendChild(
    createElement("div", { className: ELEMENT_CLASSES.toggleKnob }),
  );
  return toggleSwitch;
}
