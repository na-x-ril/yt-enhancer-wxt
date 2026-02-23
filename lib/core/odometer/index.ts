// lib/sites/youtube/features/watch/odometer.ts

function buildDigitElement(): HTMLElement {
  const value = document.createElement("span");
  value.className = "odometer-value";

  const ribbonInner = document.createElement("span");
  ribbonInner.className = "odometer-ribbon-inner";
  ribbonInner.appendChild(value);

  const ribbon = document.createElement("span");
  ribbon.className = "odometer-ribbon";
  ribbon.appendChild(ribbonInner);

  const digitInner = document.createElement("span");
  digitInner.className = "odometer-digit-inner";
  digitInner.appendChild(ribbon);

  const spacer = document.createElement("span");
  spacer.className = "odometer-digit-spacer";
  spacer.textContent = "8";

  const digit = document.createElement("span");
  digit.className = "odometer-digit";
  digit.append(spacer, digitInner);

  return digit;
}

function buildFormattingMark(): HTMLElement {
  const mark = document.createElement("span");
  mark.className = "odometer-formatting-mark";
  return mark;
}

const TRANSITION_END_EVENTS = [
  "transitionend",
  "webkitTransitionEnd",
  "oTransitionEnd",
  "otransitionend",
  "MSTransitionEnd",
];

interface OdometerOptions {
  el: HTMLElement;
  value?: number;
  theme?: string;
  duration?: number;
  format?: string;
}

interface ParsedFormat {
  repeating: string;
  radix: string;
  precision: number;
}

function addClass(el: HTMLElement, name: string): void {
  const names = name.split(" ").filter(Boolean);
  for (const n of names) {
    if (!el.classList.contains(n)) el.classList.add(n);
  }
}

function removeClass(el: HTMLElement, name: string): void {
  const names = name.split(" ").filter(Boolean);
  for (const n of names) {
    el.classList.remove(n);
  }
}

function roundTo(val: number, precision = 0): number {
  if (!precision) return Math.round(val);
  const factor = Math.pow(10, precision);
  return Math.floor(val * factor + 0.5) / factor;
}

function truncate(val: number): number {
  return val < 0 ? Math.ceil(val) : Math.floor(val);
}

function fractionalPart(val: number): number {
  return val - roundTo(val);
}

function parseFormat(format: string): ParsedFormat {
  const FORMAT_PARSER = /^\(?([^)]*)\)?(?:(.)(d+))?$/;
  const parsed = FORMAT_PARSER.exec(format);
  if (!parsed) throw new Error("Odometer: Unparsable digit format");

  const [, repeating, radix, fractional] = parsed;
  const precision = fractional?.length ?? 0;
  return { repeating: repeating ?? "", radix: radix ?? ".", precision };
}

function supportsTransitions(): boolean {
  const style = document.createElement("div").style;
  return (
    style.transition !== undefined ||
    (style as CSSStyleDeclaration & Record<string, string>).transition !==
      undefined
  );
}

const TRANSITION_SUPPORT = supportsTransitions();

const DEFAULT_FORMAT = "(,ddd).dd";
const DEFAULT_DURATION = 2000;
const FRAMERATE = 30;
const MS_PER_FRAME = 1000 / FRAMERATE;
const FRAMES_PER_VALUE = 2;
const DIGIT_SPEEDBOOST = 0.5;

const FONT_SIZE_PX = 16 * 1.6;
const LINE_HEIGHT_PX = FONT_SIZE_PX * 2.4;
const DURATION_PER_PX = 1.2;
const MIN_DURATION_MS = 800;

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function computeDurationMs(
  oldValue: number,
  newValue: number,
  maxDurationMs: number,
): number {
  const steps = Math.abs(newValue - oldValue);
  const distancePx = steps * LINE_HEIGHT_PX;
  const computed = distancePx * DURATION_PER_PX;
  return Math.min(Math.max(computed, MIN_DURATION_MS), maxDurationMs);
}

export class Odometer {
  private el: HTMLElement;
  private inside!: HTMLElement;
  private options: Required<OdometerOptions>;
  private value: number;
  private format!: ParsedFormat;
  private digits: HTMLElement[] = [];
  private ribbons: Record<number, HTMLElement> = {};
  private maxValues: number;
  private transitionEndBound = false;
  private animationId: number | null = null;

  constructor(options: OdometerOptions) {
    this.options = {
      theme: "minimal",
      duration: DEFAULT_DURATION,
      format: DEFAULT_FORMAT,
      value: 0,
      ...options,
    };

    this.el = options.el;
    this.maxValues =
      (this.options.duration / MS_PER_FRAME / FRAMES_PER_VALUE) | 0;

    this.format = parseFormat(this.options.format);
    this.value = this.cleanValue(String(this.options.value ?? ""));
    this.renderInside();
    this.render();
  }

