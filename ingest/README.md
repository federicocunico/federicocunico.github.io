# Media ingest

Drop source images here, then run **`make ingest`** (or `npm run ingest`).
Processed WebPs and `src/generated/mediaCatalog.js` are committed; this folder’s binaries stay local (gitignored).

## Layout

```
ingest/
  photography/<series-id>/   → public/photography/<series-id>/full/*.webp
  astro/<group-id>/          → public/astro/full/*.webp  (group = filter chip)
```

Folder names become URL ids via kebab-case slug (`Abu Dhabi` → `abu-dhabi`). Prefer kebab-case already (`dolomiti`, `nebula`).
Astro: put images in `ingest/astro/<group>/` (e.g. `nebula`, `cluster`, `galaxy`). Files left directly in `ingest/astro/` are catalogued under group `other`.
Astro output filenames must be unique across all groups (flat `public/astro/full/`).

## Supported formats

JPEG, PNG, WebP, TIFF, HEIF/HEIC.

### HEIC / HEIF

Decoding depends on your OS and the `sharp` / libvips build:

- **macOS / Linux:** often works out of the box if libvips was built with HEIF.
- **Windows:** HEIC may fail if libheif is unavailable. Convert to JPEG/PNG first, or install a libheif-enabled stack.

If a HEIC file cannot be decoded, ingest logs the error for that file and continues with the rest of the batch.

## Watermark

Full-size outputs get a bottom **F.Cunico** filigree watermark.
Thumbnails (from `npm run media` / the site build) are **not** watermarked.

## Sidecars (optional)

Next to a source image `HorseNebula.jpg`, add either:

- `HorseNebula.jpg.json`, or
- `HorseNebula.json`

Example (astro):

```json
{
  "title": "Horsehead Nebula",
  "catalog": "Barnard 33",
  "type": "dark",
  "date": "2024-12-16",
  "integration": 3,
  "equipment": "SeeStar S50"
}
```

Photography fields: `title`, `place`, `year`.

Per series, optional `series.json` in the series folder:

```json
{ "title": { "en": "Dolomites", "it": "Dolomiti" } }
```

## Workflow

1. Put originals under `photography/<series>/` or `astro/<group>/`.
2. Run `make ingest`.
3. Commit `public/**/full/*.webp` and `src/generated/mediaCatalog.js`.
4. Push — CI runs `npm run build` (thumbs + site) without needing this folder.
