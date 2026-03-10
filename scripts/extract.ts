// scripts/extract.ts
import { readFileSync } from "fs";

function extractPaths(
  obj: unknown,
  targetKey: string,
  currentPath: string = "",
): string[] {
  if (obj === null || typeof obj !== "object") return [];

  const results: string[] = [];

  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      results.push(...extractPaths(obj[i], targetKey, `${currentPath}[${i}]`));
    }
    return results;
  }

  for (const key of Object.keys(obj as Record<string, unknown>)) {
    const fullPath = currentPath ? `${currentPath}.${key}` : key;
    if (key === targetKey) {
      results.push(fullPath);
    }
    results.push(
      ...extractPaths(
        (obj as Record<string, unknown>)[key],
        targetKey,
        fullPath,
      ),
    );
  }

  return results;
}

function getValueAtPath(obj: unknown, path: string): unknown {
  const parts = path
    .replace(/\[(\d+)\]/g, ".$1")
    .split(".")
    .filter(Boolean);

  let current: unknown = obj;
  for (const part of parts) {
    if (current === null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return current;
}

function main() {
  const [, , filePath, targetKey] = process.argv;

  if (!filePath || !targetKey) {
    console.error("Usage: bun scripts/extract.ts <file.json> <key>");
    process.exit(1);
  }

  let data: unknown;
  try {
    data = JSON.parse(readFileSync(filePath, "utf-8"));
  } catch (err) {
    console.error(`Failed to read or parse file: ${filePath}`);
    process.exit(1);
  }

  const paths = extractPaths(data, targetKey);

  if (paths.length === 0) {
    console.log(`No matches found for key: "${targetKey}"`);
    return;
  }

  for (const path of paths) {
    const value = getValueAtPath(data, path);
    console.log(`\nPath: ${path}`);
    console.log("Value:", JSON.stringify(value, null, 2));
  }

  console.log(`\nTotal matches: ${paths.length}`);
}

main();
