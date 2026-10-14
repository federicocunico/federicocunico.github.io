// Builds public/research/cv-en.pdf and cv-it.pdf from src/siteContent.js.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import pdfMake from 'pdfmake/build/pdfmake.js'
import pdfFonts from 'pdfmake/build/vfs_fonts.js'
import { CONTENT, CONFIG, LINKS, PUBLICATIONS, PROFILE } from '../src/siteContent.js'
import { buildCvDocDefinition, CV_FONT } from '../src/lib/cvPdfTemplate.js'

import { createRequire } from 'node:module'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, '..', 'public', 'research')
fs.mkdirSync(outDir, { recursive: true })

// Fonts: the site's Instrument Sans (from @fontsource) next to pdfmake's bundled Roboto.
const vfs = { ...(pdfFonts.pdfMake?.vfs ?? pdfFonts) }
const fontDir = path.join(path.dirname(createRequire(import.meta.url).resolve('@fontsource/instrument-sans/package.json')), 'files')
const font = (weight, style) => {
  const name = `instrument-sans-latin-${weight}-${style}.woff`
  vfs[name] = fs.readFileSync(path.join(fontDir, name)).toString('base64')
  return name
}
const fonts = {
  Roboto: { normal: 'Roboto-Regular.ttf', bold: 'Roboto-Medium.ttf', italics: 'Roboto-Italic.ttf', bolditalics: 'Roboto-MediumItalic.ttf' },
  [CV_FONT]: { normal: font(400, 'normal'), bold: font(600, 'normal'), italics: font(400, 'italic'), bolditalics: font(600, 'italic') }
}

// Head-and-shoulders crop of the portrait (5:6), embedded as a JPEG data URL.
async function portrait() {
  const src = path.join(__dirname, '..', 'assets-src', 'portrait.jpg')
  if (!fs.existsSync(src)) return null
  const { width, height } = await sharp(src).rotate().metadata()
  const w = Math.round(width * 0.72)
  const h = Math.min(Math.round((w * 6) / 5), height - Math.round(height * 0.06))
  const region = { left: Math.round((width - w) / 2), top: Math.round(height * 0.06), width: w, height: h }
  const jpg = await sharp(src).rotate().extract(region).resize({ width: 500 }).jpeg({ quality: 85 }).toBuffer()
  return `data:image/jpeg;base64,${jpg.toString('base64')}`
}

const photo = await portrait()

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
    pdfMake.createPdf(doc, null, fonts, vfs).getBuffer((buffer) => {
      fs.writeFileSync(outFile, buffer)
      console.log(`Generated ${path.relative(process.cwd(), outFile)} (${lang.toUpperCase()})`)
      resolve()
    })
  })
}
