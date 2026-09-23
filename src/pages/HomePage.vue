<script setup>
import { computed } from 'vue'
import { useLang } from '../composables/useLang'
import { CONFIG, ASTRO, PHOTOGRAPHY, MUSIC } from '../siteContent'
import { astroThumb, photoThumb } from '../lib/media'
import AppIcon from '../components/AppIcon.vue'

const { t } = useLang()

const astroPreview = ['NGC2024-FlameNebula.jpg', 'M1-Crab.jpg', 'RosettaNebula.jpg']
  .map((f) => ASTRO.find((a) => a.file === f))
  .filter(Boolean)
  .map((a) => ({ src: astroThumb(a.file), alt: a.title }))

const photoPreview = computed(() => {
  const series = PHOTOGRAPHY.find((s) => s.items && s.items.length)
  return series ? { src: photoThumb(series.id, series.items[0].file), alt: series.items[0].title || '' } : null
})

const album = MUSIC[0]
</script>

<template>
  <section class="hero grid12">
    <div class="kicker mono rule-top rise"><span>{{ t.homeKicker }} — {{ new Date().getFullYear() }}</span><span>Verona, IT<span class="coords"> · 45.44° N 10.99° E</span></span></div>

    <div class="intro">
      <h1 class="name rise-2">Federico<br />Cunico</h1>
      <p class="statement rise-3">{{ t.homeIntro }}</p>
      <div class="facts rise-3">
        <div class="fact"><span class="mono">{{ t.homeRoleLabel }}</span><span>{{ t.homeRole }}</span></div>
        <div class="fact"><span class="mono">{{ t.homeEduLabel }}</span><span>{{ t.homeEdu }}</span></div>
        <div class="fact"><span class="mono">{{ t.homeStatusLabel }}</span><span class="status"><span class="pulse" />{{ t.openTo }}</span></div>
      </div>
    </div>

    <figure class="portrait rise-3">
      <img
        :src="CONFIG.portrait.small"
        :srcset="`${CONFIG.portrait.small} 640w, ${CONFIG.portrait.large} 1280w`"
        sizes="(max-width: 720px) 100vw, 34vw"
        width="640"
        height="800"
        alt="Federico Cunico"
        fetchpriority="high"
      />
      <figcaption class="mono"><span>{{ t.portraitCaption }}</span><span>F. Cunico, PhD</span></figcaption>
    </figure>
  </section>

  <section class="index">
    <div class="index-head mono"><span>{{ t.indexHead.n }}</span><span>{{ t.indexHead.section }}</span><span>{{ t.indexHead.content }}</span><span>{{ t.indexHead.preview }}</span><span /></div>

    <RouterLink to="/cv" class="row">
      <span class="mono num">01</span>
      <span class="label">{{ t.nav.cv }}</span>
      <span class="desc">{{ t.indexCv }}</span>
      <span class="preview doc">
        <span class="doc-lines"><span /><span /><span /><span /></span>
        <span class="mono">PDF · IT / EN</span>
      </span>
      <span class="arr"><AppIcon name="arrow" :size="22" /></span>
    </RouterLink>

    <RouterLink to="/research" class="row">
      <span class="mono num">02</span>
      <span class="label">{{ t.nav.research }}</span>
      <span class="desc">{{ t.indexResearch }}</span>
      <span class="preview venues"><span class="mono">{{ t.indexVenues }}</span><span class="venue-list">ECCV<br />ICPR · ICIAP</span></span>
      <span class="arr"><AppIcon name="arrow" :size="22" /></span>
    </RouterLink>

    <RouterLink to="/photography" class="row">
      <span class="mono num">03</span>
      <span class="label">{{ t.nav.photo }}</span>
      <span class="desc">{{ t.indexPhoto }}</span>
      <span v-if="photoPreview" class="preview single"><img :src="photoPreview.src" :alt="photoPreview.alt" loading="lazy" /></span>
      <span v-else class="preview placeholder" />
      <span class="arr"><AppIcon name="arrow" :size="22" /></span>
    </RouterLink>

    <RouterLink to="/astrophotography" class="row">
      <span class="mono num">04</span>
      <span class="label">{{ t.nav.astro }}</span>
      <span class="desc">{{ t.indexAstro }}</span>
      <span class="preview strip">
        <img v-for="p in astroPreview" :key="p.src" :src="p.src" :alt="p.alt" loading="lazy" />
      </span>
      <span class="arr"><AppIcon name="arrow" :size="22" /></span>
    </RouterLink>

    <RouterLink to="/music" class="row">
      <span class="mono num">05</span>
      <span class="label">{{ t.nav.music }}</span>
      <span class="desc">{{ t.indexMusic }}</span>
      <span class="preview record">
        <span class="record-span">{{ album.span }}</span>
        <span class="record-foot"><span class="record-title">{{ album.title }}</span><span class="dot" /></span>
      </span>
      <span class="arr"><AppIcon name="arrow" :size="22" /></span>
    </RouterLink>
  </section>
</template>

