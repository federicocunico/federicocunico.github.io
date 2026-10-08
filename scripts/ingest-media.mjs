// Convert ingest/ sources to watermarked WebP fulls + media catalog.
//
//   ingest/photography/<series>/*  -> public/photography/<series>/full/<stem>.webp
//   ingest/astro/<group>/*         -> public/astro/full/<stem>.webp
//   catalog                        -> src/generated/mediaCatalog.js
//
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import exifr from 'exifr'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const ingestRoot = path.join(root, 'ingest')
const pub = path.join(root, 'public')
const catalogPath = path.join(root, 'src', 'generated', 'mediaCatalog.js')

const IMAGE = /\.(jpe?g|png|webp|tiff?|heic|heif)$/i
const MAX_EDGE = 4000
const WEBP_QUALITY = 88
const WATERMARK = 'F.Cunico'
const NOMINATIM_UA = 'federicocunico.github.io-ingest/1.0 (portfolio; contact via github.com/federicocunico)'

let made = 0
let skipped = 0
let failed = 0

/** Round lat/lon cache for Nominatim (avoid duplicate lookups). */
const placeCache = new Map()
let lastNominatimAt = 0

function humanize(id) {
  return id
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

/** URL-safe id from a folder name (spaces/accents → kebab-case). */
function slugify(name) {
  const s = name
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return s || 'series'
}

function stemOf(name) {
  return name.replace(/\.[^.]+$/, '')
}

function isStale(src, out) {
  return !fs.existsSync(out) || fs.statSync(out).mtimeMs < fs.statSync(src).mtimeMs
}

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'))
  } catch {
    return null
  }
}

/** Sidecar: Name.jpg.json or Name.json next to the image. */
function loadSidecar(dir, name) {
  const stem = stemOf(name)
  const candidates = [path.join(dir, `${name}.json`), path.join(dir, `${stem}.json`)]
  for (const c of candidates) {
    if (fs.existsSync(c)) {
      const data = readJson(c)
      if (data) return data
    }
  }
  return {}
}

