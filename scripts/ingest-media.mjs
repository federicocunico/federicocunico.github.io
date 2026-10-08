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
const photoExifPath = path.join(root, 'src', 'generated', 'photoExif.json')

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

/** Persistent EXIF/place store — merged across ingests, never wiped by re-runs. */
const photoExifStore = readJson(photoExifPath) || {}

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

function formatExposure(t) {
  if (t == null || !Number.isFinite(Number(t))) return null
  const n = Number(t)
  if (n >= 1) return `${Number(n.toFixed(1))} s`
  const den = Math.max(1, Math.round(1 / n))
  return `1/${den} s`
}

function formatDate(d) {
  if (!d) return null
  const dt = d instanceof Date ? d : new Date(d)
  if (Number.isNaN(dt.getTime())) return null
  return dt.toISOString().slice(0, 10)
}

function formatFocal(mm) {
  if (mm == null || !Number.isFinite(Number(mm))) return null
  return `${Number(Number(mm).toFixed(1))} mm`
}

function formatAperture(f) {
  if (f == null || !Number.isFinite(Number(f))) return null
  return `f/${Number(Number(f).toFixed(1))}`
}

/** Keep existing values; fill/overwrite only when incoming has a non-empty value. */
function mergeMeta(prev, incoming) {
  const out = { ...(prev || {}) }
  for (const [k, v] of Object.entries(incoming || {})) {
    if (v == null || v === '') continue
    out[k] = v
  }
  return out
}

