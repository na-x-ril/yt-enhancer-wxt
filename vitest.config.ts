// vitest.config.ts (dev/test only — not bundled by WXT)
import { defineConfig } from "vitest/config";

// Mirrors the `@/` → project root alias from .wxt/tsconfig.json without
// needing node: imports (keeps `tsc --noEmit` happy without @types/node).
const root = new URL(".", import.meta.url).pathname.replace(/\/$/, "");

export default defineConfig({
  resolve: {
    alias: { "@": root },
  },
  test: {
    include: ["lib/**/*.test.ts"],
  },
});
