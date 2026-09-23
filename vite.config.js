import fs from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// GitHub Pages serves 404.html for unknown paths: a copy of index.html lets
// the router handle deep links such as /astrophotography.
function spaFallback() {
  let outDir
  return {
    name: 'spa-fallback-404',
    apply: 'build',
    configResolved(config) { outDir = path.resolve(config.root, config.build.outDir) },
    closeBundle() { fs.copyFileSync(path.join(outDir, 'index.html'), path.join(outDir, '404.html')) }
  }
}

export default defineConfig({
  plugins: [vue(), spaFallback()],
  define: { __BUILD_DATE__: JSON.stringify(new Date().toISOString().slice(0, 10)) },
  base: '/'
})
