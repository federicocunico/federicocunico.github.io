# Federico Cunico — portfolio

Personal portfolio site (Vue 3 + Vite + vue-router), deployed to GitHub Pages.
Six pages: index, research, astrophotography, photography, music, CV. Bilingual (IT/EN), light theme by default with a dark toggle.

## Quick start

```bash
npm install
npm run dev      # generates thumbnails, then serves http://localhost:5173
npm run build    # thumbnails + CV PDFs + production build in dist/
npm run preview  # serve the production build
```

Or with make: `make serve` (hot-reload dev server on http://localhost:4173; `make serve-build` builds and serves the production output instead), `make test`
(build + check that every page, media file and CV responds and IT/EN texts match),
`make help` for the full list.

Push to `main`: GitHub Actions builds and deploys. `dist/404.html` is a copy of
`index.html`, so direct links such as `/astrophotography` work on GitHub Pages.

## Pages

| Route | Page |
|---|---|
| `/` | Index: intro, portrait, links to every section |
| `/research` | Topics and publications (live from Semantic Scholar, newest first) |
| `/astrophotography` | Latest capture, filterable gallery, lightbox with acquisition data and original download |
| `/photography` | Series gallery with lightbox |
| `/music` | Album, track list, player that keeps playing across pages |
| `/cv` | Profile, experience, education, publications, interests, links, PDF preview and download (IT/EN, regenerated from siteContent.js on every build) |

## Content

All texts and media lists live in [`src/siteContent.js`](src/siteContent.js).
Keep `CONTENT.en` and `CONTENT.it` in sync.

## Media — one folder per section

```
public/
  astro/full/<file>.jpg                 originals (loaded only when opened)
  astro/thumbs/<file>.webp              generated
  photography/<series>/full/<file>.jpg  originals
  photography/<series>/thumbs/          generated
  music/<album>/<file>.mp3              streamed, preload="none"
  research/cv-{en,it}.pdf               generated from siteContent.js
  profile/portrait-*.webp               generated from assets-src/portrait.jpg
```

Generated files are git-ignored and rebuilt by `npm run media` / `npm run generate:cv`
(both run automatically in `dev` and `build`).

### Add an astrophoto

1. Put the original in `public/astro/full/`.
2. Add an entry to `ASTRO` (`file`, `title`, `catalog`, `group`, `type`, `date`, `integration`, `equipment`).

### Add a photography series

1. Put the originals in `public/photography/<id>/full/`.
2. Add `{ id, title: { en, it }, items: [{ file, title, place, year }] }` to `PHOTOGRAPHY`.

### Add music

1. Put the audio files in `public/music/legacy/` (or a new album folder).
2. Add `{ title, file, duration }` entries to the album's `tracks` in `MUSIC` (`duration` in seconds is optional).

### Portrait

The 4:5 crop is computed from `assets-src/portrait.jpg` in `scripts/build-media.mjs`
(box expressed as fractions of the original frame).
