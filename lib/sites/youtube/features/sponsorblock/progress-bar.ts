import { CATEGORY_COLORS } from './constants';
import type { Segment } from './types';

const CHAPTERS_SEL = '.ytp-chapters-container';
const PROGRESS_LIST_SEL = '.ytp-progress-list';
const MARKER_CLASS = 'yt-enhancer-sb-marker';

interface ChapterRect {
  left: number;
  width: number;
  list: HTMLElement;
}

export function renderSegments(
  segments: Segment[],
  duration: number,
): void {
  clearMarkers();

  const container = document.querySelector(CHAPTERS_SEL) as HTMLElement | null;
  if (!container) return;

  const containerRect = container.getBoundingClientRect();
  const totalWidth = containerRect.width;
  if (totalWidth <= 0) return;

  const chapters: ChapterRect[] = [];
  for (const child of container.children) {
    const el = child as HTMLElement;
    const list = el.querySelector(PROGRESS_LIST_SEL) as HTMLElement | null;
    if (!list) continue;

    const rect = el.getBoundingClientRect();
    chapters.push({
      left: rect.left - containerRect.left,
      width: rect.width,
      list,
    });
  }

  if (chapters.length === 0) return;

  for (const { left, width, list } of chapters) {
    list.style.position = 'relative';

    const chStartPct = (left / totalWidth) * 100;
    const chWidthPct = (width / totalWidth) * 100;
    const chEndPct = chStartPct + chWidthPct;

    for (const seg of segments) {
      const segStartPct = (seg.segment[0] / duration) * 100;
      const segEndPct = (seg.segment[1] / duration) * 100;

      if (segEndPct <= chStartPct || segStartPct >= chEndPct) continue;

      const overlapStart = Math.max(segStartPct, chStartPct);
      const overlapEnd = Math.min(segEndPct, chEndPct);
      const relStart = ((overlapStart - chStartPct) / chWidthPct) * 100;
      const relEnd = ((overlapEnd - chStartPct) / chWidthPct) * 100;
      const markerWidth = relEnd - relStart;
      if (markerWidth <= 0) continue;

      const marker = document.createElement('div');
      marker.className = MARKER_CLASS;
      marker.style.left = `${relStart}%`;
      marker.style.width = `${markerWidth}%`;
      marker.style.background = CATEGORY_COLORS[seg.category] || '#888';
      list.appendChild(marker);
    }
  }
}

export function clearMarkers(): void {
  document.querySelectorAll(`.${MARKER_CLASS}`).forEach(el => el.remove());
}
