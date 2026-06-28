import { buildSVG, createElement } from "@/lib/core/utils";
import type { Segment } from "./types";
import { CATEGORY_COLORS, CATEGORY_LABELS } from "./constants";

const BUTTON_ID = "yt-enhancer-sb-skip-btn";

export function showSkipButton(segment: Segment, onSkip: () => void): void {
  hideSkipButton();

  const player = document.querySelector("#movie_player");
  if (!player) return;

  const color = CATEGORY_COLORS[segment.category] || "#888";
  const label = CATEGORY_LABELS[segment.category] || segment.category;

  const btn = createElement("button", { id: BUTTON_ID });

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
  const existing = document.getElementById(BUTTON_ID);
  if (existing) existing.remove();
}
