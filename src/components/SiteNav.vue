<script setup>
defineProps({
  t: { type: Object, required: true },
  langLabel: { type: String, required: true },
  themeIcon: { type: String, required: true },
  menuOpen: { type: Boolean, required: true }
})

defineEmits(['toggle-lang', 'toggle-theme', 'toggle-menu', 'close-menu'])
</script>

<template>
  <nav class="site-nav">
    <div class="site-nav-inner">
      <a href="#top" class="site-brand">Federico Cunico</a>

      <div id="nav-links" class="nav-links">
        <a href="#ricerca" class="nav-link">{{ t.nav.research }}</a>
        <a href="#pubblicazioni" class="nav-link">{{ t.nav.publications }}</a>
        <a href="#esperienza" class="nav-link">{{ t.nav.experience }}</a>
        <a href="#passioni" class="nav-link">{{ t.nav.passions }}</a>
        <a href="#cv" class="nav-link">CV</a>
        <a href="#contatti" class="nav-link">{{ t.nav.contact }}</a>
      </div>

      <div class="nav-actions">
        <button
          id="nav-hamburger"
          class="btn-pill nav-hamburger"
          title="Menu"
          aria-label="Menu"
          @click="$emit('toggle-menu')"
        >
          {{ menuOpen ? '✕' : '☰' }}
        </button>
        <button class="btn-pill" @click="$emit('toggle-lang')">{{ langLabel }}</button>
        <button class="btn-pill" title="Light / dark" @click="$emit('toggle-theme')">{{ themeIcon }}</button>
      </div>
    </div>

    <div v-if="menuOpen" id="nav-menu-panel" class="nav-menu-panel">
      <a href="#ricerca" class="nav-menu-link" @click="$emit('close-menu')">{{ t.nav.research }}</a>
      <a href="#pubblicazioni" class="nav-menu-link" @click="$emit('close-menu')">{{ t.nav.publications }}</a>
      <a href="#esperienza" class="nav-menu-link" @click="$emit('close-menu')">{{ t.nav.experience }}</a>
      <a href="#passioni" class="nav-menu-link" @click="$emit('close-menu')">{{ t.nav.passions }}</a>
      <a href="#cv" class="nav-menu-link" @click="$emit('close-menu')">CV</a>
      <a href="#contatti" class="nav-menu-link" @click="$emit('close-menu')">{{ t.nav.contact }}</a>
    </div>
  </nav>

  <div
    v-if="menuOpen"
    id="nav-menu-backdrop"
    class="nav-menu-backdrop"
    @click="$emit('close-menu')"
  />
</template>

<style scoped>
.site-nav {
  position: sticky;
  top: 0;
  z-index: 40;
  background: var(--navbg, rgba(11, 14, 22, 0.85));
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--rule, #232838);
}

.site-nav-inner {
  max-width: 900px;
  margin: 0 auto;
  padding: 14px 24px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.site-brand {
  flex-shrink: 0;
  font-family: 'Public Sans', sans-serif;
  font-size: 12px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--accent, #D4B36A);
  text-decoration: none;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.nav-hamburger {
  display: none;
  font-size: 15px;
  line-height: 1;
}

.nav-menu-panel {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  background: var(--navbg, rgba(11, 14, 22, 0.85));
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--rule, #232838);
  padding: 4px 24px 12px 24px;
}

.nav-menu-link {
  padding: 14px 0;
  font-size: 16px;
  font-style: italic;
  color: var(--muted, #9AA0AE);
  text-decoration: none;
  border-bottom: 1px solid var(--rule, #232838);
}

.nav-menu-backdrop {
  position: fixed;
  inset: 0;
  z-index: 39;
}
</style>
