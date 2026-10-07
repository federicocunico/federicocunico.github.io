# Tasks

## 1. Ingest workspace and git policy

- [x] 1.1 Create `ingest/README.md`, `ingest/photography/.gitkeep`, and `ingest/astro/.gitkeep`, and verify the README documents photography vs astro trees, formats, watermark-on-fulls-only, sidecars, and `make ingest`
- [x] 1.2 Update `.gitignore` so `ingest/**` is ignored except README and `.gitkeep` files, and verify `git check-ignore` / `git status` leaves sample binaries untracked while README stays trackable

## 2. Ingest pipeline

- [x] 2.1 Add `scripts/ingest-media.mjs` that scans `ingest/photography/<series>/` and `ingest/astro/<group>/`, converts supported images to WebP (default max long edge 2800px, quality 82), applies bottom `F.Cunico` watermark on fulls only, writes `public/photography/<series>/full/*.webp` and `public/astro/full/*.webp`, skips unsupported files with a log line, and verify a sample JPEG/PNG run produces watermarked WebPs
- [x] 2.2 Implement incremental skip (mtime-based), unique stem collision handling for astro, optional sidecar JSON merge into catalog fields, and verify re-running ingest without source changes reports up-to-date / does not rewrite mtimes needlessly
- [x] 2.3 Write committed `src/generated/mediaCatalog.js` from the scan (photography series + astro items with group and metadata), add `npm run ingest` and `make ingest`, and verify both entrypoints regenerate the catalog module successfully
- [x] 2.4 Document HEIC/HEIF platform notes in `ingest/README.md` and verify a missing/unsupported HEIC decode fails that file clearly without aborting the whole batch

## 3. Thumbnails and media helpers

- [x] 3.1 Ensure `scripts/build-media.mjs` still generates unwatermarked thumbs from ingested WebP fulls (astro + photography series), and verify `npm run media` creates `thumbs/*.webp` without the signature
- [x] 3.2 Adjust `src/lib/media.js` URL helpers if needed for `.webp` fulls and verify gallery thumb/full paths resolve for catalog entries

## 4. Folder-driven galleries

- [x] 4.1 Replace hand-maintained `PHOTOGRAPHY` / `ASTRO` media arrays with imports from `src/generated/mediaCatalog.js` (keep i18n copy in `siteContent.js`), update `PhotographyPage.vue`, `AstroPage.vue`, and `HomePage.vue` consumers, and verify empty photography still shows the empty state
- [x] 4.2 Drive photography series chips and astro group filters from the catalog (dynamic non-empty groups only), support optional metadata in lightbox rows with filename defaults when absent, and verify adding a series/group to the catalog appears in the UI without editing `siteContent.js` media lists
- [x] 4.3 Preserve existing gallery UX (lazy thumbs, lightbox fulls, ~390 px layout) and verify no horizontal scroll at 390 px on photography and astro pages with sample images

## 5. Migrate existing astro and verify end-to-end

- [x] 5.1 One-time migrate current `public/astro/full` JPGs via ingest (`ingest/astro/<group>/` + sidecars from former `ASTRO` metadata), commit watermarked WebPs + catalog, remove obsolete JPG fulls / hand array, and verify `/astrophotography` shows the same subjects with filters and lightbox metadata
- [x] 5.2 Run `npm run build` and `npm test` (or `make test`) and verify smoke checks pass for routes, media paths, and IT/EN with the generated catalog

## Workflow follow-up

- Archive the change with `/opsx-archive` after implementation is reviewed and complete.
