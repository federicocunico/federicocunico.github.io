<script setup>
import { useLang } from '../composables/useLang'
import { LINKS } from '../siteContent'
import AppIcon from './AppIcon.vue'

const { t } = useLang()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="wrap">
    <div class="footer grid12">
      <div class="cta">
        <span class="mono">{{ t.contactTitle }}</span>
        <a :href="LINKS.linkedin" target="_blank" rel="noopener" class="cta-link">{{ t.contactCta }} <AppIcon name="arrow" :size="28" /></a>
        <span class="cta-text">{{ t.contactText }}</span>
      </div>
      <div class="profiles">
        <span class="mono">{{ t.profiles }}</span>
        <a :href="LINKS.scholar" target="_blank" rel="noopener">Google Scholar</a>
        <a :href="LINKS.github" target="_blank" rel="noopener">GitHub</a>
        <a :href="LINKS.linkedin" target="_blank" rel="noopener">LinkedIn</a>
        <a :href="LINKS.orcid" target="_blank" rel="noopener">ORCID</a>
        <a :href="LINKS.soundcloud" target="_blank" rel="noopener">SoundCloud</a>
      </div>
      <div class="meta">
        <span class="mono">Verona, IT</span>
        <span class="mono">© {{ year }} Federico Cunico</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer { border-top: 1px solid var(--ink); padding: 48px 0 56px; }
.cta { grid-column: 1 / span 6; display: flex; flex-direction: column; gap: 16px; }
.cta-link { font-size: 40px; font-weight: 500; letter-spacing: -0.03em; line-height: 1.05; display: flex; align-items: center; gap: 12px; }
.cta-text { font-size: 17px; color: var(--soft); }
.profiles { grid-column: 8 / span 2; display: flex; flex-direction: column; gap: 8px; font-size: 16px; }
.meta { grid-column: 10 / span 3; display: flex; flex-direction: column; align-items: flex-end; justify-content: space-between; gap: 8px; }

@media (max-width: 720px) {
  .footer { padding: 28px 0 40px; row-gap: 24px; }
  .cta, .profiles, .meta { grid-column: 1 / -1; }
  .cta { gap: 10px; }
  .cta-link { font-size: 26px; }
  .profiles { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .profiles .mono { grid-column: 1 / -1; }
  .meta { align-items: flex-start; }
}
</style>