<style scoped>
.hero { padding: 96px 0 72px; }
.kicker { grid-column: 1 / -1; display: flex; justify-content: space-between; gap: 16px; white-space: nowrap; }

.intro { grid-column: 1 / span 8; margin-top: 40px; display: flex; flex-direction: column; justify-content: space-between; gap: 48px; }
.name { font-size: clamp(60px, 9.4vw, 136px); line-height: 0.92; font-weight: 500; letter-spacing: -0.045em; }
.statement { max-width: 620px; font-size: clamp(19px, 1.8vw, 26px); line-height: 1.3; letter-spacing: -0.015em; text-wrap: pretty; }
.facts { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: var(--gap); }
.fact { display: flex; flex-direction: column; gap: 6px; border-top: 1px solid var(--rule); padding-top: 12px; font-size: 17px; line-height: 1.4; }
.status { display: flex; align-items: center; gap: 8px; }
.pulse { width: 7px; height: 7px; border-radius: 50%; background: var(--ok); flex-shrink: 0; box-shadow: 0 0 0 3px color-mix(in srgb, var(--ok) 18%, transparent); }

.portrait { grid-column: 9 / span 4; margin-top: 40px; display: flex; flex-direction: column; gap: 10px; }
.portrait img { width: 100%; height: auto; aspect-ratio: 4 / 5; object-fit: cover; background: var(--surface); }
.portrait figcaption { display: flex; justify-content: space-between; }

.index { padding-bottom: 120px; }
.index-head, .row { display: grid; grid-template-columns: 96px minmax(0, 1fr) minmax(0, 1fr) 220px 40px; gap: var(--gap); }
.index-head { padding: 12px 0; border-bottom: 1px solid var(--ink); }
.row { align-items: center; padding: 28px 0; border-bottom: 1px solid var(--rule); transition: background .2s; }
.row:hover { background: var(--surface); color: var(--ink); }
.num { font-size: 14px; }
.label { font-size: clamp(30px, 3.1vw, 44px); font-weight: 500; letter-spacing: -0.03em; line-height: 1.05; }
.desc { font-size: 17px; line-height: 1.5; color: var(--soft); max-width: 420px; }
.arr { display: flex; justify-content: flex-end; transition: transform .2s, color .2s; }
.row:hover .arr { color: var(--accent); transform: translate(3px, -3px); }

.preview { height: 120px; overflow: hidden; }
.venues { border: 1px solid var(--rule); background: var(--bg); padding: 12px; display: flex; flex-direction: column; justify-content: space-between; }
.venue-list { font-size: 22px; font-weight: 500; letter-spacing: -0.02em; line-height: 1.15; }
.strip { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 4px; }
.strip img, .single img { width: 100%; height: 100%; object-fit: cover; }
.record { background: #111113; color: #F4F4F2; padding: 12px; display: flex; flex-direction: column; justify-content: space-between; }
.record-span { font-family: var(--mono); font-size: 12px; opacity: .6; }
.record-foot { display: flex; justify-content: space-between; align-items: flex-end; }
.record-title { font-size: 28px; font-weight: 600; letter-spacing: -0.03em; }
.dot { width: 10px; height: 10px; background: var(--accent); }
.doc { border: 1px solid var(--rule); background: var(--bg); padding: 14px 12px 10px; display: flex; flex-direction: column; justify-content: space-between; }
.doc-lines { display: flex; flex-direction: column; gap: 7px; }
.doc-lines span { height: 2px; background: var(--rule); }
.doc-lines span:first-child { width: 55%; height: 6px; background: var(--ink); }
.doc-lines span:nth-child(3) { width: 80%; }
.doc-lines span:nth-child(4) { width: 64%; }

@media (max-width: 1024px) {
  .intro { grid-column: 1 / span 7; }
  .portrait { grid-column: 8 / span 5; }
  .facts { grid-template-columns: 1fr; gap: 12px; }
  .index-head, .row { grid-template-columns: 64px minmax(0, 1fr) 180px 32px; }
  .index-head span:nth-child(3), .desc { display: none; }
}

@media (max-width: 720px) {
  .hero { padding: 40px 0 32px; row-gap: 24px; }
  .coords { display: none; }
  .intro { display: contents; }
  .name, .portrait, .statement, .facts { grid-column: 1 / -1; margin-top: 0; }
  .name { order: 1; }
  .portrait { order: 2; }
  .statement { order: 3; }
  .facts { order: 4; }
  .index { padding-bottom: 48px; }
  .index-head { display: none; }
  .row { grid-template-columns: 28px minmax(0, 1fr) 20px; gap: 12px; padding: 20px 0; }
  .index .row:first-of-type { border-top: 1px solid var(--ink); }
  .num { grid-column: 1; grid-row: 1; }
  .label { grid-column: 2; grid-row: 1; font-size: 26px; }
  .desc { display: block; grid-column: 2; grid-row: 2; font-size: 16px; margin-top: -8px; }
  .preview { display: none; }
  .strip { display: grid; grid-column: 1 / -1; grid-row: 3; height: 96px; }
  .arr { grid-column: 3; grid-row: 1; }
}
</style>
