// lib/sites/youtube/features/watch/video-info.ts
//
// Watch-page info UI: animated view count (odometer), date text, badges,
// DVR indicator, re-edge button, and the manual refresh button.
// Owns its Odometer instance; orchestration state is passed in explicitly.

import { Odometer } from "@/lib/core/odometer";
import {
  buildSVG,
  createElement,
  ELEMENT_IDS,
  ELEMENT_SELECTORS,
  waitForElement,
} from "@/lib/core/utils";
import type { State } from "../../types/player";
import { VideoState } from "../../types/player";
import { ViewCountParser } from "./view-count-parser";

export interface VideoInfoDeps {
  registerCleanup: (fn: () => void) => void;
  isDestroyed: () => boolean;
  /** Re-fetch page data (used by the manual refresh button). */
  refreshVideoData: () => Promise<void>;
}

export class VideoInfoView {
  private odometer: Odometer | null = null;
  private readonly parser = new ViewCountParser();

  constructor(private readonly deps: VideoInfoDeps) {}

  async displayVideoInfo(
    state: State,
    viewCount: string,
    dateText: string,
    isUpdate = false,
    exactCount?: number,
  ): Promise<void> {
    if (this.deps.isDestroyed()) return;
    try {
      if (!viewCount) return;

      const newViewCount = exactCount ?? this.parser.parse(viewCount).count;
      const existingInfo = document.getElementById(ELEMENT_IDS.videoInfo);
      const viewCountElement = document.getElementById(ELEMENT_IDS.viewCount);

      if (isUpdate && existingInfo && viewCountElement) {
        if (newViewCount !== state.currentViewCount) {
          this.animateViewCount(
            state,
            viewCountElement,
            state.currentViewCount,
            viewCount,
            exactCount,
          );
        }

        const dateTextElement = document.getElementById(ELEMENT_IDS.dateText);
        if (dateTextElement && dateText !== state.currentDateText) {
          dateTextElement.textContent = dateText;
          state.currentDateText = dateText;
        }
        return;
      }

      existingInfo?.remove();

      state.currentViewCount = newViewCount;
      state.currentDateText = dateText;

      const titleElement = await waitForElement(
        "#above-the-fold > div#title-row",
      );
      if (this.deps.isDestroyed() || !titleElement) return;

      const { suffix, divisor, decimalPlaces } =
        this.parser.extractSuffix(viewCount);

      const infoWrapper = createElement("div", { id: ELEMENT_IDS.videoInfo });

      const infoContainer = createElement("div", { id: "info-container" });

      const viewCountContainer = createElement("span", {
        id: "viewcount-container",
      });

      const viewCountSpan = createElement("span", {
        id: ELEMENT_IDS.viewCount,
        style: { fontVariantNumeric: "tabular-nums" },
      });

      const initialValue = newViewCount / divisor;
      const formattedInitial = initialValue
        .toFixed(decimalPlaces)
        .replace(/\.0+$/, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      viewCountSpan.textContent = formattedInitial;

      const suffixSpan = createElement("span", {
        id: ELEMENT_IDS.viewSuffix,
        textContent: suffix,
      });

      viewCountContainer.append(viewCountSpan, suffixSpan);

      this.odometer = new Odometer({
        el: viewCountSpan,
        value: newViewCount / divisor,
        duration: 2000,
        format:
          decimalPlaces > 0 ? `(,ddd).${"d".repeat(decimalPlaces)}` : "(,ddd)",
        theme: "minimal",
      });

      const dateTextSpan = createElement("span", {
        id: ELEMENT_IDS.dateText,
        textContent: dateText,
      });

      infoContainer.append(
        viewCountContainer,
        this.createSeparator(),
        dateTextSpan,
      );

      if (state.videoBadges.length > 0) {
        for (const label of state.videoBadges) {
          const labelSpan = createElement("span");
          labelSpan.textContent = label;
          infoContainer.append(this.createSeparator(), labelSpan);
        }
      }

      infoWrapper.append(infoContainer, this.createRefreshButton());
      titleElement.insertAdjacentElement("afterend", infoWrapper);
      this.deps.registerCleanup(() => this.odometer?.destroy());
      this.deps.registerCleanup(() => (this.odometer = null));
      this.deps.registerCleanup(() =>
        document.getElementById(ELEMENT_IDS.videoInfo)?.remove(),
      );
    } catch (error) {
      console.warn("[WatchFeature] Display video info error:", error);
    }
  }

  displayDVRIndicator(state: State, isDVREnabled: boolean): void {
    if (this.deps.isDestroyed()) return;
    try {
      if (state.state !== VideoState.LIVE || isDVREnabled) return;

      const timeWrapper = document.querySelector<HTMLElement>(
        ELEMENT_SELECTORS.timeWrapper,
      );
      if (!timeWrapper) return;

      const indicator = createElement("div", { id: ELEMENT_IDS.dvrIndicator });

      const separator = createElement("span", {
        textContent: "•",
        style: { marginRight: "8px", fontSize: "1.6rem" },
      });

      const text = createElement("span", { textContent: "DVR Disabled" });

      indicator.append(separator, text);
      timeWrapper.appendChild(indicator);
      this.deps.registerCleanup(() =>
        document.getElementById(ELEMENT_IDS.dvrIndicator)?.remove(),
      );
    } catch (error) {
      console.warn("[WatchFeature] Display DVR indicator error:", error);
    }
  }

  displayReEdgeButton(state: State, onReEdge: () => void): void {
    if (this.deps.isDestroyed()) return;
    try {
      if (state.state !== VideoState.LIVE) return;

      const timeWrapper = document.querySelector<HTMLElement>(
        ELEMENT_SELECTORS.timeWrapper,
      );
      if (!timeWrapper) return;

      const button = createElement("button", {
        id: ELEMENT_IDS.reEdgeButton,
        title: "Re-Edge",
        ariaLabel: "Re-Edge",
      });
      button.appendChild(
        buildSVG("0 0 24 24", [
          {
            d: "M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z",
            attrs: { fill: "currentColor" },
          },
        ]),
      );

      button.onclick = () => onReEdge();
      this.patchTimeWrapper(timeWrapper);
      timeWrapper.appendChild(button);
      this.deps.registerCleanup(() =>
        document.getElementById(ELEMENT_IDS.reEdgeButton)?.remove(),
      );
    } catch (error) {
      console.warn("[WatchFeature] Display re-edge button error:", error);
    }
  }

  private patchTimeWrapper(timeWrapper: HTMLElement): void {
    timeWrapper.classList.add("has-patched-pr");

    this.deps.registerCleanup(() =>
      timeWrapper.classList.remove("has-patched-pr"),
    );
  }

  private createSeparator(): HTMLElement {
    const separator = createElement("span", { textContent: "•" });
    return separator;
  }

  private animateViewCount(
    state: State,
    element: HTMLElement,
    fromValue: number,
    newViewCountString: string,
    exactCount?: number,
  ): void {
    if (this.deps.isDestroyed()) return;
    try {
      const toValue = exactCount ?? this.parser.parse(newViewCountString).count;

      if (toValue === fromValue || fromValue === 0) {
        this.setStaticViewCount(state, element, toValue, newViewCountString);
        return;
      }

      const { suffix, divisor } = this.parser.extractSuffix(newViewCountString);
      const suffixElement = document.getElementById(ELEMENT_IDS.viewSuffix);
      if (suffixElement) suffixElement.textContent = suffix;

      if (!this.odometer) {
        this.setStaticViewCount(state, element, toValue, newViewCountString);
        return;
      }

      this.odometer.update(toValue / divisor);

      element.addEventListener(
        "odometerdone",
        () => {
          if (!this.deps.isDestroyed()) state.currentViewCount = toValue;
        },
        { once: true },
      );
    } catch (error) {
      console.warn("[WatchFeature] Animate view count error:", error);
      this.setStaticViewCount(
        state,
        element,
        exactCount ?? this.parser.parse(newViewCountString).count,
        newViewCountString,
      );
    }
  }

  private setStaticViewCount(
    state: State,
    element: HTMLElement,
    toValue: number,
    newViewCountString: string,
  ): void {
    if (this.deps.isDestroyed()) return;
    const { suffix, divisor, decimalPlaces } =
      this.parser.extractSuffix(newViewCountString);
    const formatted = (toValue / divisor)
      .toFixed(decimalPlaces)
      .replace(/\.0+$/, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    element.textContent = formatted;

    const suffixElement = document.getElementById(ELEMENT_IDS.viewSuffix);
    if (suffixElement) suffixElement.textContent = suffix;

    state.currentViewCount = toValue;
  }

  private createRefreshButton(): HTMLButtonElement {
    const button = createElement("button", { id: ELEMENT_IDS.refreshBtn });
    button.appendChild(
      buildSVG("0 0 24 24", [
        {
          d: "M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z",
          attrs: { fill: "currentColor" },
        },
      ]),
    );

    button.onclick = async () => {
      if (this.deps.isDestroyed()) return;
      try {
        const svg = button.querySelector<SVGElement>("svg");
        button.style.pointerEvents = "none";
        button.style.opacity = "0.5";
        if (svg) {
          svg.style.transition = "transform 0.5s ease";
          svg.style.transform = "rotate(360deg)";
        }

        await this.deps.refreshVideoData();

        setTimeout(() => {
          if (this.deps.isDestroyed()) return;
          if (!button.isConnected) return;
          button.style.pointerEvents = "auto";
          button.style.opacity = "1";
          if (svg) svg.style.transform = "rotate(0deg)";
        }, 500);
      } catch (error) {
        console.warn("[WatchFeature] Refresh button error:", error);
        button.style.pointerEvents = "auto";
        button.style.opacity = "1";
      }
    };

    return button;
  }
}
