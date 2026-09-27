// lib/sites/youtube/features/watch/view-count-parser.ts
//
// Parses YouTube's locale-formatted view counts ("1,2 jt", "3.4 rb",
// "5 miliar", "1.2M") into plain numbers. Pure functions, no DOM.

export class ViewCountParser {
  private normalizeDecimalString(raw: string): string {
    const dotCount = (raw.match(/\./g) ?? []).length;
    const commaCount = (raw.match(/,/g) ?? []).length;

    if (dotCount > 1) return raw.replace(/\./g, "");
    if (commaCount > 1) return raw.replace(/,/g, "");

    if (dotCount === 1 && commaCount === 1) {
      return raw.lastIndexOf(".") > raw.lastIndexOf(",")
        ? raw.replace(/,/g, "")
        : raw.replace(/\./g, "").replace(",", ".");
    }

    if (commaCount === 1) {
      const parts = raw.split(",");
      const decimals = parts[1] ?? "";
      return decimals.length === 3
        ? raw.replace(",", "")
        : raw.replace(",", ".");
    }

    if (dotCount === 1) {
      const parts = raw.split(".");
      const decimals = parts[1] ?? "";
      return decimals.length === 3 ? raw.replace(".", "") : raw;
    }

    return raw;
  }

  // Suffix may be glued to the digits ("1.2K", "2jt") or separated
  // ("1,2 jt"). `(?<=\d)` covers the glued case; `\b` the separated one.
  // NOTE: keep the three branches in sync with extractSuffix() below.
  private static readonly THOUSAND_RE = /(?:\b|(?<=\d))(rb|k)\b/;
  private static readonly MILLION_RE = /(?:\b|(?<=\d))(jt|m)\b/;
  private static readonly BILLION_RE = /(?:\b|(?<=\d))(miliar|b)\b/;

  public parseNumber(viewCountStr: string): number {
    if (!viewCountStr) return 0;

    const lower = viewCountStr.toLowerCase();
    let multiplier = 1;

    if (ViewCountParser.THOUSAND_RE.test(lower)) multiplier = 1_000;
    else if (ViewCountParser.MILLION_RE.test(lower)) multiplier = 1_000_000;
    else if (ViewCountParser.BILLION_RE.test(lower)) multiplier = 1_000_000_000;

    const numberMatch = viewCountStr.match(/[\d.,]+/);
    if (!numberMatch) return 0;

    const normalized = this.normalizeDecimalString(numberMatch[0]);
    const num = parseFloat(normalized);
    return isNaN(num) ? 0 : Math.floor(num * multiplier);
  }

  parse(viewCountStr: string): { count: number; formatted: string } {
    return { count: this.parseNumber(viewCountStr), formatted: viewCountStr };
  }

  public extractSuffix(viewCountString: string): {
    number: number;
    suffix: string;
    divisor: number;
    decimalPlaces: number;
  } {
    if (!viewCountString) {
      return { number: 0, suffix: "", divisor: 1, decimalPlaces: 0 };
    }

    const lower = viewCountString.toLowerCase();
    let divisor = 1;
    let decimalPlaces = 0;

    if (ViewCountParser.THOUSAND_RE.test(lower)) {
      divisor = 1_000;
      decimalPlaces = 1;
    } else if (ViewCountParser.MILLION_RE.test(lower)) {
      divisor = 1_000_000;
      decimalPlaces = 1;
    } else if (ViewCountParser.BILLION_RE.test(lower)) {
      divisor = 1_000_000_000;
      decimalPlaces = 1;
    }

    const numberMatch = viewCountString.match(/^[\d.,\s]+/);
    const numberPart = numberMatch ? numberMatch[0] : "";
    const suffixPart = viewCountString.slice(numberPart.length).trim();
    const suffix = suffixPart ? ` ${suffixPart}` : "";

    return {
      number: this.parseNumber(viewCountString),
      suffix,
      divisor,
      decimalPlaces,
    };
  }
}
