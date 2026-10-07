# Design

## Context

See proposal.md for motivation. Today originals live under `public/astro/full/` and (intended) `public/photography/<series>/full/`; `scripts/build-media.mjs` writes untracked thumbs; `PHOTOGRAPHY` / `ASTRO` in `siteContent.js` are hand-authored (photography is empty; astro has rich metadata). GitHub Pages builds from the repo via `.github/workflows/pages.yml` and does not have local drop-folder binaries. Constraints: static bilingual dual-theme Vue site, originals on demand, thumbs in lists, 390 px usable width, Makefile already wraps npm scripts.

## Goals / Non-Goals

**Goals:**
- One local command (`make ingest` / `npm run ingest`) from `ingest/photography|astro/...` → watermarked full WebPs + committed catalog.
- Dynamic gallery sections from folders without editing media arrays for each new series/group.
- Keep CI unchanged in spirit: build from committed public assets + regenerate thumbs at build time.

**Non-Goals:**
- Running ingest inside GitHub Actions (no originals in CI).
- CMS, upload UI, or cloud sync for ingest.
- Watermarking thumbnails or serving unwatermarked fulls on the public site.
- Auto-deriving astro integration hours / equipment from EXIF (sidecars only when needed).

## Decisions

### 1. Folder layout
```
ingest/
  README.md                 # tracked
  photography/<series-id>/  # sources; series-id = catalog id / URL segment
  astro/<group-id>/         # sources; group-id = filter key (e.g. nebula)
```
Optional sidecar next to a source: `Name.jpg.json` (or `Name.json`) with fields `{ title, catalog, type, date, integration, equipment, place, year }` as relevant.

**Why:** Matches existing `public/photography/<series>/` and astro filter groups; README can document kebab-case ids. **Alternative:** flat ingest with metadata files naming the section — rejected as easier to misfile and harder to browse locally.

### 2. Outputs and catalog
- Photography fulls: `public/photography/<series>/full/<stem>.webp` (watermarked).
- Astro fulls: `public/astro/full/<stem>.webp` (watermarked); group lives in the catalog, not in the path (keeps current URL helpers). If two groups would collide on stem, prefix with group or fail loudly — prefer unique stems in README.
- Catalog: committed `src/generated/mediaCatalog.js` (ES module exporting `{ photography, astro }`) so Vite imports it with zero runtime fetch.
- Thumbs: still `npm run media` / build from fulls → `thumbs/*.webp`, no watermark.

**Why:** Pages stay static; CI never needs ingest. **Alternative:** `public/media-catalog.json` fetched at runtime — unnecessary complexity for a static site.

### 3. Processing stack
- Extend around `sharp` (already a dep): rotate via EXIF, optional max long-edge resize for web (e.g. 2400–3200px), `webp({ quality: ~82 })`, then composite SVG/text watermark bottom-right/center (“F.Cunico”, semi-transparent, classical filigree).
- HEIC/HEIF: document platform support; on Windows prefer decoding via sharp’s libvips HEIF build or a documented fallback (`heic-convert` / system libheif). Fail that file with a clear message if decode is unavailable.
- Incremental: skip rewrite when source mtime ≤ output mtime and catalog entry still valid; always regenerate catalog from current folder scan + existing outputs tied to ingest trees.

**Why:** One toolchain with existing media script. **Alternative:** ImageMagick CLI — worse cross-platform Makefile story.

### 4. Site consumption
- Replace `export const PHOTOGRAPHY` / `ASTRO` media lists with imports from `src/generated/mediaCatalog.js` (keep i18n strings in `siteContent.js`).
- Migrate current hand-authored `ASTRO` entries into the catalog (one-time): either by placing sources under `ingest/astro/<group>/` and re-ingesting, or seeding the catalog plus copying existing JPGs through the watermark pipeline once.
- Photography page: series chips from `photography[]`; Astro page: filters from distinct `group` values present in `astro[]` (plus “all”), preserving lightbox rows when metadata exists.
- Home teaser: read first available series / featured astro from the catalog the same way.

**Why:** Single source of truth after ingest. **Alternative:** keep hand lists and merge — dual maintenance; rejected.

### 5. Git policy
```
ingest/**
!ingest/README.md
!ingest/photography/.gitkeep
!ingest/astro/.gitkeep
```
Track `public/**/full/*.webp` and `src/generated/mediaCatalog.js`. Keep ignoring thumbs and generated CVs/portrait as today.

### 6. Entrypoints
- `scripts/ingest-media.mjs` — scan, convert, watermark, write catalog.
- `package.json`: `"ingest": "node scripts/ingest-media.mjs"`.
- `Makefile`: `ingest` phony target; help text updated.
- README in ingest documents workflow: drop files → `make ingest` → commit public fulls + catalog → push (CI builds thumbs + site).

## Risks / Trade-offs

- [HEIC on Windows] → Document required libs; skip/fail clearly per file; JPEG/PNG path remains reliable.
- [Watermark strength vs aesthetics] → Tunable opacity/size constants in the ingest script; README notes they are intentional anti-theft markers on fulls only.
- [Large committed WebPs] → Cap long edge at ingest; git LFS only if repo size becomes painful later (out of scope unless needed).
- [Astro path flatness + name collisions] → Enforce unique output stems; document in README.
- [Migrating existing astro JPGs] → One-time ingest/re-encode so all public fulls are watermarked WebP; update catalog; remove old JPG fulls after verification.

## Migration Plan

1. Land ingest script, gitignore, README, empty keepers, empty generated catalog stub so the site still builds.
2. Run ingest on current `public/astro/full` sources (copy into `ingest/astro/<group>/` using existing `group` from siteContent) to produce watermarked WebPs + catalog; remove hand `ASTRO` array.
3. Photography starts empty until series folders are dropped in.
4. Rollback: restore previous `siteContent` arrays and JPG paths from git history; ignore new catalog.

## Open Questions

- Exact max long-edge and WebP quality knobs (default 2800px / quality 82 unless tuned during implement).
- Whether existing pre-watermark JPG fulls remain temporarily for smoke tests until migration commit — prefer cutover in the same change that switches the catalog.
