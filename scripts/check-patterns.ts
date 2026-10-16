// scripts/check-patterns.ts
//
// Static guardrails for bug classes found during the quality batches:
//  1. Promise executors without `reject` (hang forever on failure) — Batch 1.
//  2. Empty `catch {}` (failures invisible) — Batch 3.
//  3. `console.log` in shipped code (debug noise in prod) — Batch 1.
//     (`console.warn`/`console.error` are allowed.)
//  4. Hardcoded extension identities (selectors, element ids/classes,
//     data-* attributes, event names) duplicated as bare string literals
//     instead of imported from their defining module.
//
// Usage: `bun run check-patterns` (also runs in CI, non-blocking).
// Exit 1 with file:line list on violation.

import {
  DATA_ATTRS,
  ELEMENT_CLASSES,
  ELEMENT_IDS,
  ELEMENT_SELECTORS,
} from "../lib/core/utils";
import { EVENTS } from "../lib/sites/youtube/events";

export {};

const ROOTS = ["lib", "entrypoints"];
const EXTENSIONS = [".ts", ".scss"];

// Git-ignored dev fixtures and tests — never shipped, never scanned.
const EXCLUDE_RES = [/\.dev\.ts$/, /test-data\.ts$/, /\.test\.ts$/];

// A match is waived only with an explicit trailing marker explaining WHY
// the line is safe, e.g.:
//   await new Promise((resolve) => setTimeout(resolve, ms)); // check-patterns-safe: setTimeout always fires
const WAIVER_MARKER = "check-patterns-safe";

interface Violation {
  file: string;
  line: number;
  rule: string;
  text: string;
}

const RULES: Array<{ name: string; pattern: RegExp }> = [
  {
    // new Promise((resolve) => ...) can never reject → hangs forever.
    // Write new Promise((resolve, reject) => ...) instead.
    name: "promise-without-reject",
    pattern: /new\s+Promise\s*\(\s*\(\s*resolve\s*\)\s*=>/,
  },
  {
    name: "empty-catch",
    pattern: /catch\s*(\(\s*\w*\s*\))?\s*\{\s*\}/,
  },
  {
    name: "console-log-in-shipped-code",
    pattern: /console\.log\s*\(/,
  },
  {
    // Doubled !important is invalid CSS: old minifiers tolerated it, new
    // ones (lightningcss via Vite 8) fail the build. Variables in
    // _variables.scss already carry !important — never add another.
    name: "double-important",
    pattern: /!important\s*!important/,
  },
];

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Every string identity the extension owns, matched only when it appears as a
// bare quoted literal. The defining modules are exempt (see IDENTITY_ALLOWLIST).
const IDENTITY_PATTERNS = [
  ...Object.values(ELEMENT_IDS),
  ...Object.values(ELEMENT_CLASSES),
  ...Object.values(DATA_ATTRS),
  ...Object.values(ELEMENT_SELECTORS),
  ...Object.values(EVENTS),
].map((value) => new RegExp(`["'\`]${escapeRegExp(value)}["'\`]`));

const IDENTITY_ALLOWLIST = [
  /lib[\\/]core[\\/]utils[\\/]index\.ts$/,
  /lib[\\/]sites[\\/]youtube[\\/]events\.ts$/,
];

// Only flag the identity when the line clearly looks up / wires an element or
// event — a decorative CSS className that happens to share the token is fine.
const IDENTITY_CONTEXT =
  /(querySelector(All)?|getElementById|closest|matches|addEventListener|removeEventListener|dispatchEvent|CustomEvent|getAttribute|setAttribute|hasAttribute|id\s*:)/;

async function collectFiles(): Promise<string[]> {
  const files: string[] = [];
  for (const root of ROOTS) {
    const glob = new Bun.Glob(`**/*{${EXTENSIONS.join(",")}}`);
    for await (const file of glob.scan({ cwd: root, absolute: true })) {
      files.push(file);
    }
  }
  return files.sort();
}

async function main(): Promise<void> {
  const violations: Violation[] = [];

  for (const file of await collectFiles()) {
    if (EXCLUDE_RES.some((re) => re.test(file))) continue;
    const content = await Bun.file(file).text();
    const lines = content.split("\n");
    const checkIdentity =
      file.endsWith(".ts") &&
      !IDENTITY_ALLOWLIST.some((re) => re.test(file));
    lines.forEach((text, index) => {
      if (text.includes(WAIVER_MARKER)) return;
      for (const rule of RULES) {
        if (rule.pattern.test(text)) {
          violations.push({
            file,
            line: index + 1,
            rule: rule.name,
            text: text.trim(),
          });
        }
      }
      if (
        checkIdentity &&
        IDENTITY_CONTEXT.test(text) &&
        IDENTITY_PATTERNS.some((re) => re.test(text))
      ) {
        violations.push({
          file,
          line: index + 1,
          rule: "hardcoded-extension-identity",
          text: text.trim(),
        });
      }
    });
  }

  if (violations.length > 0) {
    for (const v of violations) {
      console.error(`${v.file}:${v.line} [${v.rule}] ${v.text}`);
    }
    console.error(`\n${violations.length} pattern violation(s) found.`);
    process.exit(1);
  }

  console.log("check-patterns: OK (no violations)");
}

await main();
