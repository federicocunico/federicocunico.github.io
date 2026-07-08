<script setup>
defineProps({
  t: { type: Object, required: true },
  astro: { type: Array, required: true },
  links: { type: Object, required: true }
})

defineEmits(['open-photo'])
</script>

<template>
  <section id="passioni" class="section-block">
    <h2 class="section-label">{{ t.passionsTitle }}</h2>
    <h3 class="passion-title">{{ t.astroTitle }}</h3>
    <p class="passion-text">{{ t.astroText }}</p>

    <div id="astro-grid" class="astro-grid">
      <figure
        v-for="photo in astro"
        :key="photo.src"
        class="astro-figure"
        @click="$emit('open-photo', photo)"
      >
        <img :src="photo.src" :alt="photo.title" class="astro-img" />
        <figcaption class="astro-caption">{{ photo.title }}</figcaption>
      </figure>
    </div>

    <div class="music-block">
      <h3 class="passion-title">{{ t.musicTitle }}</h3>
      <p class="passion-text">{{ t.musicText }}</p>
      <a :href="links.soundcloud" target="_blank" rel="noopener" class="link-accent">
        {{ t.musicLink }} ↗
      </a>
    </div>
  </section>
</template>

<style scoped>
.passion-title {
  margin: 0 0 10px 0;
  font-size: 26px;
  font-weight: 600;
}

.passion-text {
  margin: 0 0 24px 0;
  font-size: 17px;
  font-weight: 300;
  line-height: 1.7;
  max-width: 620px;
  color: var(--soft, #C9CBD1);
  text-wrap: pretty;
}

.astro-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.astro-figure {
  margin: 0;
  cursor: zoom-in;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.astro-img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 6px;
  display: block;
  border: 1px solid var(--rule, #232838);
  transition: transform 0.25s, border-color 0.25s;
}

.astro-figure:hover .astro-img {
  transform: translateY(-3px);
  border-color: var(--rule2, rgba(212, 179, 106, 0.4));
}

.astro-caption {
  font-family: 'Public Sans', sans-serif;
  font-size: 11px;
  letter-spacing: 0.04em;
  color: var(--muted, #9AA0AE);
}

.music-block {
  margin-top: 40px;
  border-top: 1px solid var(--rule, #232838);
  padding-top: 28px;
}

@media (max-width: 680px) {
  .astro-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
