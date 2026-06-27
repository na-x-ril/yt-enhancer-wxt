import { buildSVG, createElement } from '@/lib/core/utils';
import type { Segment } from './types';
import { CATEGORY_COLORS, CATEGORY_LABELS } from './constants';

const BUTTON_ID = 'yt-enhancer-sb-skip-btn';

export function showSkipButton(
  segment: Segment,
  onSkip: () => void,
): () => void {
  hideSkipButton();

  const player = document.querySelector('#movie_player');
  if (!player) return () => {};

  const color = CATEGORY_COLORS[segment.category] || '#888';
  const label = CATEGORY_LABELS[segment.category] || segment.category;

  const btn = createElement('button', { id: BUTTON_ID });

  btn.appendChild(
    buildSVG('0 0 24 24', [
      {
        d: 'M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z',
        attrs: { fill: color },
      },
    ]),
  );

  btn.appendChild(createElement('span', { textContent: `Skip ${label}` }));

  btn.onclick = (e) => {
    e.stopPropagation();
    onSkip();
    hideSkipButton();
  };

  player.appendChild(btn);

  requestAnimationFrame(() => {
    btn.style.opacity = '1';
    btn.style.transform = 'translateY(0)';
    btn.style.pointerEvents = 'auto';
  });

  return () => hideSkipButton();
}

export function hideSkipButton(): void {
  const existing = document.getElementById(BUTTON_ID);
  if (existing) {
    existing.style.opacity = '0';
    existing.style.transform = 'translateY(8px)';
    existing.style.pointerEvents = 'none';
    setTimeout(() => existing.remove(), 200);
  }
}
