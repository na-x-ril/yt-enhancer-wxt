import {
  buildSVG,
  createElement,
  ELEMENT_IDS,
  ELEMENT_SELECTORS,
} from "@/lib/core/utils";
import type { Segment } from "./types";
import { CATEGORY_COLORS, CATEGORY_LABELS } from "./constants";

export function showSkipButton(segment: Segment, onSkip: () => void): void {
  hideSkipButton();

  const player = document.querySelector(ELEMENT_SELECTORS.player);
  if (!player) return;

  const color = CATEGORY_COLORS[segment.category] || "#888";
  const label = CATEGORY_LABELS[segment.category] || segment.category;

  const btn = createElement("button", { id: ELEMENT_IDS.skipButton });

  btn.appendChild(
    buildSVG("0 0 16 16", [
      {
        d: "M4 4l5.5 4L4 12V4zM11 4v8h1.5V4H11z",
        attrs: { fill: color },
      },
    ]),
  );

  btn.appendChild(
    createElement("span", { textContent: `(Enter) Skip ${label}` }),
  );

  btn.onclick = (e) => {
    e.stopPropagation();
    onSkip();
  };

  player.appendChild(btn);

  requestAnimationFrame(() => {
    btn.style.opacity = "1";
    btn.style.transform = "translateY(0)";
    btn.style.pointerEvents = "auto";
  });
}

export function hideSkipButton(): void {
  const existing = document.getElementById(ELEMENT_IDS.skipButton);
  if (existing) existing.remove();
}
