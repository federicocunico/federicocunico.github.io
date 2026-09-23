<script setup>
import { ref, computed } from 'vue'
import { useLang } from '../composables/useLang'
import { PHOTOGRAPHY } from '../siteContent'
import { photoFull, photoThumb } from '../lib/media'
import PageHead from '../components/PageHead.vue'
import LightboxViewer from '../components/LightboxViewer.vue'

const { lang, t } = useLang()

const series = ref('all')
const open = ref(-1)

const all = PHOTOGRAPHY.flatMap((s) => (s.items || []).map((item) => ({ ...item, series: s.id })))
const visible = computed(() => (series.value === 'all' ? all : all.filter((p) => p.series === series.value)))

const meta = computed(() =>
  all.length ? t.value.photoMeta(PHOTOGRAPHY.length, all.length) : ''
)

// Editorial rhythm: a wide frame, a tall one, then rows of three.
function span(i) {
  const k = i % 5
  if (k === 0) return 'wide'
  if (k === 1) return 'tall'
  return 'third'
}

const slides = computed(() =>
  visible.value.map((p) => ({
    thumb: photoThumb(p.series, p.file),
    full: photoFull(p.series, p.file),
    title: p.title || '',
    kicker: [p.place, p.year].filter(Boolean).join(' · '),
    rows: [
      p.place && [t.value.field.place, p.place],
      p.year && [t.value.field.year, p.year]
    ].filter(Boolean)
  }))
)

const titleOf = (s) => (typeof s.title === 'object' ? s.title[lang.value] : s.title)
</script>

<template>
  <PageHead index="03 / 05" :meta="meta" :title="t.photoTitle">
    <p class="lead">{{ t.photoText }}</p>
  </PageHead>

  <section class="gallery">
    <div v-if="PHOTOGRAPHY.length > 1" class="toolbar">
      <button class="chip" :aria-pressed="series === 'all'" @click="series = 'all'">{{ t.photoAll }}</button>
      <button v-for="s in PHOTOGRAPHY" :key="s.id" class="chip" :aria-pressed="series === s.id" @click="series = s.id">
        {{ titleOf(s) }}<span class="count">{{ String(s.items.length).padStart(2, '0') }}</span>
      </button>
    </div>

    <div v-if="visible.length" class="grid">
      <button v-for="(p, i) in visible" :key="p.series + p.file" class="item" :class="span(i)" @click="open = i">
        <span class="thumb"><img :src="photoThumb(p.series, p.file)" :alt="p.title || ''" loading="lazy" decoding="async" /></span>
        <span v-if="p.title || p.place" class="caption">
          <span class="cap-title">{{ p.title }}</span>
          <span class="mono">{{ [p.place, p.year].filter(Boolean).join(' · ') }}</span>
        </span>
      </button>
    </div>

    <div v-else class="empty">
      <div class="placeholder frame wide" />
      <div class="placeholder frame tall" />
      <p class="empty-text">{{ t.photoEmpty }}</p>
    </div>
  </section>

  <LightboxViewer v-model:index="open" :items="slides" />
</template>

<style scoped>
.gallery { padding-bottom: 120px; }
.toolbar { display: flex; gap: 8px; padding: 12px 0; border-top: 1px solid var(--ink); margin-bottom: 24px; overflow-x: auto; scrollbar-width: none; }

.grid { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: var(--gap); border-top: 1px solid var(--ink); padding-top: 24px; }
.toolbar + .grid { border-top: 0; padding-top: 0; }
.item { display: flex; flex-direction: column; gap: 10px; cursor: zoom-in; }
.item.wide { grid-column: span 7; }
.item.tall { grid-column: span 5; }
.item.third { grid-column: span 4; }
.thumb { display: block; overflow: hidden; background: var(--surface); }
.wide .thumb { aspect-ratio: 3 / 2; }
.tall .thumb, .third .thumb { aspect-ratio: 4 / 5; }
.thumb img { width: 100%; height: 100%; object-fit: cover; transition: transform .5s cubic-bezier(.2, .7, .2, 1); }
.item:hover img { transform: scale(1.03); }
.caption { display: flex; justify-content: space-between; gap: 8px; }
.cap-title { font-size: 17px; font-weight: 500; }

.empty { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: var(--gap); border-top: 1px solid var(--ink); padding-top: 24px; }
.frame.wide { grid-column: span 7; aspect-ratio: 3 / 2; }
.frame.tall { grid-column: span 5; aspect-ratio: 3 / 2; }
.empty-text { grid-column: 1 / span 6; font-size: 17px; color: var(--soft); }

@media (max-width: 720px) {
  .gallery { padding-bottom: 48px; }
  .grid, .empty { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px 10px; padding-top: 12px; }
  .item.wide, .frame.wide, .empty-text { grid-column: 1 / -1; }
  .item.tall, .item.third, .frame.tall { grid-column: span 1; }
  .frame.tall { aspect-ratio: 4 / 5; }
  .caption .mono { display: none; }
}
</style>
