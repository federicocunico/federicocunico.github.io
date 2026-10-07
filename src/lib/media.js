// URL helpers for files under public/.
// Fulls are watermarked WebPs from `npm run ingest`; thumbs from `npm run media` (no watermark).
const toWebp = (file) => file.replace(/\.[^.]+$/, '.webp')

export const astroFull = (file) => `/astro/full/${file}`
export const astroThumb = (file) => `/astro/thumbs/${toWebp(file)}`

export const photoFull = (series, file) => `/photography/${series}/full/${file}`
export const photoThumb = (series, file) => `/photography/${series}/thumbs/${toWebp(file)}`
