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

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const ingestRoot = path.join(root, 'ingest')
const pub = path.join(root, 'public')
const catalogPath = path.join(root, 'src', 'generated', 'mediaCatalog.js')

const IMAGE = /\.(jpe?g|png|webp|tiff?|heic|heif)$/i
const MAX_EDGE = 2800
const WEBP_QUALITY = 82
const WATERMARK = 'F.Cunico'

let made = 0
let skipped = 0
let failed = 0

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

async function watermarkedWebp(src, out) {
  const base = sharp(src).rotate()
  const meta = await base.metadata()
  const width = meta.width || MAX_EDGE
  const height = meta.height || MAX_EDGE
  const long = Math.max(width, height)
  const scale = long > MAX_EDGE ? MAX_EDGE / long : 1
  const outW = Math.round(width * scale)
  const outH = Math.round(height * scale)
  const fontSize = Math.max(18, Math.round(Math.min(outW, outH) * 0.028))
  const margin = Math.round(fontSize * 1.2)
  const svg = Buffer.from(
    `<svg width="${outW}" height="${outH}" xmlns="http://www.w3.org/2000/svg">` +
      `<text x="${outW - margin}" y="${outH - margin}" text-anchor="end" ` +
      `font-family="Georgia, 'Times New Roman', serif" font-style="italic" font-size="${fontSize}" ` +
      `fill="#ffffff" fill-opacity="0.42">${WATERMARK}</text>` +
      `</svg>`
  )

  fs.mkdirSync(path.dirname(out), { recursive: true })
  let pipeline = sharp(src).rotate()
  if (scale < 1) pipeline = pipeline.resize({ width: outW, height: outH, fit: 'inside', withoutEnlargement: true })
  await pipeline.composite([{ input: svg, top: 0, left: 0 }]).webp({ quality: WEBP_QUALITY }).toFile(out)
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
    const items = []
    for (const name of listImageFiles(dir).sort()) {
      const src = path.join(dir, name)
      const outName = `${stemOf(name)}.webp`
      const out = path.join(pub, 'photography', seriesId, 'full', outName)
      const ok = await processOne(src, out)
      if (!ok && !fs.existsSync(out)) continue
      const side = loadSidecar(dir, name)
      items.push({
        file: outName,
        title: side.title || titleFromStem(stemOf(name)),
        ...(side.place ? { place: side.place } : {}),
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
    items.push({
      file: outName,
      title: side.title || titleFromStem(stem),
      group,
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
console.log(`ingest: ${parts.join(', ')}`)
if (failed && !made && !skipped && photography.length === 0 && astro.length === 0) process.exitCode = 1
