// Builds public/research/cv-en.pdf and cv-it.pdf from src/siteContent.js.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import pdfMake from 'pdfmake/build/pdfmake.js'
import pdfFonts from 'pdfmake/build/vfs_fonts.js'
import { CONTENT, CONFIG, LINKS, PUBLICATIONS, PROFILE } from '../src/siteContent.js'
import { buildCvDocDefinition } from '../src/lib/cvPdfTemplate.js'

pdfMake.vfs = pdfFonts.pdfMake?.vfs ?? pdfFonts

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, '..', 'public', 'research')
fs.mkdirSync(outDir, { recursive: true })

// Round head-and-shoulders crop of the portrait, embedded as a PNG data URL.
async function roundPortrait() {
  const src = path.join(__dirname, '..', 'assets-src', 'portrait.jpg')
  if (!fs.existsSync(src)) return null
  const { width, height } = await sharp(src).rotate().metadata()
  const side = Math.round(Math.min(width, height) * 0.62)
  const region = { left: Math.round((width - side) / 2), top: Math.round(height * 0.1), width: side, height: side }
  const size = 400
  const mask = Buffer.from(`<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}"/></svg>`)
  const png = await sharp(src).rotate().extract(region).resize(size, size).composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer()
  return `data:image/png;base64,${png.toString('base64')}`
}

const photo = await roundPortrait()

const only = process.argv.includes('--it') ? ['it'] : process.argv.includes('--en') ? ['en'] : ['en', 'it']

for (const lang of only) {
  const doc = buildCvDocDefinition({
    t: CONTENT[lang],
    links: LINKS,
    config: CONFIG,
    publications: PUBLICATIONS,
    profile: PROFILE,
    photo
  })
  const outFile = path.join(outDir, `cv-${lang}.pdf`)
  await new Promise((resolve) => {
    pdfMake.createPdf(doc).getBuffer((buffer) => {
      fs.writeFileSync(outFile, buffer)
      console.log(`Generated ${path.relative(process.cwd(), outFile)} (${lang.toUpperCase()})`)
      resolve()
    })
  })
}
