<script setup>
import { computed } from 'vue'
import { usePlayer, formatTime } from '../composables/usePlayer'
import { useLang } from '../composables/useLang'
import AppIcon from './AppIcon.vue'

const { state, current, toggle, next, prev, seek, stop } = usePlayer()
const { t } = useLang()

const pct = computed(() => (state.duration ? (state.time / state.duration) * 100 : 0))

function onSeek(e) {
  const r = e.currentTarget.getBoundingClientRect()
  seek((e.clientX - r.left) / r.width)
}
function onSeekKey(e) {
  if (!state.duration) return
  const step = 5 / state.duration
  if (e.key === 'ArrowRight') seek(state.time / state.duration + step)
  if (e.key === 'ArrowLeft') seek(state.time / state.duration - step)
}
</script>

<template>
  <div v-if="current" class="player">
    <div
      class="track"
      role="slider"
      tabindex="0"
      aria-label="Seek"
      :aria-valuenow="Math.round(state.time)"
      aria-valuemin="0"
      :aria-valuemax="Math.round(state.duration)"
      @click="onSeek"
      @keydown="onSeekKey"
    >
      <div class="rail"><div class="fill" :style="{ width: pct + '%' }" /></div>
    </div>
    <div class="wrap bar">
      <RouterLink to="/music" class="now">
        <span class="cover"><span class="dot" /></span>
        <span class="labels">
          <span class="name">{{ current.title }}</span>
          <span class="mono">{{ state.album.title }}</span>
        </span>
      </RouterLink>
      <div class="controls">
        <button class="ctl" :aria-label="t.prev" @click="prev"><AppIcon name="prev" :size="18" /></button>
        <button class="ctl main" :aria-label="state.playing ? t.pause : 'Play'" @click="toggle">
          <AppIcon :name="state.playing ? 'pause' : 'play'" />
        </button>
        <button class="ctl" :aria-label="t.next" @click="next"><AppIcon name="next" :size="18" /></button>
      </div>
      <div class="end">
        <span class="mono">{{ formatTime(state.time) }} / {{ formatTime(state.duration) }}</span>
        <button class="ctl" :aria-label="t.close" @click="stop"><AppIcon name="close" /></button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.player {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 30;
  background: var(--navbg);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-top: 1px solid var(--rule);
  padding-bottom: env(safe-area-inset-bottom, 0px);
}
.track { height: 12px; margin-top: -6px; display: flex; align-items: center; cursor: pointer; }
.rail { position: relative; width: 100%; height: 2px; background: var(--rule); }
.fill { position: absolute; inset: 0 auto 0 0; background: var(--accent); }

.bar { height: 64px; display: grid; grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr); align-items: center; gap: var(--gap); }
.now { display: flex; align-items: center; gap: 12px; min-width: 0; }
.now:hover { color: var(--ink); }
.cover { width: 40px; height: 40px; background: #111113; display: flex; align-items: flex-end; justify-content: flex-end; padding: 5px; flex-shrink: 0; }
.dot { width: 6px; height: 6px; background: var(--accent); }
.labels { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.name { font-size: 16px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.labels .mono { font-size: 12px; }

.controls { display: flex; align-items: center; gap: 12px; }
.ctl { width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; }
.ctl:hover { color: var(--accent); }
.ctl.main { border-radius: 50%; background: var(--ink); color: var(--bg); }
.ctl.main:hover { color: var(--bg); opacity: .86; }
.end { display: flex; justify-content: flex-end; align-items: center; gap: 16px; }

@media (max-width: 720px) {
  .bar { grid-template-columns: minmax(0, 1fr) auto auto; gap: 4px; height: 60px; }
  .end .mono, .controls .ctl:first-child, .cover { display: none; }
  .controls { gap: 0; }
}
</style>
