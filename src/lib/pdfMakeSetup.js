let pdfMakeInstance = null

export async function getPdfMake() {
  if (pdfMakeInstance) return pdfMakeInstance

  const pdfMakeModule = await import('pdfmake/build/pdfmake')
  const pdfFontsModule = await import('pdfmake/build/vfs_fonts')

  const pdfMake = pdfMakeModule.default ?? pdfMakeModule
  const pdfFonts = pdfFontsModule.default ?? pdfFontsModule

  pdfMake.vfs = pdfFonts.pdfMake?.vfs ?? pdfFonts
  pdfMakeInstance = pdfMake
  return pdfMakeInstance
}
