<script setup>
import { computed } from 'vue'

const props = defineProps({
  photo: { type: Object, default: null }
})

defineEmits(['close'])

const meta = computed(() => {
  if (!props.photo) return ''
  return `${props.photo.date} · ${props.photo.equipment} · ${props.photo.integration}`
})
</script>

<template>
  <div v-if="photo" class="lightbox" @click="$emit('close')">
    <figure class="lightbox-figure" @click.stop>
      <img :src="photo.src" :alt="photo.title" class="lightbox-img" />
      <figcaption class="lightbox-caption">
        <span class="lightbox-title">{{ photo.title }}</span>
        <span class="lightbox-meta">{{ meta }}</span>
      </figcaption>
    </figure>
  </div>
</template>

<style scoped>
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 60;
  background: rgba(5, 6, 10, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
  cursor: zoom-out;
}

.lightbox-figure {
  margin: 0;
  max-width: 1100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 14px;
  animation: fadeUp 0.25s ease;
}

.lightbox-img {
  width: 100%;
  max-height: 78vh;
  object-fit: contain;
  display: block;
}

.lightbox-caption {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  color: #e9e6dd;
}

.lightbox-title {
  font-size: 20px;
  font-weight: 600;
}

.lightbox-meta {
  font-family: 'Public Sans', sans-serif;
  font-size: 12px;
  letter-spacing: 0.05em;
  color: #9aa0ae;
  align-self: center;
}
</style>
