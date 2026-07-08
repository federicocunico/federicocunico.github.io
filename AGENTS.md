# Instructions for coding agents

Personal website of Federico Cunico (researcher in Computer Vision & AI), built with Vue 3 + Vite and deployed to GitHub Pages via GitHub Actions.

## Architecture

- `index.html` — Vite entry point.
- `src/App.vue` — page shell; wires section components and global state (language, theme, lightbox).
- `src/siteContent.js` — **ALL editable content** (texts, jobs, education, gallery metadata, config, links). Mirrors the old `site_content.js` structure.
- `src/components/` — one Vue component per page section.
- `src/composables/` — language and theme toggles.
- `src/lib/fetchPublications.js` — Semantic Scholar fetch + fallback helpers.
- `src/assets/avatar.jpg` — profile photo; circular crop tuned via `CONFIG.avatarCrop` in `src/siteContent.js`.
- `public/astronomy/*.jpg` — photo gallery.
- `public/assets/cv.pdf` — CV embedded in the page.

## Rules

1. **Content changes (texts, links, jobs, education, gallery, config) go in `src/siteContent.js` only.** Keep `en` and `it` in sync — every string exists in both `CONTENT.en` and `CONTENT.it`.
2. **Layout/style changes go in Vue components** under `src/components/` or `src/style.css`. Colors use CSS variables (`--bg`, `--ink`, `--accent`, …) set in `src/composables/useTheme.js`.
3. Publications are fetched at runtime from the Semantic Scholar API; `PUBLICATIONS` in `src/siteContent.js` is only the offline fallback.
4. The site must remain: static build output, bilingual (IT/EN toggle), dual-theme (dark default / light).
5. Adding a gallery photo = drop the `.jpg` in `public/astronomy/` + add one entry to `ASTRO` in `src/siteContent.js`. CV PDF is auto-generated from `src/siteContent.js` via `npm run generate:cv` (pdfmake); edit content there, not the PDF file.
6. Run `npm run dev` for local preview, `npm run build` before deploy. GitHub Actions builds on push to `main`. Avatar crop is CSS-based via `CONFIG.avatarCrop` (x, y, zoom).

## Quick test

```bash
npm install
npm run dev
```

Check: hero renders, IT/EN and ☾/☀ toggles work, gallery lightbox opens, publications populate (or fallback list appears), CV section shows the PDF if `public/assets/cv.pdf` exists.
