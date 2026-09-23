# Instructions for coding agents

Portfolio of Federico Cunico (researcher in Computer Vision & AI; astrophotography, photography, music), built with Vue 3 + Vite + vue-router and deployed to GitHub Pages via GitHub Actions.

## Architecture

- `index.html` — Vite entry; loads Instrument Sans + IBM Plex Mono and applies the saved theme before first paint.
- `src/router.js` — routes (`/`, `/research`, `/astrophotography`, `/photography`, `/music`, `/cv`) and the `NAV` list; keeps `document.title` in sync.
- `src/App.vue` — shell: header, `RouterView`, footer, persistent player bar.
- `src/pages/` — one component per page.
- `src/components/` — `SiteHeader`, `SiteFooter`, `PageHead`, `LightboxViewer`, `PlayerBar`, `AppIcon`.
- `src/composables/` — `useLang` (IT/EN), `useTheme` (light default / dark), `usePlayer` (single global `Audio`, `preload="none"`).
- `src/siteContent.js` — **ALL editable content**: texts, `ASTRO`, `PHOTOGRAPHY`, `MUSIC`, `PUBLICATIONS` fallback, `LINKS`, `CONFIG`.
- `src/lib/media.js` — URL helpers for files in `public/`.
- `src/style.css` — design tokens (`--bg`, `--ink`, `--accent`, …) and shared classes; dark palette under `[data-theme="dark"]`.
- `scripts/build-media.mjs` — generates thumbnails and the portrait crop (sharp).
- `scripts/generate-cv.mjs` — generates `public/research/cv-{en,it}.pdf` (pdfmake, template in `src/lib/cvPdfTemplate.js`).

## Media layout

- `public/astro/full/` originals, `public/astro/thumbs/` generated.
- `public/photography/<series>/full/` originals, `…/thumbs/` generated.
- `public/music/<album>/` audio files.
- `public/research/` generated CVs; `public/profile/` generated portrait; source portrait in `assets-src/`.
Generated files are git-ignored.

## Rules

1. Content changes go in `src/siteContent.js` only. Keep `CONTENT.en` and `CONTENT.it` in sync (same keys).
2. Style changes go in components or `src/style.css`, using the CSS variables.
3. The site must remain a static build, bilingual, dual-theme (light default), and working at 390 px width. The main navigation is always visible (a tab row on small screens): no collapsible menu.
4. Media: originals are loaded only on demand (lightbox, play); lists show generated thumbnails.
5. Publications are fetched at runtime from Semantic Scholar and sorted newest first; `PUBLICATIONS` is the offline fallback.

## Quick test

```bash
npm install
npm run dev
```

Check: every route renders, IT/EN and theme toggles work, astro filters and lightbox (Esc / arrows) work, music player persists across pages when tracks exist, no horizontal scroll at 390 px.
