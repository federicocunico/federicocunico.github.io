// Generates lightweight derivatives of the media in public/ so pages load
// small files first and fetch originals only on demand.
//
//   public/astro/full/*.jpg              -> public/astro/thumbs/*.webp
//   public/photography/<series>/full/*   -> public/photography/<series>/thumbs/*.webp
//   assets-src/portrait.jpg              -> public/profile/portrait-{640,1280}.webp
//
// Files are regenerated only when the source is newer than the output.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const pub = path.join(root, 'public')
const IMAGE = /\.(jpe?g|png|webp|tiff?)$/i

let made = 0

function isStale(src, out) {
  return !fs.existsSync(out) || fs.statSync(out).mtimeMs < fs.statSync(src).mtimeMs
}

async function thumbs(fullDir, thumbDir, width = 640) {
  if (!fs.existsSync(fullDir)) return
  fs.mkdirSync(thumbDir, { recursive: true })
  for (const name of fs.readdirSync(fullDir).filter((n) => IMAGE.test(n))) {
    const src = path.join(fullDir, name)
    const out = path.join(thumbDir, name.replace(IMAGE, '.webp'))
    if (!isStale(src, out)) continue
    await sharp(src).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 72 }).toFile(out)
    made++
  }
}

// Astrophotography
await thumbs(path.join(pub, 'astro', 'full'), path.join(pub, 'astro', 'thumbs'))

// Photography: one folder per series
const photoDir = path.join(pub, 'photography')
if (fs.existsSync(photoDir)) {
  for (const series of fs.readdirSync(photoDir)) {
    const dir = path.join(photoDir, series)
    if (fs.statSync(dir).isDirectory()) await thumbs(path.join(dir, 'full'), path.join(dir, 'thumbs'))
  }
}

// Portrait: 4:5 head-and-shoulders crop centred on the face.
// The box is expressed as fractions of the original frame so it survives re-exports.
const portraitSrc = path.join(root, 'assets-src', 'portrait.jpg')
if (fs.existsSync(portraitSrc)) {
  const outDir = path.join(pub, 'profile')
  fs.mkdirSync(outDir, { recursive: true })
  const img = sharp(portraitSrc).rotate()
  const { width, height } = await img.metadata()
  const box = { left: 0.0853, top: 0.075, width: 0.8532 } // width fraction; height follows 4:5
  const w = Math.round(width * box.width)
  const h = Math.min(Math.round((w * 5) / 4), height - Math.round(height * box.top))
  const region = { left: Math.round(width * box.left), top: Math.round(height * box.top), width: w, height: h }
  for (const size of [640, 1280]) {
    const out = path.join(outDir, `portrait-${size}.webp`)
    if (!isStale(portraitSrc, out)) continue
    await sharp(portraitSrc).rotate().extract(region).resize({ width: size }).webp({ quality: 80 }).toFile(out)
    made++
  }
}

console.log(made ? `media: generated ${made} file(s)` : 'media: up to date')
