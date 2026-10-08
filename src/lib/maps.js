/** OpenStreetMap helpers (no API key). */

export function osmLink(lat, lon) {
  if (lat == null || lon == null || !Number.isFinite(Number(lat)) || !Number.isFinite(Number(lon))) return null
  const la = Number(lat)
  const lo = Number(lon)
  return `https://www.openstreetmap.org/?mlat=${la}&mlon=${lo}#map=14/${la}/${lo}`
}

export function osmEmbed(lat, lon) {
  if (lat == null || lon == null || !Number.isFinite(Number(lat)) || !Number.isFinite(Number(lon))) return null
  const la = Number(lat)
  const lo = Number(lon)
  const d = 0.04
  const bbox = `${lo - d}%2C${la - d}%2C${lo + d}%2C${la + d}`
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${la}%2C${lo}`
}
