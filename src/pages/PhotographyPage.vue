<script setup>
import { ref, computed } from 'vue'
import { useLang } from '../composables/useLang'
import { PHOTOGRAPHY } from '../siteContent'
import { photoFull, photoThumb, photoSrcset } from '../lib/media'
import { markLandscape } from '../lib/galleryImg'
import { layoutByOrientation, slotKind } from '../lib/layoutByOrientation'
import { osmLink, osmEmbed } from '../lib/maps'
import PageHead from '../components/PageHead.vue'
import LightboxViewer from '../components/LightboxViewer.vue'
import AppIcon from '../components/AppIcon.vue'

const { lang, t } = useLang()

const series = ref('all')
const open = ref(-1)

const pool = computed(() =>
  PHOTOGRAPHY.flatMap((s) => (s.items || []).map((item) => ({ ...item, series: s.id })))
)

const all = computed(() =>
  series.value === 'all' ? layoutByOrientation(pool.value) : layoutByOrientation(pool.value.filter((p) => p.series === series.value))
)

const visible = all

const meta = computed(() =>
  pool.value.length ? t.value.photoMeta(PHOTOGRAPHY.length, pool.value.length) : ''
)

const slides = computed(() =>
  visible.value.map((p) => {
    const rows = [
      p.date && [t.value.field.date, p.date],
      !p.date && p.year && [t.value.field.year, p.year],
      p.camera && [t.value.field.camera, p.camera],
      p.lens && [t.value.field.lens, p.lens],
      p.focalLength && [t.value.field.focalLength, p.focalLength],
      p.aperture && [t.value.field.aperture, p.aperture],
      p.exposure && [t.value.field.exposure, p.exposure],
      p.iso && [t.value.field.iso, p.iso]
    ].filter(Boolean)
    return {
      thumb: photoThumb(p.series, p.file),
      full: photoFull(p.series, p.file),
      title: p.title || '',
      kicker: '',
      place: p.place || '',
      mapUrl: osmLink(p.lat, p.lon),
      mapEmbed: osmEmbed(p.lat, p.lon),
      rows
    }
  })
)

const titleOf = (s) => (typeof s.title === 'object' ? s.title[lang.value] : s.title)

function sizesFor(i) {
  const k = slotKind(i)
  if (k === 'wide') return '(max-width: 720px) 100vw, 58vw'
  if (k === 'tall') return '(max-width: 720px) 50vw, 42vw'
  return '(max-width: 720px) 50vw, 33vw'
}
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
      <button v-for="(p, i) in visible" :key="p.series + p.file" class="item" :class="slotKind(i)" @click="open = i">
        <span class="thumb">
          <img
            :src="photoThumb(p.series, p.file)"
            :srcset="photoSrcset(p.series, p.file)"
            :sizes="sizesFor(i)"
            :alt="p.title || p.place || ''"
            loading="lazy"
            decoding="async"
            @load="markLandscape"
          />
          <span v-if="p.place" class="hover-place" @click.stop>
            <span class="place-name">{{ p.place }}</span>
            <a
              v-if="osmLink(p.lat, p.lon)"
              class="place-pin"
              :href="osmLink(p.lat, p.lon)"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="t.openMap"
              @click.stop
            >
              <AppIcon name="pin" :size="16" />
            </a>
          </span>
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
.thumb { display: block; position: relative; overflow: hidden; background: var(--surface); }
.wide .thumb { aspect-ratio: 3 / 2; }
.tall .thumb, .third .thumb { aspect-ratio: 4 / 5; }
.thumb img { width: 100%; height: 100%; object-fit: cover; object-position: center; transition: transform .5s cubic-bezier(.2, .7, .2, 1); }
.item:hover img { transform: scale(1.03); }
/* Landscape photos in portrait tiles: slow R→L pan so the crop is obvious. */
.tall .thumb img.is-landscape,
.third .thumb img.is-landscape {
  animation: pan-x 28s ease-in-out infinite alternate;
}
@keyframes pan-x {
  from { object-position: 100% 50%; }
  to { object-position: 0% 50%; }
}
@media (prefers-reduced-motion: reduce) {
  .tall .thumb img.is-landscape,
  .third .thumb img.is-landscape { animation: none; }
}

.hover-place {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 12px 14px;
  background: linear-gradient(transparent, rgba(10, 10, 11, 0.72));
  color: #EDEDEA;
  opacity: 0;
  transform: translateY(6px);
  transition: opacity .25s ease, transform .25s ease;
  pointer-events: none;
}
.item:hover .hover-place,
.item:focus-within .hover-place {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}
.place-name { font-size: 15px; font-weight: 500; text-align: left; }
.place-pin {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
  color: #EDEDEA;
  flex-shrink: 0;
}
.place-pin:hover { background: rgba(255, 255, 255, 0.28); }

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
  .hover-place { opacity: 1; transform: none; pointer-events: auto; padding: 10px 12px; }
  .place-name { font-size: 13px; }
}
</style>