  private renderInside(): void {
    this.inside = document.createElement("div");
    this.inside.className = "odometer-inside";
    while (this.el.firstChild) this.el.removeChild(this.el.firstChild);
    this.el.appendChild(this.inside);
  }

  private cleanValue(val: string | number): number {
    if (typeof val === "number") {
      return roundTo(val, this.format.precision);
    }
    const stripped = val.replace(/[^0-9.-]/g, "");
    return roundTo(parseFloat(stripped) || 0, this.format.precision);
  }

  private bindTransitionEnd(): void {
    if (this.transitionEndBound) return;
    this.transitionEndBound = true;

    let renderEnqueued = false;
    for (const event of TRANSITION_END_EVENTS) {
      this.el.addEventListener(
        event,
        () => {
          if (renderEnqueued) return;
          renderEnqueued = true;
          setTimeout(() => {
            this.render();
            renderEnqueued = false;
            this.el.dispatchEvent(new Event("odometerdone"));
          }, 0);
        },
        false,
      );
    }
  }

  private resetFormat(): void {
    this.format = parseFormat(this.options.format);
  }

  render(value?: number): void {
    const renderValue = value ?? this.value;

    this.resetFormat();
    while (this.inside.firstChild)
      this.inside.removeChild(this.inside.firstChild);

    const theme = this.options.theme;
    const baseClasses = this.el.className
      .split(" ")
      .filter((cls) => cls && !/^odometer(-|$)/.test(cls));

    baseClasses.push("odometer");
    if (!TRANSITION_SUPPORT) baseClasses.push("odometer-no-transitions");
    baseClasses.push(`odometer-theme-${theme}`);

    this.el.className = baseClasses.join(" ");
    this.ribbons = {};
    this.digits = [];

    const wholePart =
      !this.format.precision || !fractionalPart(renderValue) || false;

    for (const digit of String(renderValue).split("").reverse()) {
      this.addDigit(digit, digit === "." ? true : wholePart);
    }
  }

  update(newValue: number | string): void {
    const cleaned = this.cleanValue(String(newValue));
    const diff = cleaned - this.value;
    if (!diff) return;

    removeClass(
      this.el,
      "odometer-animating-up odometer-animating-down odometer-animating",
    );

    if (diff > 0) {
      addClass(this.el, "odometer-animating-up");
    } else {
      addClass(this.el, "odometer-animating-down");
    }

    const durationMs = computeDurationMs(
      this.value,
      cleaned,
      this.options.duration,
    );
    this.el.style.setProperty("--odometer-duration", `${durationMs}ms`);
    this.animate(cleaned, durationMs);

    setTimeout(() => {
      void this.el.offsetHeight;
      addClass(this.el, "odometer-animating");
    }, 0);

    this.value = cleaned;
  }

