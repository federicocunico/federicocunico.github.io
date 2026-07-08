<script setup>
import { ref, computed, onMounted } from 'vue'
import { CONFIG, PUBLICATIONS, LINKS } from '../siteContent'
import { fetchPublications, mapLivePublications, mapStaticPublications } from '../lib/fetchPublications'

const props = defineProps({
  t: { type: Object, required: true },
  lang: { type: String, required: true },
  accent: { type: String, required: true }
})

const livePubs = ref(null)
const pubsSort = ref('recent')

const pubsAreLive = computed(() => !!livePubs.value)

const pubs = computed(() => {
  if (livePubs.value) {
    return mapLivePublications(livePubs.value, props.lang, pubsSort.value, CONFIG.pubsCount)
  }
  return mapStaticPublications(PUBLICATIONS, CONFIG.pubsCount)
})

function sortBtnStyle(mode) {
  const active = pubsSort.value === mode
  return {
    border: `1px solid ${active ? props.accent : 'var(--rule, #232838)'}`,
    color: active ? props.accent : 'var(--muted, #9AA0AE)'
  }
}

onMounted(async () => {
  try {
    livePubs.value = await fetchPublications(CONFIG.scholarAuthorName)
  } catch (e) {
    console.warn('Semantic Scholar fetch failed, using static list', e)
  }
})
</script>

<template>
  <section id="pubblicazioni" class="section-block">
    <div class="pubs-header">
      <h2 class="section-label">{{ t.pubsTitle }}</h2>
      <div v-if="pubsAreLive" class="pubs-sort">
        <button class="sort-btn" :style="sortBtnStyle('recent')" @click="pubsSort = 'recent'">
          {{ t.pubsSortRecent }}
        </button>
        <button class="sort-btn" :style="sortBtnStyle('cited')" @click="pubsSort = 'cited'">
          {{ t.pubsSortCited }}
        </button>
      </div>
    </div>

    <p v-if="pubsAreLive" class="pubs-live">
      <span class="live-dot" />
      {{ t.pubsLive }}
    </p>

    <div class="pubs-list">
      <div v-for="(pub, i) in pubs" :key="i" class="pub-row">
        <div class="pub-meta">
          <span class="pub-year">{{ pub.year }}</span>
          <span v-if="pub.cites" class="pub-cites">{{ pub.cites }}</span>
        </div>
        <div class="pub-body">
          <div class="pub-title">{{ pub.title }}</div>
          <div class="pub-authors">{{ pub.authors }}</div>
          <div class="pub-venue">{{ pub.venue }}</div>
        </div>
      </div>
    </div>

    <a :href="LINKS.scholar" target="_blank" rel="noopener" class="link-accent pubs-note">
      {{ t.pubsNote }} ↗
    </a>
  </section>
</template>

<style scoped>
.pubs-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 6px;
}

.pubs-sort {
  display: flex;
  gap: 8px;
  align-items: baseline;
}

.sort-btn {
  font-family: 'Public Sans', sans-serif;
  font-size: 11.5px;
  letter-spacing: 0.06em;
  background: transparent;
  border-radius: 999px;
  padding: 4px 12px;
  cursor: pointer;
}

.pubs-live {
  margin: 0 0 18px 0;
  font-family: 'Public Sans', sans-serif;
  font-size: 11.5px;
  color: var(--muted, #9AA0AE);
  display: flex;
  align-items: center;
  gap: 6px;
}

.live-dot {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: #57c785;
  display: inline-block;
}

.pub-row {
  display: grid;
  grid-template-columns: 72px 1fr;
  gap: 20px;
  padding: 18px 0;
  border-bottom: 1px solid var(--rule, #232838);
}

.pub-year {
  font-family: 'Public Sans', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: var(--accent, #D4B36A);
}

.pub-cites {
  font-family: 'Public Sans', sans-serif;
  font-size: 11px;
  color: var(--muted, #9AA0AE);
}

.pub-title {
  font-size: 18px;
  font-weight: 600;
  line-height: 1.35;
  text-wrap: pretty;
}

.pub-authors {
  font-family: 'Public Sans', sans-serif;
  font-size: 13px;
  color: var(--muted, #9AA0AE);
  line-height: 1.5;
}

.pub-venue {
  font-size: 14.5px;
  font-style: italic;
  color: var(--soft, #C9CBD1);
}

.pubs-note {
  display: inline-block;
  margin-top: 18px;
}
</style>
