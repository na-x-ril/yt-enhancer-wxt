// lib/sites/youtube/components/dropdown/codec-section.ts
//
// Owns the codec-blocking config for one dropdown session: validation
// against the current video's codecs, the dirty/apply state, the warning
// and apply-button UI, and the nav badge. Persisting and broadcasting are
// delegated to the host via deps so this stays UI-focused.

import { ELEMENT_IDS } from "@/lib/core/utils";
import { getRemainingCodecs, probeCodecSupport } from "../../features/codec";
import type {
  CodecConfig,
  CodecToggleKey,
} from "../../features/codec/types";
import { codecBadgeText } from "./badges";

export interface CodecSectionDeps {
  getMenu: () => HTMLElement | null;
  /** Persist + broadcast the config (host owns storage/events). */
  onChange: (config: CodecConfig) => void;
  /** Broadcast a reload request. */
  onApply: () => void;
}

export class CodecSection {
  private config: CodecConfig;
  private snapshot: { video: string[]; audio: string[] } | null = null;
  private dirty = false;

  constructor(initial: CodecConfig, private readonly deps: CodecSectionDeps) {
    this.config = initial;
  }

  getConfig(): CodecConfig {
    return this.config;
  }

  toggle(id: CodecToggleKey, value: boolean): boolean {
    const next = { ...this.config, [id]: value };
    if (!this.canApply(next)) return false;

    this.config = next;
    this.refreshBadge();
    this.dirty = true;
    this.refreshApplyBtn();
    this.deps.onChange(this.config);
    return true;
  }

  apply(): void {
    if (!this.dirty) return;
    this.dirty = false;
    this.refreshApplyBtn();
    this.hideWarning();
    this.deps.onApply();
  }

  updateSnapshot(snapshot: { video: string[]; audio: string[] }): void {
    this.snapshot = snapshot;
    this.hideWarning();
  }

  private canApply(next: CodecConfig): boolean {
    const snapshot = this.snapshot;
    if (!snapshot || snapshot.video.length === 0) return true;

    const remaining = getRemainingCodecs(snapshot.video, next);
    if (remaining.length > 0 && remaining.some(probeCodecSupport)) return true;

    this.showWarning(remaining.length === 0);
    return false;
  }

  private showWarning(allBlocked: boolean): void {
    const warning = this.warningEl();
    if (!warning) return;
    warning.textContent = allBlocked
      ? "Semua codec video ini akan diblokir — blokir dibatalkan."
      : "Codec tersisa untuk video ini tidak didukung browser — blokir dibatalkan.";
    warning.hidden = false;
  }

  private hideWarning(): void {
    const warning = this.warningEl();
    if (warning) warning.hidden = true;
  }

  private refreshApplyBtn(): void {
    const button = this.deps
      .getMenu()
      ?.querySelector<HTMLButtonElement>(`#${ELEMENT_IDS.codecApplyBtn}`);
    if (button) button.disabled = !this.dirty;
  }

  private refreshBadge(): void {
    const badge = this.deps
      .getMenu()
      ?.querySelector<HTMLElement>(`#${ELEMENT_IDS.codecNavBadge}`);
    if (badge) badge.textContent = codecBadgeText(this.config);
  }

  private warningEl(): HTMLElement | null {
    return (
      this.deps
        .getMenu()
        ?.querySelector<HTMLElement>(`#${ELEMENT_IDS.codecPageWarning}`) ?? null
    );
  }
}