function titleFromStem(stem) {
  return humanize(stem.replace(/([a-z])([A-Z])/g, '$1 $2'))
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

async function readGps(src) {
  try {
    const gps = await exifr.gps(src)
    if (!gps || gps.latitude == null || gps.longitude == null) return null
    const lat = Number(gps.latitude)
    const lon = Number(gps.longitude)
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null
    return { lat, lon }
  } catch {
    return null
  }
}

async function reverseGeocode(lat, lon) {
  const key = `${lat.toFixed(4)},${lon.toFixed(4)}`
  if (placeCache.has(key)) return placeCache.get(key)

  const wait = 1100 - (Date.now() - lastNominatimAt)
  if (wait > 0) await sleep(wait)

  const url =
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${encodeURIComponent(lat)}` +
    `&lon=${encodeURIComponent(lon)}&zoom=12&addressdetails=1`

  let place = null
  try {
    lastNominatimAt = Date.now()
    const res = await fetch(url, {
      headers: { 'User-Agent': NOMINATIM_UA, Accept: 'application/json' }
    })
    if (res.ok) {
      const data = await res.json()
      const a = data.address || {}
      place =
        a.city ||
        a.town ||
        a.village ||
        a.municipality ||
        a.county ||
        a.state ||
        a.country ||
        data.name ||
        data.display_name?.split(',')[0] ||
        null
      if (place) place = String(place).trim()
    } else {
      console.warn(`ingest: nominatim ${res.status} for ${key}`)
    }
  } catch (err) {
    console.warn(`ingest: nominatim failed for ${key} — ${err.message || err}`)
  }

  placeCache.set(key, place)
  return place
}

async function orientationOf(src) {
  try {
    const meta = await sharp(src).rotate().metadata()
    const w = meta.width || 0
    const h = meta.height || 0
    if (!w || !h) return null
    if (w > h) return 'landscape'
    if (h > w) return 'portrait'
    return 'portrait'
  } catch {
    return null
  }
}

async function watermarkedWebp(src, out) {
  // Resize first, then composite a small watermark (avoids SVG/canvas size mismatches).
  let pipeline = sharp(src).rotate()
  const meta = await pipeline.metadata()
  const width = meta.width || MAX_EDGE
  const height = meta.height || MAX_EDGE
  const long = Math.max(width, height)
  if (long > MAX_EDGE) {
    pipeline = sharp(src).rotate().resize({
      width: MAX_EDGE,
      height: MAX_EDGE,
      fit: 'inside',
      withoutEnlargement: true
    })
  }
  const { data, info } = await pipeline.toBuffer({ resolveWithObject: true })
  const fontSize = Math.max(18, Math.round(Math.min(info.width, info.height) * 0.028))
  const padX = Math.round(fontSize * 1.4)
  const padY = Math.round(fontSize * 0.85)
  const textW = Math.ceil(fontSize * WATERMARK.length * 0.62) + padX * 2
  const textH = Math.ceil(fontSize * 1.6) + padY
  const svg = Buffer.from(
    `<svg width="${textW}" height="${textH}" xmlns="http://www.w3.org/2000/svg">` +
      `<text x="${textW - padX}" y="${textH - padY}" text-anchor="end" ` +
      `font-family="Georgia, 'Times New Roman', serif" font-style="italic" font-size="${fontSize}" ` +
      `fill="#ffffff" fill-opacity="0.42">${WATERMARK}</text>` +
      `</svg>`
  )

  fs.mkdirSync(path.dirname(out), { recursive: true })
  await sharp(data).composite([{ input: svg, gravity: 'southeast' }]).webp({ quality: WEBP_QUALITY }).toFile(out)
  return { width: info.width, height: info.height }
}

function listImageFiles(dir) {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir).filter((n) => {
    const full = path.join(dir, n)
    return fs.statSync(full).isFile() && IMAGE.test(n) && !n.endsWith('.json')
  })
}

function listSubdirs(dir) {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir).filter((n) => fs.statSync(path.join(dir, n)).isDirectory())
}

async function processOne(src, out) {
  if (!isStale(src, out)) {
    skipped++
    return true
  }
  try {
    await watermarkedWebp(src, out)
    made++
    return true
  } catch (err) {
    failed++
    const msg = err && err.message ? err.message : String(err)
    console.warn(`ingest: skip ${path.relative(root, src)} — ${msg}`)
    return false
  }
}

function seriesPlaceFallback(title) {
  if (!title) return null
  if (typeof title === 'string') return title
  return title.it || title.en || null
}

async function buildPhotoMeta(src, side, seriesFallbackPlace) {
  const orientation = (await orientationOf(src)) || undefined
  let lat = side.lat != null ? Number(side.lat) : null
  let lon = side.lon != null ? Number(side.lon) : null
  let place = side.place || null

  if (lat == null || lon == null || !Number.isFinite(lat) || !Number.isFinite(lon)) {
    const gps = await readGps(src)
    if (gps) {
      lat = gps.lat
      lon = gps.lon
    } else {
      lat = null
      lon = null
    }
  }

  if (!place && lat != null && lon != null && Number.isFinite(lat) && Number.isFinite(lon)) {
    place = await reverseGeocode(lat, lon)
  }
  if (!place) place = seriesFallbackPlace || null

  const meta = {
    ...(orientation ? { orientation } : {}),
    ...(place ? { place } : {})
  }
  if (lat != null && lon != null && Number.isFinite(lat) && Number.isFinite(lon)) {
    meta.lat = Math.round(lat * 1e6) / 1e6
    meta.lon = Math.round(lon * 1e6) / 1e6
  }
  return meta
}

async function ingestPhotography() {
  const seriesList = []
  const usedIds = new Set()
  const photoIn = path.join(ingestRoot, 'photography')
  for (const folder of listSubdirs(photoIn).sort()) {
    const dir = path.join(photoIn, folder)
    let seriesId = slugify(folder)
    if (usedIds.has(seriesId)) {
      failed++
      console.warn(`ingest: duplicate series id "${seriesId}" from folder "${folder}" — rename one folder`)
      continue
    }
    usedIds.add(seriesId)
    const seriesMeta = readJson(path.join(dir, 'series.json')) || {}
    const title =
      seriesMeta.title ||
      ({ en: humanize(folder), it: humanize(folder) })
    const fallbackPlace = seriesPlaceFallback(title)
    const items = []
    for (const name of listImageFiles(dir).sort()) {
      const src = path.join(dir, name)
      const outName = `${stemOf(name)}.webp`
      const out = path.join(pub, 'photography', seriesId, 'full', outName)
      const ok = await processOne(src, out)
      if (!ok && !fs.existsSync(out)) continue
      const side = loadSidecar(dir, name)
      const geo = await buildPhotoMeta(src, side, fallbackPlace)
      items.push({
        file: outName,
        ...(side.title ? { title: side.title } : {}),
        ...geo,
        ...(side.year ? { year: String(side.year) } : {})
      })
    }
    if (items.length) seriesList.push({ id: seriesId, title, items })
  }
  return seriesList
}

async function processAstroDir(dir, groupId, usedStems, items) {
  const group = slugify(groupId)
  for (const name of listImageFiles(dir).sort()) {
    const stem = stemOf(name)
    if (usedStems.has(stem)) {
      failed++
      console.warn(
        `ingest: stem collision "${stem}.webp" (${usedStems.get(stem)} vs ${group}) — rename one source`
      )
      continue
    }
    usedStems.set(stem, group)
    const src = path.join(dir, name)
    const outName = `${stem}.webp`
    const out = path.join(pub, 'astro', 'full', outName)
    const ok = await processOne(src, out)
    if (!ok && !fs.existsSync(out)) continue
    const side = loadSidecar(dir, name)
    const orientation = (await orientationOf(src)) || undefined
    items.push({
      file: outName,
      title: side.title || titleFromStem(stem),
      group,
      ...(orientation ? { orientation } : {}),
      ...(side.catalog ? { catalog: side.catalog } : {}),
      ...(side.type ? { type: side.type } : {}),
      ...(side.date ? { date: side.date } : {}),
      ...(side.integration != null ? { integration: Number(side.integration) } : {}),
      ...(side.equipment ? { equipment: side.equipment } : {})
    })
  }
}

async function ingestAstro() {
  const items = []
  const usedStems = new Map()
  const astroIn = path.join(ingestRoot, 'astro')
  if (!fs.existsSync(astroIn)) return items
  // Prefer ingest/astro/<group>/…; loose files in ingest/astro/ go to group "other".
  for (const folder of listSubdirs(astroIn).sort()) {
    await processAstroDir(path.join(astroIn, folder), folder, usedStems, items)
  }
  if (listImageFiles(astroIn).length) {
    await processAstroDir(astroIn, 'other', usedStems, items)
  }
  return items
}

function writeCatalog(photography, astro) {
  const body =
    `// Auto-generated by scripts/ingest-media.mjs — do not edit by hand.\n` +
    `// Re-run \`make ingest\` after changing files under ingest/.\n\n` +
    `export const PHOTOGRAPHY = ${JSON.stringify(photography, null, 2)}\n\n` +
    `export const ASTRO = ${JSON.stringify(astro, null, 2)}\n`
  fs.mkdirSync(path.dirname(catalogPath), { recursive: true })
  fs.writeFileSync(catalogPath, body)
}

const photography = await ingestPhotography()
const astro = await ingestAstro()
writeCatalog(photography, astro)

const parts = [`catalog: ${photography.length} photo series, ${astro.length} astro`]
if (made) parts.unshift(`wrote ${made}`)
if (skipped) parts.push(`${skipped} up to date`)
if (failed) parts.push(`${failed} failed/skipped`)
if (placeCache.size) parts.push(`${placeCache.size} geocode lookup(s)`)
console.log(`ingest: ${parts.join(', ')}`)
if (failed && !made && !skipped && photography.length === 0 && astro.length === 0) process.exitCode = 1
