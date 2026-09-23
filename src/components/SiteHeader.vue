<script setup>
import { useLang } from '../composables/useLang'
import { useTheme } from '../composables/useTheme'
import { NAV } from '../router'
import AppIcon from './AppIcon.vue'

const { lang, t, setLang } = useLang()
const { isDark, toggleTheme } = useTheme()
</script>

<template>
  <header class="header">
    <div class="wrap bar">
      <RouterLink to="/" class="brand">
        <span class="square" />
        <span>Federico Cunico</span>
      </RouterLink>

      <!-- Always visible: one row on desktop, a second row of tabs on small screens -->
      <nav class="nav" aria-label="Main">
        <RouterLink v-for="n in NAV" :key="n.name" :to="n.path" class="nav-link" active-class="" exact-active-class="is-active">
          <span class="mono num">{{ n.num }}</span>
          <span class="full">{{ t.nav[n.key] }}</span>
          <span class="short">{{ t.navShort[n.key] }}</span>
        </RouterLink>
      </nav>

      <div class="tools">
        <div class="lang">
          <button :aria-pressed="lang === 'it'" @click="setLang('it')">IT</button>
          <span aria-hidden="true">/</span>
          <button :aria-pressed="lang === 'en'" @click="setLang('en')">EN</button>
        </div>
        <button class="theme" :aria-label="isDark ? t.themeLight : t.themeDark" :title="isDark ? t.themeLight : t.themeDark" @click="toggleTheme">
          <AppIcon :name="isDark ? 'sun' : 'moon'" />
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 20;
  background: var(--navbg);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--rule);
}

.bar {
  min-height: var(--header-h);
  display: grid;
  grid-template-columns: 240px 1fr 200px;
  grid-template-areas: 'brand nav tools';
  align-items: center;
  gap: var(--gap);
}

.brand { grid-area: brand; display: flex; align-items: center; gap: 10px; font-size: 16px; font-weight: 600; letter-spacing: -0.01em; white-space: nowrap; }
.brand:hover { color: var(--ink); }
.square { width: 10px; height: 10px; background: var(--accent); flex-shrink: 0; }

.nav { grid-area: nav; display: flex; gap: 28px; align-self: stretch; }
.nav-link {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 15px;
  font-weight: 500;
  color: var(--soft);
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  white-space: nowrap;
}
.num { font-size: 12px; }
.short { display: none; }
.full, .short { max-width: 100%; overflow: hidden; text-overflow: ellipsis; }
.nav-link:hover { color: var(--accent); }
.nav-link.is-active { color: var(--ink); border-bottom-color: var(--accent); }

.tools { grid-area: tools; display: flex; justify-content: flex-end; align-items: center; gap: 16px; }
.lang { display: flex; align-items: center; gap: 2px; font-family: var(--mono); font-size: 13px; color: var(--rule); }
.lang button { padding: 4px 6px; color: var(--muted); }
.lang button[aria-pressed="true"] { color: var(--ink); font-weight: 500; }
.theme { width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--rule); }
.theme:hover { color: var(--accent); }

@media (max-width: 1180px) {
  .bar { grid-template-columns: auto 1fr auto; }
  .nav { gap: 18px; justify-content: center; }
}

/* Tablet and phone: brand + tools on top, the sections as a full-width tab row below. */
@media (max-width: 960px) {
  .bar {
    grid-template-columns: 1fr auto;
    grid-template-areas: 'brand tools' 'nav nav';
    row-gap: 0;
  }
  .brand, .tools { height: 52px; }
  .tools { gap: 8px; }
  .lang button { height: 40px; padding: 0 8px; }
  .theme { width: 40px; height: 40px; }

  .nav {
    display: flex;
    gap: 0;
    margin-inline: calc(var(--gutter) * -1);
    border-top: 1px solid var(--rule);
    min-width: 0;
    overflow: hidden;
  }
  .nav-link {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 2px;
    flex: 1 1 auto;
    min-width: 0;
    min-height: 52px;
    padding: 6px 10px;
    font-size: 13px;
    border-left: 1px solid var(--rule);
  }
  .nav-link:first-child { border-left: 0; padding-left: var(--gutter); }
  .nav-link.is-active { background: var(--surface); }
  .num { font-size: 10px; }
}

@media (max-width: 600px) {
  .full { display: none; }
  .short { display: inline; }
  .nav-link { padding-inline: 6px; font-size: 12px; }
  .nav-link:first-child { padding-left: 12px; }
}

@media (max-width: 360px) {
  .nav-link { padding-inline: 4px; font-size: 11.5px; }
  .nav-link:first-child { padding-left: 8px; }
  .brand { font-size: 15px; gap: 8px; }
  .tools { gap: 4px; }
  .lang button { padding: 0 5px; }
}
</style>
