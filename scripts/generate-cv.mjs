// Builds public/research/cv-en.pdf and cv-it.pdf from src/siteContent.js.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import pdfMake from 'pdfmake/build/pdfmake.js'
import pdfFonts from 'pdfmake/build/vfs_fonts.js'
import { CONTENT, CONFIG, LINKS, PUBLICATIONS, PROFILE } from '../src/siteContent.js'
import { buildCvDocDefinition } from '../src/lib/cvPdfTemplate.js'

pdfMake.vfs = pdfFonts.pdfMake?.vfs ?? pdfFonts

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, '..', 'public', 'research')
fs.mkdirSync(outDir, { recursive: true })

const only = process.argv.includes('--it') ? ['it'] : process.argv.includes('--en') ? ['en'] : ['en', 'it']

for (const lang of only) {
  const doc = buildCvDocDefinition({
    t: CONTENT[lang],
    links: LINKS,
    config: CONFIG,
    publications: PUBLICATIONS,
    profile: PROFILE
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
