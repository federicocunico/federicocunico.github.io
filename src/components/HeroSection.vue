<script setup>
import { computed } from 'vue'
import avatarUrl from '../assets/avatar.jpg'

const props = defineProps({
  t: { type: Object, required: true },
  config: { type: Object, required: true },
  links: { type: Object, required: true }
})

const avatarStyle = computed(() => {
  const { x = 50, y = 50, zoom = 1 } = props.config.avatarCrop ?? {}
  return {
    objectPosition: `${x}% ${y}%`,
    transform: `scale(${zoom})`,
    transformOrigin: `${x}% ${y}%`
  }
})
</script>

<template>
  <header id="top" class="hero">
    <div class="hero-bg" :style="{ backgroundImage: `url('${config.heroImage}')` }" />
    <div class="hero-gradient" />
    <div class="hero-content">
      <div class="hero-avatar-wrap">
        <img
          :src="avatarUrl"
          alt="Federico Cunico"
          class="hero-avatar"
          :style="avatarStyle"
          width="132"
          height="132"
          decoding="async"
        />
      </div>
      <h1 class="hero-title">
        Federico Cunico<span class="hero-phd">, PhD</span>
      </h1>
      <p class="hero-role">{{ t.heroRole }}</p>
      <p class="hero-intro">{{ t.heroIntro }}</p>
      <div class="hero-badges">
        <span class="hero-pill">
          <span class="hero-dot" />
          {{ t.openTo }}
        </span>
        <span class="hero-location">{{ config.location }}</span>
      </div>
      <div class="hero-links">
        <a :href="links.scholar" target="_blank" rel="noopener" class="hero-link">Google Scholar</a>
        <a :href="links.github" target="_blank" rel="noopener" class="hero-link">GitHub</a>
        <a :href="links.linkedin" target="_blank" rel="noopener" class="hero-link">LinkedIn</a>
        <a :href="links.orcid" target="_blank" rel="noopener" class="hero-link">ORCID</a>
      </div>
    </div>
  </header>
</template>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  opacity: var(--heroImgOpacity, 0.35);
}

.hero-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 20%, var(--bg, #0B0E16) 96%);
}

.hero-content {
  position: relative;
  max-width: 900px;
  margin: 0 auto;
  padding: clamp(64px, 18vw, 120px) 24px clamp(48px, 12vw, 84px) 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 18px;
}

.hero-avatar-wrap {
  width: 132px;
  height: 132px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  border: 2px solid var(--accent, #D4B36A);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.38),
    0 0 0 4px color-mix(in srgb, var(--accent, #D4B36A) 14%, transparent);
  background: var(--card, rgba(255, 255, 255, 0.04));
}

.hero-avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  will-change: transform;
}

.hero-title {
  margin: 0;
  font-size: clamp(44px, 7vw, 64px);
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1.05;
  text-shadow: 0 2px 24px rgba(0, 0, 0, 0.4);
}

.hero-phd {
  font-size: 0.5em;
  font-weight: 400;
  color: var(--muted, #9AA0AE);
}

.hero-role {
  margin: 0;
  font-family: 'Public Sans', sans-serif;
  font-size: 13px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--accent, #D4B36A);
}

.hero-intro {
  margin: 0;
  font-size: 19px;
  font-weight: 300;
  line-height: 1.7;
  max-width: 620px;
  text-wrap: pretty;
  color: var(--soft, #C9CBD1);
}

.hero-badges {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 6px;
}

.hero-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'Public Sans', sans-serif;
  font-size: 12px;
  font-weight: 500;
  border: 1px solid var(--rule2, rgba(212, 179, 106, 0.4));
  border-radius: 999px;
  padding: 6px 14px;
  background: var(--pill, rgba(0, 0, 0, 0.25));
}

.hero-dot {
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: #57c785;
}

.hero-location {
  font-family: 'Public Sans', sans-serif;
  font-size: 12.5px;
  color: var(--muted, #9AA0AE);
}

.hero-links {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 10px;
}

.hero-link {
  font-family: 'Public Sans', sans-serif;
  font-size: 12.5px;
  letter-spacing: 0.08em;
  color: var(--soft, #C9CBD1);
  text-decoration: none;
  border-bottom: 1px solid var(--rule2, rgba(212, 179, 106, 0.4));
  padding-bottom: 2px;
}

.hero-link:hover {
  color: var(--accent, #D4B36A);
}
</style>
