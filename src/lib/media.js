// URL helpers for files under public/. Thumbnails are produced by scripts/build-media.mjs.
const toWebp = (file) => file.replace(/\.[^.]+$/, '.webp')

export const astroFull = (file) => `/astro/full/${file}`
export const astroThumb = (file) => `/astro/thumbs/${toWebp(file)}`

export const photoFull = (series, file) => `/photography/${series}/full/${file}`
export const photoThumb = (series, file) => `/photography/${series}/thumbs/${toWebp(file)}`
