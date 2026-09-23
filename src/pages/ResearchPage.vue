<script setup>
import { ref, computed, onMounted } from 'vue'
import { useLang } from '../composables/useLang'
import { CONFIG, PUBLICATIONS, LINKS } from '../siteContent'
import { fetchPublications, mapLivePublications, mapStaticPublications } from '../lib/fetchPublications'
import PageHead from '../components/PageHead.vue'
import AppIcon from '../components/AppIcon.vue'

const { t } = useLang()

const livePubs = ref(null)

const pubs = computed(() =>
  livePubs.value
    ? mapLivePublications(livePubs.value, t.value.citations, CONFIG.pubsCount)
    : mapStaticPublications(PUBLICATIONS, CONFIG.pubsCount)
)

onMounted(async () => {
  try {
    livePubs.value = await fetchPublications(CONFIG.scholarAuthorName)
  } catch (e) {
    console.warn('Semantic Scholar fetch failed, using static list', e)
  }
})
</script>

<template>
  <PageHead index="01 / 05" :meta="t.researchKicker" :title="t.researchTitle">
    <p class="lead lead-lg">{{ t.heroIntro }}</p>
    <div class="actions">
      <RouterLink to="/cv" class="btn btn-solid">{{ t.cvLink }} <AppIcon name="arrow" :size="14" /></RouterLink>
      <a :href="LINKS.scholar" target="_blank" rel="noopener" class="btn btn-line">Google Scholar <AppIcon name="arrow" :size="14" /></a>
    </div>
  </PageHead>

  <section class="block grid12">
    <h2 class="block-label mono">A — {{ t.topicsTitle }}</h2>
    <div class="topics">
      <div v-for="(topic, i) in t.researchTopics" :key="topic.title" class="topic">
        <span class="mono">A.{{ i + 1 }}</span>
        <h3 class="topic-title">{{ topic.title }}</h3>
        <p class="body">{{ topic.text }}</p>
      </div>
    </div>
  </section>

  <section class="block grid12 last">
    <div class="block-label">
      <h2 class="mono">B — {{ t.pubsTitle }}</h2>
      <span v-if="livePubs" class="mono small">{{ t.pubsLive }}</span>
    </div>
    <div class="list">
      <div v-for="(pub, i) in pubs" :key="pub.title + i" class="pub">
        <span class="mono ink">{{ pub.year }}</span>
        <div class="stack">
          <span class="pub-title">{{ pub.title }}</span>
          <span class="sub">{{ pub.authors }}</span>
        </div>
        <div class="pub-meta">
          <span class="mono">{{ pub.venue }}</span>
          <span v-if="pub.cites" class="mono">{{ pub.cites }}</span>
        </div>
      </div>
      <a :href="LINKS.scholar" target="_blank" rel="noopener" class="more">{{ t.pubsNote }} <AppIcon name="arrow" :size="14" /></a>
    </div>
  </section>

</template>

<style scoped>
.lead-lg { font-size: 21px; line-height: 1.5; }
.actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 12px; }

.block { padding: 56px 0; border-top: 1px solid var(--rule); }
.block.last { padding-bottom: 120px; }
.block-label { grid-column: 1 / span 3; display: flex; flex-direction: column; gap: 8px; align-items: flex-start; font-weight: 400; }
.block-label h2 { font-weight: 400; }
.small { font-size: 12px; }

.topics { grid-column: 4 / span 9; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: var(--gap); }
.topic { display: flex; flex-direction: column; gap: 12px; }
.topic-title { font-size: 24px; font-weight: 500; letter-spacing: -0.02em; line-height: 1.2; }
.body { font-size: 17px; line-height: 1.55; color: var(--soft); }

.list { grid-column: 4 / span 9; display: flex; flex-direction: column; border-bottom: 1px solid var(--rule); }
.list:has(.more) { border-bottom: 0; }
.pub, .entry { display: grid; gap: var(--gap); padding: 20px 0; border-top: 1px solid var(--rule); }
.pub { grid-template-columns: 80px minmax(0, 1fr) 200px; }
.pub:last-of-type { border-bottom: 1px solid var(--rule); }
.entry { grid-template-columns: 200px minmax(0, 1fr) minmax(0, 1fr); }
.ink { color: var(--ink); font-size: 14px; }
.stack { display: flex; flex-direction: column; gap: 6px; }
.pub-title, .entry-title { font-size: 20px; font-weight: 500; letter-spacing: -0.01em; line-height: 1.3; }
.sub { font-size: 16px; color: var(--muted); line-height: 1.45; }
.pub-meta { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; text-align: right; }
.more { margin-top: 16px; font-size: 16px; font-weight: 500; display: inline-flex; align-items: center; gap: 6px; align-self: flex-start; }

@media (max-width: 1024px) {
  .block-label, .topics, .list { grid-column: 1 / -1; }
  .block-label { flex-direction: row; flex-wrap: wrap; align-items: center; gap: 12px; }
  .entry { grid-template-columns: 160px minmax(0, 1fr); }
  .entry .body { grid-column: 2; }
}

@media (max-width: 720px) {
  .block { padding: 28px 0; row-gap: 12px; border-top: 1px solid var(--ink); }
  .block.last { padding-bottom: 48px; }
  .topics { grid-template-columns: 1fr; gap: 24px; }
  .pub, .entry { grid-template-columns: 1fr; gap: 4px; padding: 14px 0; }
  .entry .body { grid-column: 1; margin-top: 4px; }
  .pub-meta { flex-direction: row; justify-content: flex-start; gap: 12px; text-align: left; }
  .pub-title, .entry-title { font-size: 17px; }
}
</style>