async function extractExif(src) {
  const out = {}
  try {
    const raw = await exifr.parse(src, {
      pick: [
        'Make',
        'Model',
        'LensModel',
        'FocalLength',
        'FocalLengthIn35mmFormat',
        'FNumber',
        'ExposureTime',
        'ISO',
        'DateTimeOriginal',
        'CreateDate'
      ]
    })
    if (raw) {
      const make = raw.Make ? String(raw.Make).trim() : ''
      const model = raw.Model ? String(raw.Model).trim() : ''
      const camera = [make, model].filter(Boolean).join(' ')
      if (camera) out.camera = camera
      if (raw.LensModel) out.lens = String(raw.LensModel).trim()
      const focal = formatFocal(raw.FocalLengthIn35mmFormat || raw.FocalLength)
      if (focal) out.focalLength = focal
      const aperture = formatAperture(raw.FNumber)
      if (aperture) out.aperture = aperture
      const exposure = formatExposure(raw.ExposureTime)
      if (exposure) out.exposure = exposure
      if (raw.ISO != null) out.iso = String(raw.ISO)
      const date = formatDate(raw.DateTimeOriginal || raw.CreateDate)
      if (date) out.date = date
      if (date) out.year = date.slice(0, 4)
    }
  } catch {
    /* ignore parse errors */
  }
  try {
    const gps = await exifr.gps(src)
    if (gps && gps.latitude != null && gps.longitude != null) {
      const lat = Number(gps.latitude)
      const lon = Number(gps.longitude)
      if (Number.isFinite(lat) && Number.isFinite(lon)) {
        out.lat = Math.round(lat * 1e6) / 1e6
        out.lon = Math.round(lon * 1e6) / 1e6
      }
    }
  } catch {
    /* no GPS */
  }
  return out
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

async function buildPhotoMeta(metaKey, src, side, seriesFallbackPlace) {
  const prev = photoExifStore[metaKey] || {}
  const orientation = (await orientationOf(src)) || undefined
  const extracted = await extractExif(src)

  const sidecarPatch = {}
  if (side.title) sidecarPatch.title = side.title
  if (side.place) sidecarPatch.place = side.place
  if (side.year) sidecarPatch.year = String(side.year)
  if (side.date) sidecarPatch.date = String(side.date)
  if (side.camera) sidecarPatch.camera = side.camera
  if (side.lens) sidecarPatch.lens = side.lens
  if (side.focalLength) sidecarPatch.focalLength = side.focalLength
  if (side.aperture) sidecarPatch.aperture = side.aperture
  if (side.exposure) sidecarPatch.exposure = side.exposure
  if (side.iso != null) sidecarPatch.iso = String(side.iso)
  if (side.lat != null && Number.isFinite(Number(side.lat))) sidecarPatch.lat = Number(side.lat)
  if (side.lon != null && Number.isFinite(Number(side.lon))) sidecarPatch.lon = Number(side.lon)

  let merged = mergeMeta(prev, extracted)
  if (orientation) merged = mergeMeta(merged, { orientation })
  merged = mergeMeta(merged, sidecarPatch)

  let lat = merged.lat != null ? Number(merged.lat) : null
  let lon = merged.lon != null ? Number(merged.lon) : null
  if (lat != null && lon != null && Number.isFinite(lat) && Number.isFinite(lon)) {
    merged.lat = Math.round(lat * 1e6) / 1e6
    merged.lon = Math.round(lon * 1e6) / 1e6
    if (!merged.place || merged.place === seriesFallbackPlace) {
      const geo = await reverseGeocode(merged.lat, merged.lon)
      if (geo) merged.place = geo
    }
  }
  if (!merged.place && seriesFallbackPlace) merged.place = seriesFallbackPlace

  // Persist merged record (never drop previous keys).
  photoExifStore[metaKey] = mergeMeta(prev, merged)
  return photoExifStore[metaKey]
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
      const metaKey = `${seriesId}/${stemOf(name)}`
      const meta = await buildPhotoMeta(metaKey, src, side, fallbackPlace)
      const item = { file: outName }
      for (const k of [
        'title',
        'orientation',
        'place',
        'lat',
        'lon',
        'date',
        'year',
        'camera',
        'lens',
        'focalLength',
        'aperture',
        'exposure',
        'iso'
      ]) {
        if (meta[k] != null && meta[k] !== '') item[k] = meta[k]
      }
      items.push(item)
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
    const metaKey = `astro/${stem}`
    const prev = photoExifStore[metaKey] || {}
    const orientation = (await orientationOf(src)) || undefined
    const extracted = await extractExif(src)

    // Never invent a title from the filename — only sidecar / prior store / explicit side.title.
    const sidecarPatch = {}
    if (side.title) sidecarPatch.title = side.title
    if (side.place) sidecarPatch.place = side.place
    if (side.catalog) sidecarPatch.catalog = side.catalog
    if (side.type) sidecarPatch.type = side.type
    if (side.date) sidecarPatch.date = side.date
    if (side.integration != null) sidecarPatch.integration = Number(side.integration)
    if (side.equipment) sidecarPatch.equipment = side.equipment
    if (side.lat != null && Number.isFinite(Number(side.lat))) sidecarPatch.lat = Number(side.lat)
    if (side.lon != null && Number.isFinite(Number(side.lon))) sidecarPatch.lon = Number(side.lon)

    let merged = mergeMeta(prev, extracted)
    if (orientation) merged = mergeMeta(merged, { orientation })
    merged = mergeMeta(merged, sidecarPatch)
    // Drop filename-style titles left over from older ingests when no sidecar title is set.
    if (!side.title && merged.title && looksLikeFilenameTitle(merged.title, stem)) {
      delete merged.title
    }
    photoExifStore[metaKey] = mergeMeta(prev, merged)
    const meta = photoExifStore[metaKey]

    const item = { file: outName, group }
    for (const k of [
      'title',
      'place',
      'lat',
      'lon',
      'orientation',
      'catalog',
      'type',
      'date',
      'integration',
      'equipment',
      'camera',
      'lens',
      'focalLength',
      'aperture',
      'exposure',
      'iso'
    ]) {
      if (meta[k] != null && meta[k] !== '') item[k] = meta[k]
    }
    items.push(item)
  }
}

/** True when title is just a humanized stem (e.g. "IMG 0400" from IMG_0400). */
function looksLikeFilenameTitle(title, stem) {
  const norm = (s) =>
    String(s)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '')
  return norm(title) === norm(stem) || norm(title) === norm(titleFromStem(stem))
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

function writePhotoExifStore() {
  fs.mkdirSync(path.dirname(photoExifPath), { recursive: true })
  const sorted = Object.fromEntries(Object.entries(photoExifStore).sort(([a], [b]) => a.localeCompare(b)))
  fs.writeFileSync(photoExifPath, `${JSON.stringify(sorted, null, 2)}\n`)
}

const photography = await ingestPhotography()
const astro = await ingestAstro()
writeCatalog(photography, astro)
writePhotoExifStore()

const parts = [`catalog: ${photography.length} photo series, ${astro.length} astro`]
if (made) parts.unshift(`wrote ${made}`)
if (skipped) parts.push(`${skipped} up to date`)
if (failed) parts.push(`${failed} failed/skipped`)
if (placeCache.size) parts.push(`${placeCache.size} geocode lookup(s)`)
parts.push(`exif store ${Object.keys(photoExifStore).length} entries`)
console.log(`ingest: ${parts.join(', ')}`)
if (failed && !made && !skipped && photography.length === 0 && astro.length === 0) process.exitCode = 1
