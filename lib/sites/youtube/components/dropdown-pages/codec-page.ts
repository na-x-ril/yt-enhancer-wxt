import { createElement, buildSVG } from "@/lib/core/utils";
import type { CodecConfig } from "../../features/codec/types";

type CodecToggleKey = keyof CodecConfig;

const TOGGLE_ITEMS: Array<{ id: CodecToggleKey; label: string; hint: string }> =
  [
    { id: "blockVp9", label: "Blokir VP9", hint: "video/webm; codecs=\"vp9\"" },
    { id: "blockAv1", label: "Blokir AV1", hint: "video/mp4; codecs=\"av01...\"" },
    { id: "blockVp8", label: "Blokir VP8", hint: "video/webm; codecs=\"vp8\"" },
    { id: "blockAvc", label: "Blokir AVC", hint: "video/mp4; codecs=\"avc1...\"" },
  ];

export function createCodecPage(
  getConfig: () => CodecConfig,
  onBack: () => void,
  onToggle: (id: CodecToggleKey, value: boolean) => boolean,
  onApply: () => void,
): HTMLElement {
  const page = createElement("div", { className: "codec-page" });

  const header = createElement("div", { className: "codec-page-header" });

  const backBtn = createElement("button", {
    className: "codec-back-btn",
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
    className: "codec-page-title",
    textContent: "Codec Blocker",
  });

  header.append(backBtn, title);
  page.appendChild(header);

  const description = createElement("div", {
    className: "codec-page-description",
    textContent:
      "Blokir codec tertentu untuk memaksa YouTube mengirim format lain yang didukung komputer Anda.",
  });
  page.appendChild(description);

  const warning = createElement("div", {
    id: "codec-page-warning",
    className: "codec-page-warning",
    hidden: true,
  });
  page.appendChild(warning);

  for (const item of TOGGLE_ITEMS) {
    page.appendChild(createToggleRow(getConfig, item, onToggle));
  }

  const applyBtn = createElement("button", {
    id: "codec-apply-btn",
    className: "codec-apply-btn",
    textContent: "Terapkan & Muat Ulang",
    disabled: true,
  });
  applyBtn.onclick = (e) => {
    e.stopPropagation();
    onApply();
  };
  page.appendChild(applyBtn);

  return page;
}

function createToggleRow(
  getConfig: () => CodecConfig,
  item: { id: CodecToggleKey; label: string; hint: string },
  onToggle: (id: CodecToggleKey, value: boolean) => boolean,
): HTMLElement {
  const row = createElement("div", {
    className: "toggle-item",
    attrs: { "data-codec-id": item.id },
    role: "menuitemcheckbox",
    ariaChecked: String(getConfig()[item.id]),
  });

  const labelWrapper = createElement("div", {
    className: "codec-toggle-label",
  });

  const labelSpan = createElement("span", {
    className: "toggle-item-label",
    textContent: item.label,
  });

  const hintSpan = createElement("span", {
    className: "codec-toggle-hint",
    textContent: item.hint,
  });

  labelWrapper.append(labelSpan, hintSpan);

  const toggleSwitch = createElement("div", {
    className: `toggle-switch ${getConfig()[item.id] ? "active" : ""}`,
  });
  toggleSwitch.appendChild(createElement("div", { className: "toggle-knob" }));

  row.append(labelWrapper, toggleSwitch);

  row.onclick = (e) => {
    e.stopPropagation();

    const isActive = toggleSwitch.classList.contains("active");
    const newValue = !isActive;

    if (newValue) {
      toggleSwitch.classList.add("active");
    } else {
      toggleSwitch.classList.remove("active");
    }
    row.setAttribute("aria-checked", String(newValue));

    const accepted = onToggle(item.id, newValue);
    if (!accepted) {
      if (newValue) {
        toggleSwitch.classList.remove("active");
      } else {
        toggleSwitch.classList.add("active");
      }
      row.setAttribute("aria-checked", String(!newValue));
    }
  };

  return row;
}