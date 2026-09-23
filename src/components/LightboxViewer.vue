<script setup>
import { computed, ref, watch, onBeforeUnmount } from 'vue'
import { useLang } from '../composables/useLang'
import AppIcon from './AppIcon.vue'

// items: [{ thumb, full, title, kicker, rows: [[label, value]] }]
const props = defineProps({
  items: { type: Array, required: true },
  index: { type: Number, default: -1 }
})
const emit = defineEmits(['update:index'])
const { t } = useLang()

const open = computed(() => props.index >= 0 && props.index < props.items.length)
const item = computed(() => (open.value ? props.items[props.index] : null))
const loaded = ref(false)
const count = computed(() => String(props.items.length).padStart(2, '0'))
const num = computed(() => String(props.index + 1).padStart(2, '0'))

function go(delta) {
  const n = props.items.length
  emit('update:index', (props.index + delta + n) % n)
}
function close() { emit('update:index', -1) }

function onKey(e) {
  if (e.key === 'Escape') close()
  else if (e.key === 'ArrowRight') go(1)
  else if (e.key === 'ArrowLeft') go(-1)
}

watch(open, (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : ''
  if (isOpen) window.addEventListener('keydown', onKey)
  else window.removeEventListener('keydown', onKey)
})
watch(() => item.value && item.value.full, () => { loaded.value = false })

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <div v-if="item" class="lightbox" role="dialog" aria-modal="true" :aria-label="item.title">
      <div class="stage" @click.self="close">
        <div class="frame" @click="close">
          <img :src="item.thumb" :alt="item.title" class="img low" />
          <img :key="item.full" :src="item.full" :alt="item.title" class="img full" :class="{ on: loaded }" @load="loaded = true" />
        </div>
      </div>

      <aside class="panel">
        <div class="top">
          <div class="row-between">
            <span class="mono">{{ num }} / {{ count }}</span>
            <button class="icon-btn" :aria-label="t.close" @click="close"><AppIcon name="close" :size="20" /></button>
          </div>
          <div class="titles">
            <span class="mono">{{ item.kicker }}</span>
            <h2 class="title">{{ item.title }}</h2>
          </div>
          <dl v-if="item.rows && item.rows.length" class="sheet">
            <template v-for="[label, value] in item.rows" :key="label">
              <dt>{{ label }}</dt>
              <dd>{{ value }}</dd>
            </template>
          </dl>
          <a :href="item.full" download class="btn dl">{{ t.downloadOriginal }} <AppIcon name="download" /></a>
        </div>
        <div v-if="items.length > 1" class="pager">
          <button class="btn step" @click="go(-1)"><AppIcon name="left" /><span>{{ t.prev }}</span></button>
          <button class="btn step" @click="go(1)"><span>{{ t.next }}</span><AppIcon name="right" /></button>
        </div>
      </aside>
    </div>
  </Teleport>
</template>

<style scoped>
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 50;
  background: var(--dark-stage);
  color: #EDEDEA;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  animation: fade .2s ease both;
}
@keyframes fade { from { opacity: 0; } to { opacity: 1; } }

.stage { min-height: 0; display: flex; align-items: center; justify-content: center; padding: 48px; cursor: zoom-out; }
.frame { position: relative; display: grid; max-width: 100%; max-height: 100%; }
.img { grid-area: 1 / 1; max-width: 100%; max-height: calc(100vh - 96px); max-height: calc(100dvh - 96px); object-fit: contain; }
.low { filter: blur(6px); transform: scale(1.001); }
.full { opacity: 0; transition: opacity .35s; }
.full.on { opacity: 1; }

.panel {
  border-left: 1px solid #222326;
  padding: 24px 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
  overflow-y: auto;
}
.top { display: flex; flex-direction: column; gap: 32px; }
.row-between { display: flex; justify-content: space-between; align-items: center; }
.mono { color: #8A8C92; }
.icon-btn { width: 44px; height: 44px; margin-right: -12px; display: flex; align-items: center; justify-content: center; }
.titles { display: flex; flex-direction: column; gap: 8px; }
.title { font-size: 34px; font-weight: 500; letter-spacing: -0.03em; line-height: 1.05; }
.sheet { display: grid; grid-template-columns: 110px 1fr; font-family: var(--mono); font-size: 13px; line-height: 1.5; border-bottom: 1px solid #222326; }
.sheet dt, .sheet dd { padding: 10px 0; border-top: 1px solid #222326; }
.sheet dt { color: #8A8C92; }
.btn.dl { justify-content: space-between; border: 1px solid #34353A; color: #EDEDEA; }
.btn.dl:hover { border-color: #EDEDEA; color: #EDEDEA; }
.pager { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
.step { height: 48px; justify-content: center; border: 1px solid #34353A; color: #EDEDEA; }
.step:hover { border-color: #EDEDEA; }

@media (max-width: 860px) {
  .lightbox { grid-template-columns: 1fr; grid-template-rows: minmax(0, 1fr) auto; }
  .stage { padding: 56px 0 12px; }
  .img { max-height: 100%; }
  .frame { height: 100%; }
  .panel { border-left: 0; border-top: 1px solid #222326; padding: 16px 20px 20px; max-height: 46vh; }
  .top { gap: 14px; }
  .row-between { position: fixed; top: 6px; left: 20px; right: 20px; }
  .title { font-size: 24px; }
  .sheet { grid-template-columns: 96px 1fr; font-size: 12px; }
  .sheet dt, .sheet dd { padding: 6px 0; }
}
</style>
