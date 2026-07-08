# Personal website (Vue + Vite)

Static personal site for Federico Cunico, built with Vue 3 and Vite, deployed to GitHub Pages.

## Quick start

```bash
npm install
npm run dev      # optimizes avatar + local preview at http://localhost:5173
npm run build    # optimizes avatar + generates CV + production build in dist/
npm run preview  # preview the production build
```

Push to `main` — GitHub Actions builds and deploys automatically.

## Where to edit content

**Almost everything lives in one file:** [`src/siteContent.js`](src/siteContent.js)

| What to change | Where |
|---|---|
| Texts (EN + IT) | `CONTENT.en` and `CONTENT.it` in `src/siteContent.js` |
| Work experience | `CONTENT.*.experience` — add/edit objects `{ role, org, period, text }` |
| Education | `CONTENT.*.education` — same pattern |
| Research topics | `CONTENT.*.researchTopics` |
| Gallery photos | `ASTRO` array + image file in `public/astronomy/` |
| External links | `LINKS` object |
| CV path, hero image, settings | `CONFIG` object |

Keep **both** `CONTENT.en` and `CONTENT.it` in sync when you change strings.

## Generate / update the CV (PDF)

The CV is **auto-generated** from `src/siteContent.js` using [pdfmake](https://pdfmake.github.io/) — no manual PDF editing needed.

### What gets included

- Name, role, location, links
- Summary (from `heroIntro`)
- Research topics
- Experience and education (from `CONTENT`)
- Selected publications (from `PUBLICATIONS`)

### Commands

```bash
npm run generate:cv       # English PDF → public/assets/cv.pdf
npm run generate:cv:it    # Italian PDF → public/assets/cv.pdf
npm run build             # runs avatar optimization + generate:cv + Vite build
```

### Workflow

1. Edit CV content in `src/siteContent.js` (experience, education, publications, texts).
2. Run `npm run generate:cv` (or `npm run build`).
3. The embedded CV on the site updates from `public/assets/cv.pdf`.

### On the live site

- Click **Generate PDF** in the CV section to download a fresh PDF in the **current language** (EN/IT), without rebuilding.
- Click **Download CV** to open the pre-built PDF from the last deploy.

### Optional: manual PDF override

You can still drop a hand-crafted PDF at `public/assets/cv.pdf` — but running `npm run generate:cv` will overwrite it.

## Profile photo

1. Replace the photo at [`src/assets/avatar.jpg`](src/assets/avatar.jpg).
2. Tune the circular crop in `src/siteContent.js` → `CONFIG.avatarCrop`:

```js
avatarCrop: {
  x: 50,     // horizontal focal point (0 = left, 100 = right)
  y: 28,     // vertical focal point (0 = top, 100 = bottom)
  zoom: 1.18 // zoom inside the circle (>1 = closer)
}
```

Changes apply instantly with hot reload during `npm run dev` — no rebuild needed for crop tweaks.

## Add a gallery photo

1. Copy the `.jpg` into [`public/astronomy/`](public/astronomy/).
2. Add one entry to the `ASTRO` array in `src/siteContent.js`:

```js
{ src: '/astronomy/MyPhoto.jpg', title: 'My Nebula', date: '2025-01-01', equipment: '…', integration: '2h' }
```

## Publications

Publications are fetched live from Semantic Scholar using `CONFIG.scholarAuthorName`. If the API is unavailable, the site falls back to the static `PUBLICATIONS` list in `src/siteContent.js`.

## Project structure

```
index.html              Vite entry
src/
  siteContent.js        ← main content file (edit this)
  lib/cvPdfTemplate.js  ← CV PDF layout template
  App.vue               page layout
  components/           section components
  assets/avatar.jpg     profile photo (crop tuned via CONFIG.avatarCrop)
scripts/
  generate-cv.mjs       build-time CV PDF generator
public/
  astronomy/            gallery images
  assets/cv.pdf         CV PDF (auto-generated)
```

## Deployment (GitHub Actions)

The workflow [`.github/workflows/pages.yml`](.github/workflows/pages.yml) runs on every push to `main`:

1. `npm ci` — install dependencies
2. `npm run build` — generate CV PDF, build Vite app to `dist/`
3. Deploy `dist/` to GitHub Pages

### One-time GitHub setup

In your repo on GitHub: **Settings → Pages → Build and deployment → Source** must be set to **GitHub Actions** (not “Deploy from a branch”).

### Manual deploy check

```bash
npm ci
npm run build
npm run preview   # open the printed URL and verify
```

## Assets (if migrating from the old site)

| Old path | New path |
|---|---|
| `assets/cv.pdf` | `public/assets/cv.pdf` (auto-generated) |
| `src/assets/avatar.jpg` | `src/assets/avatar.jpg` (master source) |
| `public/astronomy/*.jpg` | `public/astronomy/*.jpg` (unchanged) |
| `favicon.ico` (root) | `public/favicon.ico` |
