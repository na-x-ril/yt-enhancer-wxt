# Event & Storage Map

Satu tempat untuk melacak semua komunikasi antar-komponen. Kalau ada bug
"setting diganti tapi player tidak ikut" (seperti kasus SponsorBlock),
mulai dari tabel ini: pastikan dispatch ada, listener terdaftar, dan
key storage sama di kedua sisi.

> Aturan main:
> - Config ditulis **hanya oleh Dropdown** (`components/dropdown.ts`);
>   feature lain membaca via `loadFeatureConfig` + event di bawah.
> - Semua load/save lewat `features/config-store.ts` (tidak pernah
>   `storageBridge` langsung dari feature).
> - Semua `window` listener harus punya pelepas di `destroy`
>   (lihat Batch 3).

## CustomEvent (`window.dispatchEvent` → `window.addEventListener`)

| Event | Dispatcher | Payload `detail` | Listener |
|---|---|---|---|
| `yt-enhancer-refresh` | `dropdown.ts` (tombol refresh) | — (kosong) | `watch/index.ts` → `onRefresh` |
| `yt-enhancer-setting` | `dropdown.ts` (`dispatchSettingChange`) | `{ setting: ToggleKey, value: boolean }` | `watch/index.ts` → `onSetting` (guard: boolean + key ada di `DEFAULT_CONFIG`) |
| `yt-enhancer-quality` | `dropdown.ts` (`dispatchQualityChange`) | `{ quality: Quality }` | `watch/index.ts` → `onQuality` (guard: `isQuality`) |
| `yt-enhancer-codec-reload` | `dropdown.ts` (`onCodecApply`) | — (kosong) | `watch/index.ts` → `reloadForCodecChange` |
| `yt-enhancer-codec-setting` | `dropdown.ts` (`dispatchCodecSetting`; saat init + tiap berubah) | `{ config: CodecConfig }` | `codec/index.ts` → `subscribe` (re-sanitize) |
| `yt-enhancer-sb-setting` | `dropdown.ts` (`dispatchSBSetting`; saat init + tiap berubah) | `{ type: "sponsorblock", config: SponsorBlockConfig }` | `sponsorblock/index.ts` → `handleSetting` (wajib `type === "sponsorblock"`, re-sanitize) |
| `yt-enhancer-codecs-updated` | `watch/index.ts` (`fetchAndLogVideoData`) | `{ video: string[], audio: string[] }` | `dropdown.ts` → `handleCodecsUpdated` (validasi array string) |
| `yt-enhancer-metadata-update` | `youtube-fetch-interceptor.content.ts` (patch `window.fetch` utk `/youtubei/v1/updated_metadata`) | `{ actions: [...] }` | `watch/index.ts` → `handleMetadataUpdate` via `parseMetadataActions` |

## Storage keys (`browser.storage.local` via `storageBridge`)

| Key | Ditulis oleh | Dibaca oleh | Catatan |
|---|---|---|---|
| `dropdown_config` | `dropdown.ts` (`saveConfig`) | `dropdown.ts`, `watch/index.ts` | Sanitize: `normalizeSavedConfig` |
| `codec_config` | `dropdown.ts` (`onCodecConfigChange`) | `dropdown.ts`, `codec/index.ts` | Sanitize: `sanitizeCodecConfig` |
| `sponsorblock_config` | `dropdown.ts` (`onSBConfigChange`) | `dropdown.ts`, `sponsorblock/index.ts` | Sanitize: `sanitizeSBConfig` |
| `sb_cache_<videoId>` | `sponsorblock/api.ts` (`fetchSegments`) | `sponsorblock/api.ts` | Key per video **tanpa kategori** → tiap ganti config harus `clearCache` dulu (lihat `onConfigChange`) |
| `video_time_<videoId>` | `watch/time-tracking.ts` (`saveTime`) | `watch/time-tracking.ts` (`restoreTime`) | Skip video <30 dtk & live; throttle ≥3 dtk |

## Bridge transport (`postMessage` MAIN ↔ ISOLATED)

Bukan CustomEvent — request/response mentah di `lib/core/bridge/bridge.ts`
↔ `entrypoints/youtube-bridge.content.ts`:

`YT_ENHANCER_GET / SET / REMOVE / CLEAR / GET_ALL` (+ `_<TYPE>_RESPONSE`,
atau `{ error }` bila gagal). Semua request **timeout 5 dtk**
(`BRIDGE_TIMEOUT_MS`) — tidak ada lagi promise gantung selamanya.

Bridge berjalan di **semua frame** (`allFrames: true`, kecuali live_chat)
karena script MAIN juga `allFrames` dan tiap frame post ke window-nya
sendiri. Satu race tersisa: script `document_start` bisa post sebelum
listener bridge terdaftar — codec-patch me-retry sekali (lihat
`youtube-codec-patch.content.ts`); kegagalan berarti default sampai
broadcast setting berikutnya menyembuhkan.
