<script setup>
import { computed } from 'vue'
import { useLang } from '../composables/useLang'
import { CONFIG, PUBLICATIONS, LINKS, PROFILE } from '../siteContent'
import PageHead from '../components/PageHead.vue'
import AppIcon from '../components/AppIcon.vue'

const { lang, t } = useLang()

// Build date, injected by vite.config.js: the PDFs are regenerated on every build.
const updated = __BUILD_DATE__

const pdf = computed(() => CONFIG.cvPdf[lang.value])
const otherPdf = computed(() => CONFIG.cvPdf[lang.value === 'it' ? 'en' : 'it'])
const pubs = [...PUBLICATIONS].sort((a, b) => Number(b.year) - Number(a.year))

const links = [
  ['Google Scholar', LINKS.scholar],
  ['ORCID', LINKS.orcid],
  ['GitHub', LINKS.github],
  ['LinkedIn', LINKS.linkedin],
  ['Web', LINKS.site]
]
</script>

<template>
  <PageHead index="05 / 05" :meta="t.cvKicker(updated)" :title="t.cvTitle">
    <p class="lead">{{ t.cvText }}</p>
    <div class="actions">
      <a :href="pdf" :download="`Federico_Cunico_CV_${lang}.pdf`" class="btn btn-solid"><AppIcon name="download" />{{ t.cvDownload }}</a>
      <a :href="otherPdf" target="_blank" rel="noopener" class="btn btn-line">{{ t.cvOther }} <AppIcon name="arrow" :size="14" /></a>
    </div>
  </PageHead>

  <section class="block grid12">
    <h2 class="block-label mono">A — {{ t.cvProfileTitle }}</h2>
    <div class="content profile">
      <div class="stack">
        <span class="profile-name">{{ PROFILE.name }}, {{ PROFILE.suffix }}</span>
        <span class="sub">{{ t.heroRole }}</span>
        <span class="mono">{{ t.heroTag }} · {{ CONFIG.location }}</span>
      </div>
      <p class="body">{{ t.heroIntro }}</p>
    </div>
  </section>

  <section class="block grid12">
    <h2 class="block-label mono">B — {{ t.experienceTitle }}</h2>
    <div class="content list">
      <div v-for="job in t.experience" :key="job.role + job.period" class="entry">
        <span class="mono ink">{{ job.period }}</span>
        <div class="stack"><span class="entry-title">{{ job.role }}</span><span class="sub">{{ job.org }}</span></div>
        <p class="body">{{ job.text }}</p>
      </div>
    </div>
  </section>

  <section class="block grid12">
    <h2 class="block-label mono">C — {{ t.educationTitle }}</h2>
    <div class="content list">
      <div v-for="ed in t.education" :key="ed.degree" class="entry">
        <span class="mono ink">{{ ed.period }}</span>
        <div class="stack"><span class="entry-title">{{ ed.degree }}</span><span class="sub">{{ ed.org }}</span></div>
        <p class="body">{{ ed.text }}</p>
      </div>
    </div>
  </section>

  <section class="block grid12">
    <h2 class="block-label mono">D — {{ t.pubsTitle }}</h2>
    <div class="content list">
      <div v-for="pub in pubs" :key="pub.title" class="entry">
        <span class="mono ink">{{ pub.year }}</span>
        <div class="stack"><span class="entry-title">{{ pub.title }}</span><span class="sub">{{ pub.authors }}</span></div>
        <p class="body">{{ pub.venue }}</p>
      </div>
      <RouterLink to="/research" class="more">{{ t.cvAllPubs }} <AppIcon name="arrow" :size="14" /></RouterLink>
    </div>
  </section>

  <section class="block grid12">
    <h2 class="block-label mono">E — {{ t.cvInterestsTitle }}</h2>
    <div class="content interests">
      <RouterLink to="/astrophotography" class="interest">
        <span class="entry-title">{{ t.astroTitle }} <AppIcon name="arrow" :size="14" /></span>
        <span class="body">{{ t.astroText }}</span>
      </RouterLink>
      <RouterLink to="/music" class="interest">
        <span class="entry-title">{{ t.musicTitle }} <AppIcon name="arrow" :size="14" /></span>
        <span class="body">{{ t.musicText }}</span>
      </RouterLink>
    </div>
  </section>

  <section class="block grid12">
    <h2 class="block-label mono">F — {{ t.cvLinksTitle }}</h2>
    <div class="content links">
      <a v-for="[label, url] in links" :key="label" :href="url" target="_blank" rel="noopener" class="link-row">
        <span class="mono">{{ label }}</span>
        <span class="url">{{ url.replace(/^https?:\/\//, '') }}</span>
        <AppIcon name="arrow" :size="14" />
      </a>
    </div>
  </section>

  <section class="block grid12 last">
    <h2 class="block-label mono">G — {{ t.cvPreviewTitle }}</h2>
    <div class="content">
      <div class="preview">
        <object :key="pdf" :data="pdf" type="application/pdf" class="pdf">
          <div class="fallback">
            <p>{{ t.cvFallback }}</p>
            <a :href="pdf" target="_blank" rel="noopener" class="btn btn-solid">{{ t.cvOpen }} <AppIcon name="arrow" :size="14" /></a>
          </div>
        </object>
      </div>
      <a :href="pdf" target="_blank" rel="noopener" class="btn btn-line open-mobile">{{ t.cvOpen }} <AppIcon name="arrow" :size="14" /></a>
    </div>
  </section>
</template>

<style scoped>
.actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 12px; }

.block { padding: 56px 0; border-top: 1px solid var(--rule); }
.block.last { padding-bottom: 120px; }
.block-label { grid-column: 1 / span 3; font-weight: 400; }
.content { grid-column: 4 / span 9; }

.stack { display: flex; flex-direction: column; gap: 6px; }
.profile { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: var(--gap); }
.profile-name { font-size: 26px; font-weight: 500; letter-spacing: -0.02em; }
.body { font-size: 17px; line-height: 1.55; color: var(--soft); }
.sub { font-size: 16px; color: var(--muted); line-height: 1.45; }
.ink { color: var(--ink); font-size: 14px; }

.list { display: flex; flex-direction: column; }
.entry { display: grid; grid-template-columns: 200px minmax(0, 1fr) minmax(0, 1fr); gap: var(--gap); padding: 20px 0; border-top: 1px solid var(--rule); }
.entry:last-of-type { border-bottom: 1px solid var(--rule); }
.entry-title { font-size: 20px; font-weight: 500; letter-spacing: -0.01em; line-height: 1.3; display: inline-flex; align-items: center; gap: 8px; }
.more { margin-top: 16px; font-size: 16px; font-weight: 500; display: inline-flex; align-items: center; gap: 6px; align-self: flex-start; }

.interests { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--gap); }
.interest { display: flex; flex-direction: column; gap: 10px; padding-top: 16px; border-top: 1px solid var(--rule); }
.interest:hover .entry-title { color: var(--accent); }

.links { display: flex; flex-direction: column; border-bottom: 1px solid var(--rule); }
.link-row { display: grid; grid-template-columns: 160px minmax(0, 1fr) 16px; gap: var(--gap); align-items: center; padding: 14px 0; border-top: 1px solid var(--rule); }
.url { font-size: 17px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

.preview { border: 1px solid var(--rule); background: var(--surface); }
.pdf { display: block; width: 100%; height: 900px; }
.fallback { padding: 48px 24px; display: flex; flex-direction: column; align-items: center; gap: 16px; text-align: center; color: var(--soft); }
.open-mobile { display: none; }

@media (max-width: 1024px) {
  .block-label, .content { grid-column: 1 / -1; }
  .entry { grid-template-columns: 160px minmax(0, 1fr); }
  .entry .body { grid-column: 2; }
}

@media (max-width: 720px) {
  .block { padding: 28px 0; row-gap: 12px; border-top: 1px solid var(--ink); }
  .block.last { padding-bottom: 48px; }
  .profile, .interests { grid-template-columns: 1fr; }
  .profile-name { font-size: 24px; }
  .entry { grid-template-columns: 1fr; gap: 4px; padding: 14px 0; }
  .entry .body { grid-column: 1; margin-top: 4px; }
  .entry-title { font-size: 17px; }
  .link-row { grid-template-columns: 110px minmax(0, 1fr) 16px; gap: 12px; }
  /* Phones rarely render inline PDFs: offer the file instead. */
  .preview { display: none; }
  .open-mobile { display: inline-flex; }
}
</style>
