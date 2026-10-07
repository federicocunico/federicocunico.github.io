# Proposal

## Why

Adding photography and astrophotography images today means hand-editing `siteContent.js` and dropping files under `public/`. A local ingest drop-folder with an automated encode/watermark step lets new series appear on the site without manual catalog edits, while keeping large originals out of git and committing only web-ready assets.

## What Changes

- Add an `ingest/` workspace with separate trees for **photography** and **astro**, plus a tracked `ingest/README.md` documenting layout and usage.
- Add `make ingest` (and an npm script) that converts HEIF/HEIC/PNG/JPEG/WebP/TIFF sources to quality WebP, applies a bottom “F.Cunico” filigree watermark on **full-size images only**, and writes outputs under `public/` for the existing GitHub Pages build.
- Generate a committed media catalog from ingest folders so gallery **sections/filters are dynamic**: a new folder under the matching ingest tree becomes a new series (photography) or group section (astro).
- Drive `/photography` and `/astrophotography` from that catalog instead of hand-maintained `PHOTOGRAPHY` / `ASTRO` arrays (rich astro fields remain via optional per-image sidecars).
- Keep `ingest/` **contents** out of git (folder + README + empty tree markers stay tracked); commit processed full WebPs and the generated catalog so CI builds without local originals.
- Extend the existing thumbnail pipeline so thumbs remain unwatermarked derivatives of the ingested fulls.

## Capabilities

### New Capabilities

- `media-ingest`: Local ingest layout, format conversion to WebP, full-image watermarking, Makefile/npm entrypoint, gitignore rules, and generation of committed web assets plus a media catalog.
- `folder-driven-galleries`: Photography and astrophotography pages discover series/groups from the generated catalog and render a polished, automatic gallery UI when folders/images change.

### Modified Capabilities

- (none — no specs exist yet)

## Impact

- New scripts under `scripts/` (ingest pipeline); `Makefile` / `package.json` gain an `ingest` target.
- `.gitignore` ignores `ingest/**` except README and keepers; processed `public/.../full/*.webp` and generated catalog remain tracked.
- `src/siteContent.js` stops owning photo/astro media lists (or keeps only optional overlays); pages and `src/lib/media.js` consume the catalog.
- Dependency surface: `sharp` (already present) plus HEIF/HEIC support requirements documented for Windows/macOS/Linux.
- Existing `npm run media` / GitHub Actions build continue to generate thumbs and ship the site from committed public assets.
