import { CONTENT, CONFIG, LINKS, PUBLICATIONS, PROFILE } from '../siteContent'
import { buildCvDocDefinition } from './cvPdfTemplate'
import { getPdfMake } from './pdfMakeSetup'

export async function downloadCvPdf(lang = 'en') {
  const pdfMake = await getPdfMake()
  const t = CONTENT[lang] ?? CONTENT.en
  const doc = buildCvDocDefinition({
    t,
    links: LINKS,
    config: CONFIG,
    publications: PUBLICATIONS,
    profile: PROFILE
  })

  const filename = `Federico_Cunico_CV_${lang}.pdf`
  return pdfMake.createPdf(doc).download(filename)
}

export async function getCvPdfBlob(lang = 'en') {
  const pdfMake = await getPdfMake()
  const t = CONTENT[lang] ?? CONTENT.en
  const doc = buildCvDocDefinition({
    t,
    links: LINKS,
    config: CONFIG,
    publications: PUBLICATIONS,
    profile: PROFILE
  })

  return new Promise((resolve, reject) => {
    pdfMake.createPdf(doc).getBlob((blob) => {
      if (blob) resolve(blob)
      else reject(new Error('Failed to generate CV PDF'))
    })
  })
}
