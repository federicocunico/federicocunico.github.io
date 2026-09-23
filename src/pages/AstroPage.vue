<script setup>
import { ref, computed } from 'vue'
import { useLang } from '../composables/useLang'
import { ASTRO } from '../siteContent'
import { astroFull, astroThumb } from '../lib/media'
import PageHead from '../components/PageHead.vue'
import LightboxViewer from '../components/LightboxViewer.vue'
import AppIcon from '../components/AppIcon.vue'

const { t } = useLang()

const filter = ref('all')
const open = ref(-1)

const totalHours = ASTRO.reduce((sum, a) => sum + (a.integration || 0), 0)
const latest = [...ASTRO].sort((a, b) => b.date.localeCompare(a.date))[0]

const groups = ['all', 'nebula', 'cluster', 'galaxy']
const filters = computed(() =>
  groups
    .map((key) => ({ key, label: t.value.filters[key], n: key === 'all' ? ASTRO.length : ASTRO.filter((a) => a.group === key).length }))
    .filter((f) => f.n > 0)
)

const visible = computed(() => (filter.value === 'all' ? ASTRO : ASTRO.filter((a) => a.group === filter.value)))

const slides = computed(() =>
  visible.value.map((a) => ({
    thumb: astroThumb(a.file),
    full: astroFull(a.file),
    title: a.title,
    kicker: a.catalog,
    rows: [
      [t.value.field.type, t.value.types[a.type]],
      [t.value.field.date, a.date],
      [t.value.field.integration, `${a.integration} h`],
      [t.value.field.equipment, a.equipment]
    ]
  }))
)

function openLatest() {
  filter.value = 'all'
  open.value = ASTRO.indexOf(latest)
}
</script>

<template>
  <PageHead index="02 / 05" :meta="t.astroStats(ASTRO.length, totalHours)" :title="t.astroTitle">
    <p class="lead">{{ t.astroText }}</p>
  </PageHead>

  <section v-if="latest" class="feature grid12 rise-3">
    <button class="feature-img tile" @click="openLatest">
      <img :src="astroFull(latest.file)" :alt="latest.title" fetchpriority="high" />
      <span class="badge">{{ t.astroLatest }}</span>
    </button>
    <div class="feature-info">
      <div class="stack">
        <span class="mono">{{ latest.catalog }}</span>
        <h2 class="feature-title">{{ latest.title }}</h2>
      </div>
      <dl class="data">
        <dt class="mono">{{ t.field.type }}</dt><dd>{{ t.types[latest.type] }}</dd>
        <dt class="mono">{{ t.field.date }}</dt><dd>{{ latest.date }}</dd>
        <dt class="mono">{{ t.field.integration }}</dt><dd>{{ latest.integration }} h</dd>
        <dt class="mono">{{ t.field.equipment }}</dt><dd>{{ latest.equipment }}</dd>
      </dl>
      <button class="btn btn-solid open" @click="openLatest">{{ t.astroOpen }} <AppIcon name="expand" /></button>
    </div>
  </section>

  <section class="gallery">
    <div class="toolbar">
      <div class="chips">
        <button v-for="f in filters" :key="f.key" class="chip" :aria-pressed="filter === f.key" @click="filter = f.key">
          {{ f.label }}<span class="count">{{ String(f.n).padStart(2, '0') }}</span>
        </button>
      </div>
      <span class="mono hint">{{ t.astroHint }}</span>
    </div>

    <div class="grid">
      <button v-for="(a, i) in visible" :key="a.file" class="tile item" @click="open = i">
        <span class="thumb"><img :src="astroThumb(a.file)" :alt="a.title" loading="lazy" decoding="async" /></span>
        <span class="caption"><span class="cap-title">{{ a.title }}</span><span class="mono">{{ a.catalog }}</span></span>
        <span class="mono meta">{{ a.date }} · {{ a.integration }} h · {{ a.equipment.split(' · ')[0] }}</span>
      </button>
    </div>
  </section>

  <LightboxViewer v-model:index="open" :items="slides" />
</template>

<style scoped>
.feature { padding-bottom: 72px; }
.feature-img { grid-column: 1 / span 8; height: 560px; position: relative; overflow: hidden; background: #0B0B0C; cursor: zoom-in; }
.feature-img img { width: 100%; height: 100%; object-fit: cover; }
.badge { position: absolute; left: 16px; top: 16px; font-family: var(--mono); font-size: 12px; color: #FFFFFF; background: rgba(0, 0, 0, .45); padding: 4px 8px; }
.feature-info { grid-column: 9 / span 4; display: flex; flex-direction: column; justify-content: space-between; gap: 24px; }
.stack { display: flex; flex-direction: column; gap: 8px; }
.feature-title { font-size: 40px; font-weight: 500; letter-spacing: -0.03em; line-height: 1.05; }
.data { display: grid; grid-template-columns: 120px minmax(0, 1fr); border-bottom: 1px solid var(--rule); }
.data dt, .data dd { padding: 12px 0; border-top: 1px solid var(--rule); }
.data dd { font-family: var(--mono); font-size: 14px; }
.open { justify-content: space-between; }

.tile img { transition: transform .5s cubic-bezier(.2, .7, .2, 1); }
.tile:hover img { transform: scale(1.035); }

.gallery { padding-bottom: 120px; }
.toolbar { display: flex; justify-content: space-between; align-items: center; gap: 16px; padding: 12px 0; border-top: 1px solid var(--ink); margin-bottom: 24px; }
.chips { display: flex; gap: 8px; overflow-x: auto; scrollbar-width: none; }
.chips::-webkit-scrollbar { display: none; }

.grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: var(--gap); }
.item { display: flex; flex-direction: column; gap: 10px; cursor: zoom-in; }
.thumb { display: block; width: 100%; aspect-ratio: 4 / 5; overflow: hidden; background: #0B0B0C; }
.thumb img { width: 100%; height: 100%; object-fit: cover; }
.caption { display: flex; justify-content: space-between; gap: 8px; }
.cap-title { font-size: 17px; font-weight: 500; }
.meta { margin-top: -6px; }

@media (max-width: 1024px) {
  .feature-img { grid-column: 1 / -1; height: 420px; }
  .feature-info { grid-column: 1 / -1; }
  .grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .hint { display: none; }
}

@media (max-width: 720px) {
  .feature { padding-bottom: 32px; row-gap: 16px; }
  .feature-img { height: 280px; margin-inline: calc(var(--gutter) * -1); }
  .feature-title { font-size: 28px; }
  .data { grid-template-columns: 104px minmax(0, 1fr); }
  .data dt, .data dd { padding: 9px 0; }
  .gallery { padding-bottom: 48px; }
  .toolbar { margin-inline: calc(var(--gutter) * -1); padding-inline: var(--gutter); margin-bottom: 12px; }
  .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px 10px; }
  .item { gap: 6px; }
  .cap-title { font-size: 16px; }
  .caption .mono { display: none; }
  .meta { margin-top: -4px; font-size: 12px; }
}
</style>