  destroy(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  private animate(newValue: number, durationMs: number): void {
    if (!TRANSITION_SUPPORT) {
      this.animateCount(newValue, durationMs);
    } else {
      this.animateSlide(newValue, durationMs);
    }
  }

  private animateCount(newValue: number, durationMs: number): void {
    if (this.animationId !== null) cancelAnimationFrame(this.animationId);

    const diff = newValue - this.value;
    if (!diff) return;

    const start = performance.now();
    const startValue = this.value;

    const tick = (now: number) => {
      const elapsed = now - start;
      if (elapsed >= durationMs) {
        this.value = newValue;
        this.render();
        this.el.dispatchEvent(new Event("odometerdone"));
        return;
      }

      const fraction = easeInOutCubic(elapsed / durationMs);
      const cur = startValue + diff * fraction;
      this.render(Math.round(cur));
      this.animationId = requestAnimationFrame(tick);
    };

    this.animationId = requestAnimationFrame(tick);
  }

  private getDigitCount(...values: number[]): number {
    const max = Math.max(...values.map(Math.abs));
    return Math.ceil(Math.log(max + 1) / Math.log(10));
  }

  private getFractionalDigitCount(...values: number[]): number {
    const parser = /^-?\d*\.(\d*?)0*$/;
    return Math.max(
      ...values.map((val) => {
        const parts = parser.exec(String(val));
        return parts ? parts[1].length : 0;
      }),
    );
  }

  private resetDigits(): void {
    this.digits = [];
    this.ribbons = {};
    while (this.inside.firstChild)
      this.inside.removeChild(this.inside.firstChild);
    this.resetFormat();
  }

  private animateSlide(newValue: number, durationMs: number): void {
    let oldValue = this.value;
    const fractionalCount = this.getFractionalDigitCount(oldValue, newValue);

    if (fractionalCount) {
      newValue = newValue * Math.pow(10, fractionalCount);
      oldValue = oldValue * Math.pow(10, fractionalCount);
    }

    const diff = newValue - oldValue;
    if (!diff) return;

    this.bindTransitionEnd();

    const digitCount = this.getDigitCount(oldValue, newValue);
    const isCountingDown = diff < 0;
    let boosted = 0;

    const maxValues = (durationMs / MS_PER_FRAME / FRAMES_PER_VALUE) | 0;
    const digitFrames: number[][] = [];

    for (let i = 0; i < digitCount; i++) {
      const start = truncate(oldValue / Math.pow(10, digitCount - i - 1));
      const end = truncate(newValue / Math.pow(10, digitCount - i - 1));
      const dist = end - start;
      let frames: number[];

      if (Math.abs(dist) > maxValues) {
        const incr =
          dist / (maxValues + maxValues * boosted * DIGIT_SPEEDBOOST);
        frames = [];
        let cur = start;
        while ((dist > 0 && cur < end) || (dist < 0 && cur > end)) {
          frames.push(Math.round(cur));
          cur += incr;
        }
        if (frames[frames.length - 1] !== end) frames.push(end);
        boosted++;
      } else {
        frames = [];
        if (start <= end) {
          for (let n = start; n <= end; n++) frames.push(n);
        } else {
          for (let n = start; n >= end; n--) frames.push(n);
        }
      }

      digitFrames.push(frames.map((f) => Math.abs(f % 10)));
    }

    this.resetDigits();

    const reversedFrames = [...digitFrames].reverse();

    for (let i = 0; i < reversedFrames.length; i++) {
      let frames = reversedFrames[i];

      if (!this.digits[i]) {
        this.addDigit(" ", i >= fractionalCount);
      }

      if (!this.ribbons[i]) {
        const ribbonInner = this.digits[i].querySelector<HTMLElement>(
          ".odometer-ribbon-inner",
        );
        if (ribbonInner) this.ribbons[i] = ribbonInner;
      }

      while (this.ribbons[i].firstChild)
        this.ribbons[i].removeChild(this.ribbons[i].firstChild!);

      if (isCountingDown) {
        frames = [...frames].reverse();
      }

      for (let j = 0; j < frames.length; j++) {
        const numEl = document.createElement("div");
        numEl.className = "odometer-value";
        numEl.textContent = String(frames[j]);
        if (j === frames.length - 1) numEl.classList.add("odometer-last-value");
        if (j === 0) numEl.classList.add("odometer-first-value");
        this.ribbons[i].appendChild(numEl);
      }
    }

    if (oldValue < 0) this.addDigit("-");

    const radixMark = this.inside.querySelector(".odometer-radix-mark");
    if (radixMark) radixMark.parentElement?.removeChild(radixMark);

    if (fractionalCount) {
      this.addSpacer(
        this.format.radix,
        this.digits[fractionalCount - 1],
        "odometer-radix-mark",
      );
    }
  }

  private renderDigit(): HTMLElement {
    return buildDigitElement();
  }

  private insertDigit(digit: HTMLElement, before?: HTMLElement | null): void {
    if (before != null) {
      this.inside.insertBefore(digit, before);
    } else if (!this.inside.children.length) {
      this.inside.appendChild(digit);
    } else {
      this.inside.insertBefore(digit, this.inside.children[0]);
    }
  }

  private addSpacer(
    chr: string,
    before?: HTMLElement,
    extraClasses?: string,
  ): void {
    const spacer = buildFormattingMark();
    spacer.textContent = chr;
    if (extraClasses) addClass(spacer, extraClasses);
    this.insertDigit(spacer, before);
  }

  private addDigit(value: string, repeating = true): void {
    if (value === "-") {
      this.addSpacer(value, undefined, "odometer-negation-mark");
      return;
    }

    if (value === ".") {
      this.addSpacer(
        this.format.radix ?? ".",
        undefined,
        "odometer-radix-mark",
      );
      return;
    }

    if (repeating) {
      let resetted = false;
      while (true) {
        if (!this.format.repeating.length) {
          if (resetted) throw new Error("Bad odometer format without digits");
          this.resetFormat();
          resetted = true;
        }

        const chr = this.format.repeating[this.format.repeating.length - 1];
        this.format.repeating = this.format.repeating.slice(0, -1);

        if (chr === "d") break;
        this.addSpacer(chr);
      }
    }

    const digit = this.renderDigit();
    const valueEl = digit.querySelector<HTMLElement>(".odometer-value");
    if (valueEl) valueEl.textContent = value;
    this.digits.push(digit);
    this.insertDigit(digit);
  }

  static init(selector = ".odometer"): Odometer[] {
    const elements = document.querySelectorAll<HTMLElement>(selector);
    return Array.from(elements).map(
      (el) =>
        new Odometer({
          el,
          value: parseFloat(el.innerText || el.textContent || "0"),
        }),
    );
  }
}
