<script setup>
defineProps({
  name: { type: String, required: true },
  size: { type: Number, default: 16 }
})
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 0 24 24" aria-hidden="true" class="icon">
    <path v-if="name === 'arrow'" d="M7 17L17 7M8 7h9v9" fill="none" stroke="currentColor" stroke-width="1.6" />
    <path v-else-if="name === 'download'" d="M12 4v11M7 10l5 5 5-5M5 20h14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
    <path v-else-if="name === 'expand'" d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" fill="none" stroke="currentColor" stroke-width="1.8" />
    <path v-else-if="name === 'close'" d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="1.6" />
    <path v-else-if="name === 'menu'" d="M4 8h16M4 16h16" fill="none" stroke="currentColor" stroke-width="1.6" />
    <path v-else-if="name === 'left'" d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="1.8" />
    <path v-else-if="name === 'right'" d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.8" />
    <path v-else-if="name === 'moon'" d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" />
    <g v-else-if="name === 'sun'" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></g>
    <path v-else-if="name === 'play'" d="M7 4.5v15l13-7.5z" fill="currentColor" />
    <g v-else-if="name === 'pause'" fill="currentColor"><rect x="6" y="5" width="4" height="14" /><rect x="14" y="5" width="4" height="14" /></g>
    <g v-else-if="name === 'prev'" fill="currentColor"><path d="M18 5v14L8 12z" /><rect x="5" y="5" width="2" height="14" /></g>
    <g v-else-if="name === 'next'" fill="currentColor"><path d="M6 5v14l10-7z" /><rect x="17" y="5" width="2" height="14" /></g>
    <g v-else-if="name === 'bars'" fill="currentColor"><rect x="4" y="10" width="3" height="10" /><rect x="10.5" y="5" width="3" height="15" /><rect x="17" y="12" width="3" height="8" /></g>
  </svg>
</template>

<style scoped>
.icon { display: block; flex-shrink: 0; }
</style>
