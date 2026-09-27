// scripts/check-patterns.ts
//
// Static guardrails for bug classes found during the quality batches:
//  1. Promise executors without `reject` (hang forever on failure) — Batch 1.
//  2. Empty `catch {}` (failures invisible) — Batch 3.
//  3. `console.log` in shipped code (debug noise in prod) — Batch 1.
//     (`console.warn`/`console.error` are allowed.)
//
// Usage: `bun run check-patterns` (also runs in CI, non-blocking).
// Exit 1 with file:line list on violation.

export {};

const ROOTS = ["lib", "entrypoints"];
const EXTENSIONS = [".ts", ".scss"];

// Git-ignored dev fixtures — never shipped, never scanned.
const EXCLUDE_RES = [/\.dev\.ts$/, /test-data\.ts$/];

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
