<script setup>
import { computed } from 'vue'
import { useLang } from '../composables/useLang'
import { usePlayer, formatTime } from '../composables/usePlayer'
import { MUSIC } from '../siteContent'
import PageHead from '../components/PageHead.vue'
import AppIcon from '../components/AppIcon.vue'

const { lang, t } = useLang()
const { state, play, toggle } = usePlayer()

const album = MUSIC[0]
const hasTracks = album.tracks.length > 0
const isThisAlbum = computed(() => state.album === album)
const albumPlaying = computed(() => isThisAlbum.value && state.playing)

const totalMinutes = Math.round(album.tracks.reduce((s, tr) => s + (tr.duration || 0), 0) / 60)

function playAlbum() {
  if (isThisAlbum.value) toggle()
  else play(album, 0)
}

function durationOf(i) {
  if (isThisAlbum.value && state.index === i && state.duration) return formatTime(state.duration)
  return album.tracks[i].duration ? formatTime(album.tracks[i].duration) : '—'
}
</script>

<template>
  <PageHead index="04 / 05" :meta="t.musicKicker" :title="t.musicTitle">
    <p class="lead">{{ t.musicText }}</p>
  </PageHead>

  <section class="album grid12 rise-3">
    <div class="cover-col">
      <div class="cover">
        <div class="cover-top"><span>FC — LP 01</span><span>{{ album.span }}</span></div>
        <div class="ring" />
        <div class="mark" />
        <div class="cover-title">{{ album.title }}</div>
      </div>
      <div class="cover-meta">
        <span class="mono">{{ t.album }} · {{ album.released[lang] }}</span>
        <span v-if="hasTracks" class="mono">{{ String(album.tracks.length).padStart(2, '0') }} {{ t.tracks }}<template v-if="totalMinutes"> · {{ totalMinutes }} min</template></span>
      </div>
    </div>

    <div class="list-col">
      <div class="list-head">
        <div class="stack">
          <span class="mono">{{ t.album }}</span>
          <h2 class="album-title">{{ album.title }}</h2>
        </div>
        <div class="actions">
          <button v-if="hasTracks" class="btn btn-accent" @click="playAlbum">
            <AppIcon :name="albumPlaying ? 'pause' : 'play'" :size="14" />{{ albumPlaying ? t.pause : t.playAlbum }}
          </button>
          <a :href="album.soundcloud" target="_blank" rel="noopener" class="btn btn-line">{{ t.musicLink }} <AppIcon name="arrow" :size="14" /></a>
        </div>
      </div>

      <template v-if="hasTracks">
        <div class="row head mono"><span>{{ t.trackHead.n }}</span><span>{{ t.trackHead.title }}</span><span class="right">{{ t.trackHead.duration }}</span></div>
        <button
          v-for="(track, i) in album.tracks"
          :key="track.file"
          class="row track"
          :class="{ on: isThisAlbum && state.index === i }"
          :aria-current="isThisAlbum && state.index === i ? 'true' : undefined"
          @click="play(album, i)"
        >
          <span class="num">
            <AppIcon v-if="isThisAlbum && state.index === i && state.playing" name="bars" :size="14" />
            <template v-else>{{ String(i + 1).padStart(2, '0') }}</template>
          </span>
          <span class="name">{{ track.title }}</span>
          <span class="mono right">{{ durationOf(i) }}</span>
        </button>
        <span class="mono note">{{ t.musicStreamNote }}</span>
      </template>
      <p v-else class="empty">{{ t.musicEmpty }}</p>
    </div>
  </section>
</template>

<style scoped>
.album { padding-bottom: 120px; }
.cover-col { grid-column: 1 / span 5; display: flex; flex-direction: column; gap: 16px; }
.cover {
  aspect-ratio: 1;
  background: #111113;
  color: #F4F4F2;
  padding: clamp(20px, 2.4vw, 32px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
}
.cover-top { display: flex; justify-content: space-between; font-family: var(--mono); font-size: 13px; opacity: .6; }
.ring { position: absolute; right: 7%; top: 50%; width: 46%; aspect-ratio: 1; border-radius: 50%; border: 1px solid rgba(244, 244, 242, .18); transform: translateY(-50%); }
.mark { position: absolute; right: calc(7% + 23% - 7px); top: calc(50% - 7px); width: 14px; height: 14px; background: var(--accent); }
.cover-title { font-size: clamp(56px, 6.7vw, 96px); font-weight: 600; letter-spacing: -0.05em; line-height: 0.9; position: relative; }
.cover-meta { display: flex; justify-content: space-between; gap: 12px; }

.list-col { grid-column: 7 / span 6; display: flex; flex-direction: column; }
.list-head { display: flex; justify-content: space-between; align-items: flex-end; gap: 16px; flex-wrap: wrap; padding-bottom: 20px; }
.stack { display: flex; flex-direction: column; gap: 6px; }
.album-title { font-size: 40px; font-weight: 500; letter-spacing: -0.03em; line-height: 1.05; }
.actions { display: flex; gap: 12px; flex-wrap: wrap; }

.row { width: 100%; display: grid; grid-template-columns: 48px minmax(0, 1fr) 64px; gap: 16px; align-items: center; padding: 0 12px; border-bottom: 1px solid var(--rule); }
.row.head { padding-block: 10px; border-top: 1px solid var(--ink); }
.track { height: 52px; transition: background .15s; }
.track:hover, .track.on { background: var(--surface); }
.num { font-family: var(--mono); font-size: 13px; color: var(--muted); display: flex; align-items: center; }
.track.on .num { color: var(--accent); }
.name { font-size: 17px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.right { text-align: right; }
.note { margin-top: 16px; }
.empty { border-top: 1px solid var(--ink); padding-top: 16px; font-size: 17px; color: var(--soft); }

@media (max-width: 1024px) {
  .cover-col { grid-column: 1 / span 6; }
  .list-col { grid-column: 7 / span 6; }
  .album-title { font-size: 32px; }
}

@media (max-width: 720px) {
  .album { padding-bottom: 48px; row-gap: 28px; }
  .cover-col, .list-col { grid-column: 1 / -1; }
  .list-head { align-items: stretch; }
  .list-head .stack { display: none; }
  .actions { width: 100%; }
  .actions .btn { flex: 1; justify-content: center; height: 48px; }
  .row { grid-template-columns: 32px minmax(0, 1fr) 48px; gap: 12px; padding: 0; }
  .row.head { display: none; }
  .track:first-of-type { border-top: 1px solid var(--ink); }
}
</style>
