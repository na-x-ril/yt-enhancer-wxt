import { describe, expect, it } from "vitest";
import { ViewCountParser } from "./view-count-parser";

const parser = new ViewCountParser();

describe("ViewCountParser.parseNumber", () => {
  it("parses plain numbers", () => {
    expect(parser.parseNumber("1.234")).toBe(1234);
    expect(parser.parseNumber("12,345 views")).toBe(12345);
  });

  it("parses Indonesian suffixes", () => {
    expect(parser.parseNumber("1,2 jt")).toBe(1_200_000);
    expect(parser.parseNumber("3 rb")).toBe(3_000);
    expect(parser.parseNumber("2,5 miliar")).toBe(2_500_000_000);
  });

  it("parses English shorthand", () => {
    expect(parser.parseNumber("1.2K")).toBe(1_200);
    expect(parser.parseNumber("3.4M")).toBe(3_400_000);
    expect(parser.parseNumber("1B")).toBe(1_000_000_000);
  });

  it("parses suffixes glued to digits", () => {
    expect(parser.parseNumber("2jt")).toBe(2_000_000);
    expect(parser.parseNumber("12k")).toBe(12_000);
  });

  it("returns 0 for garbage", () => {
    expect(parser.parseNumber("")).toBe(0);
    expect(parser.parseNumber("no views yet")).toBe(0);
  });
});

describe("ViewCountParser.extractSuffix", () => {
  it("splits number and suffix with divisor info", () => {
    expect(parser.extractSuffix("1,2 jt")).toMatchObject({
      suffix: " jt",
      divisor: 1_000_000,
      decimalPlaces: 1,
    });
  });

  it("handles suffix-less counts", () => {
    expect(parser.extractSuffix("123")).toMatchObject({
      suffix: "",
      divisor: 1,
      decimalPlaces: 0,
    });
  });
});
