import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import pdfMake from 'pdfmake/build/pdfmake.js'
import pdfFonts from 'pdfmake/build/vfs_fonts.js'
import { CONTENT, CONFIG, LINKS, PUBLICATIONS, PROFILE } from '../src/siteContent.js'
import { buildCvDocDefinition } from '../src/lib/cvPdfTemplate.js'

pdfMake.vfs = pdfFonts.pdfMake?.vfs ?? pdfFonts

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, '..', 'public', 'assets')
const outFile = path.join(outDir, 'cv.pdf')

const lang = process.argv.includes('--it') ? 'it' : 'en'
const t = CONTENT[lang]

const doc = buildCvDocDefinition({
  t,
  links: LINKS,
  config: CONFIG,
  publications: PUBLICATIONS,
  profile: PROFILE
})

fs.mkdirSync(outDir, { recursive: true })

pdfMake.createPdf(doc).getBuffer((buffer) => {
  fs.writeFileSync(outFile, buffer)
  console.log(`Generated ${outFile} (${lang.toUpperCase()})`)
})
