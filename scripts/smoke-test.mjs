// Smoke test for the production build: serves dist/ and checks that every
// page, every media file referenced in siteContent.js and the generated
// files respond, and that the IT and EN texts have the same keys.
// Run after `npm run build` (make test does both).
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { preview } from 'vite'
import { CONTENT, CONFIG, ASTRO, PHOTOGRAPHY, MUSIC } from '../src/siteContent.js'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const failures = []
const fail = (msg) => failures.push(msg)

if (!fs.existsSync(path.join(dist, 'index.html'))) {
  console.error('dist/ not found: run `npm run build` first (or `make test`).')
  process.exit(1)
}
if (!fs.existsSync(path.join(dist, '404.html'))) fail('dist/404.html missing (deep links would break on GitHub Pages)')

// Same keys in both languages
function keys(obj, prefix = '') {
  return Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === 'object' && !Array.isArray(v) ? keys(v, `${prefix}${k}.`) : [`${prefix}${k}`]
  )
}
const en = new Set(keys(CONTENT.en))
const it = new Set(keys(CONTENT.it))
for (const k of en) if (!it.has(k)) fail(`CONTENT.it is missing "${k}"`)
for (const k of it) if (!en.has(k)) fail(`CONTENT.en is missing "${k}"`)

const toWebp = (f) => f.replace(/\.[^.]+$/, '.webp')
const pages = ['/', '/research', '/astrophotography', '/photography', '/music', '/cv']
const files = [
  CONFIG.portrait.small,
  CONFIG.portrait.large,
  CONFIG.cvPdf.en,
  CONFIG.cvPdf.it,
  ...ASTRO.flatMap((a) => [`/astro/full/${a.file}`, `/astro/thumbs/${toWebp(a.file)}`]),
  ...PHOTOGRAPHY.flatMap((s) => (s.items || []).flatMap((p) => [`/photography/${s.id}/full/${p.file}`, `/photography/${s.id}/thumbs/${toWebp(p.file)}`])),
  ...MUSIC.flatMap((album) => album.tracks.map((t) => `/music/${album.id}/${t.file}`))
]

const server = await preview({ root, logLevel: 'silent', preview: { port: 4174, strictPort: false, open: false } })
const base = server.resolvedUrls.local[0].replace(/\/$/, '')

try {
  for (const page of pages) {
    const res = await fetch(base + page)
    const html = await res.text()
    if (!res.ok || !html.includes('id="app"')) fail(`page ${page} → ${res.status}`)
  }
  for (const file of files) {
    // Vite preview answers unknown paths with index.html, so check the type too.
    const res = await fetch(base + file, { method: 'HEAD' })
    const type = res.headers.get('content-type') || ''
    if (!res.ok || type.includes('text/html')) fail(`missing file ${file}`)
  }
} finally {
  await new Promise((resolve) => server.httpServer.close(resolve))
}

const checked = pages.length + files.length
if (failures.length) {
  console.error(`✗ ${failures.length} problem(s) out of ${checked} URLs and ${en.size} text keys:`)
  for (const f of failures) console.error('  - ' + f)
  process.exit(1)
}
console.log(`✓ ${pages.length} pages, ${files.length} files and ${en.size} IT/EN text keys OK`)
