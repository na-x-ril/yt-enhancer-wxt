// lib/sites/youtube/components/icons.ts
//
// Shared inline SVG icons. Centralised so the same glyph (refresh, back,
// chevron) is not copy-pasted across the dropdown, its pages, and the
// video-info view. Each builder returns a fresh element.

import { buildSVG } from "@/lib/core/utils";

export function settingsIcon(): SVGSVGElement {
  return buildSVG(
    "0 0 24 24",
    [
      {
        d: "M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94L14.4 2.81c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z",
        attrs: { fill: "currentColor" },
      },
    ],
    { width: "24", height: "24", xmlns: "http://www.w3.org/2000/svg" },
  );
}

export function refreshIcon(): SVGSVGElement {
  return buildSVG("0 0 24 24", [
    {
      d: "M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z",
      attrs: { fill: "currentColor" },
    },
  ]);
}

export function chevronIcon(): SVGSVGElement {
  return buildSVG(
    "0 0 16 16",
    [
      {
        d: "M4 6L8 10L12 6",
        attrs: {
          stroke: "currentColor",
          "stroke-width": "2",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
        },
      },
    ],
    { width: "16", height: "16" },
  );
}

export function backIcon(): SVGSVGElement {
  return buildSVG("0 0 24 24", [
    {
      d: "M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z",
      attrs: { fill: "currentColor" },
    },
  ]);
}
