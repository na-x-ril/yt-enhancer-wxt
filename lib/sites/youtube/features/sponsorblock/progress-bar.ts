import { createElement } from '@/lib/core/utils';
import { CATEGORY_COLORS } from './constants';
import type { Segment } from './types';

const MARKER_CLASS = 'yt-enhancer-sb-marker';

export function renderSegments(
  segments: Segment[],
  duration: number,
): () => void {
  const container = getOrCreateContainer();
  if (!container) return () => {};

  container.textContent = '';

  for (const seg of segments) {
    const startPct = (seg.segment[0] / duration) * 100;
    const widthPct = ((seg.segment[1] - seg.segment[0]) / duration) * 100;
    if (widthPct <= 0) continue;

    const marker = createElement('div', { className: MARKER_CLASS });
    marker.style.left = `${startPct}%`;
    marker.style.width = `${widthPct}%`;
    marker.style.background = CATEGORY_COLORS[seg.category] || '#888';
    container.appendChild(marker);
  }

  return () => {
    container.textContent = '';
  };
}

function getOrCreateContainer(): HTMLElement | null {
  let container = document.getElementById('yt-enhancer-sb-markers');
  if (container) return container;

  const timedMarkers = document.querySelector('.ytp-timed-markers-container');
  if (!timedMarkers) return null;

  container = createElement('div', { id: 'yt-enhancer-sb-markers' });
  timedMarkers.insertAdjacentElement('beforebegin', container);
  return container;
}

export function clearMarkers(): void {
  const container = document.getElementById('yt-enhancer-sb-markers');
  if (container) container.textContent = '';
}
