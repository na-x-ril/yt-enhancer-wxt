# yt-enhancer-wxt

## Runtime & tools

- **Bun** (not Node/npm/pnpm). Use `bun` for all package operations.
- No linter, formatter, or test framework is configured.
- The only verification command is `bun compile` (runs `tsc --noEmit`).
- No CI/CD exists.

## Commands

| `bun dev` | Dev server (Chrome) |
| `bun dev:firefox` | Dev server (Firefox) |
| `bun build` | Production build (Chrome) |
| `bun build:firefox` | Production build (Firefox) |
| `bun zip` | Package `.zip` (Chrome) |
| `bun zip:firefox` | Package `.zip` (Firefox) |
| `bun compile` | **Only typecheck available** |
| `bun <script>` | Run a script from `scripts/` |

## Framework: WXT v0.20

- Extension entrypoints live in `entrypoints/`. See WXT docs for conventions.
- `postinstall` runs `wxt prepare` — auto-generates `.wxt/` (tsconfig, types, path aliases). Never edit `.wxt/` manually. If TS errors appear after cloning, run `bun install`.
- Path alias `@/` maps to project root (e.g. `@/lib/core/utils`).

## Architecture

Three MAIN-world content scripts + one ISOLATED-world bridge:

| File | World | Run at | Purpose |
|---|---|---|---|
| `youtube-main.content.ts` | MAIN | `document_idle` | App features + Dropdown UI. `allFrames: true`. |
| `youtube-fetch-interceptor.content.ts` | MAIN | `document_start` | Patches `window.fetch` to intercept `/youtubei/v1/updated_metadata`. |
| `youtube-livechat-patch.content.ts` | MAIN | `document_start` | Intercepts `window.ytInitialData` via `Object.defineProperty` setter; swaps `selected` from Top chat → Live chat (or replay variant). |
| `youtube-bridge.content.ts` | ISOLATED | `document_start` | `postMessage` bridge: MAIN ↔ `browser.storage`. Needed because MAIN world can't access `browser.*` APIs. |

- CSS is injected via manifest (`cssInjectionMode: "manifest"`). Sources in `lib/sites/youtube/styles/` (SCSS).
- Ad blocking is CSS-only (`filter.scss` with `display: none` on YT ad selectors).
- View count parser handles Indonesian locale suffixes (`rb`/`jt`/`miliar`).

## Non-obvious

- `lib/sites/youtube/features/watch/index.dev.ts` is git-ignored — a local dev override pattern.
- `.dev/` directory is git-ignored; contains fetched YT page JSON snapshots.
- `scripts/extract-yt-data.ts` fetches YT page data and generates TypeScript types via quicktype.
