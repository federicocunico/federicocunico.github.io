/** Mark <img> as landscape when natural size is wider than tall (for pan-in-portrait). */
export function markLandscape(e) {
  const img = e?.target
  if (!(img instanceof HTMLImageElement)) return
  img.classList.toggle('is-landscape', img.naturalWidth > img.naturalHeight)
}
