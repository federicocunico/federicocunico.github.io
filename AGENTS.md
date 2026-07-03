# Instructions for coding agents

Personal website of Federico Cunico (researcher in Computer Vision & AI), served by GitHub Pages from the root of `main`. Static site, no build step, no framework, no npm.

## Architecture

- `index.html` — the whole site: one page, one file. Contains the markup template (inside `<x-dc>`) and the logic (a `Component` class in the `<script data-dc-script>` tag at the bottom). Rendered client-side by `support.js`.
- `support.js` — runtime that renders `index.html`. **Never edit or regenerate this file.**
- `site_content.js` — ALL editable content (ES module). This is the file to touch for content changes.
- `src/assets/avatar.jpg` — profile photo. `public/astronomy/*.jpg` — photo gallery. `assets/cv.pdf` — CV embedded in the page.

## Rules

1. **Content changes (texts, links, jobs, education, gallery, config) go in `site_content.js` only.** Keep `en` and `it` in sync — every string exists in both `CONTENT.en` and `CONTENT.it`.
2. **Layout/style changes go in `index.html`.** All styling is inline `style="…"` attributes (plus `style-hover` for hover states). Do not introduce CSS classes, stylesheets, or frameworks. Colors are CSS variables (`--bg`, `--ink`, `--accent`, …) defined in `renderVals()` for both dark and light themes — change palettes there, not per-element.
3. Template holes `{{ name }}` are dotted lookups only (no expressions); computed values live in `renderVals()` in the logic class.
4. `<sc-for>` / `<sc-if>` are the loop/conditional primitives; keep their `hint-*` attributes.
5. Publications are fetched at runtime from the Semantic Scholar API (`fetchPublications`); `PUBLICATIONS` in `site_content.js` is only the offline fallback. Don't hardcode live publication data into the page.
6. The site must remain: static (openable via `file://` or any static host), dependency-free, bilingual (IT/EN toggle), dual-theme (dark default / light).
7. Adding a gallery photo = drop the `.jpg` in `public/astronomy/` + add one entry to `ASTRO` in `site_content.js`. Replacing the CV = overwrite `assets/cv.pdf` (path in `CONFIG.cvPdf`).
8. Do not rename `index.html`, `support.js`, or `site_content.js`; GitHub Pages and the dynamic `import('./site_content.js')` depend on these paths.

## Quick test

Open `index.html` in a browser (or `python3 -m http.server`). Check: hero renders, IT/EN and ☾/☀ toggles work, gallery lightbox opens, publications populate (or fallback list appears), CV section shows the PDF if `assets/cv.pdf` exists.
