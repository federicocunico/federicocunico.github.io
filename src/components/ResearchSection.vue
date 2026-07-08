<script setup>
defineProps({
  t: { type: Object, required: true }
})
</script>

<template>
  <section id="ricerca" class="section-block">
    <h2 class="section-label">{{ t.researchTitle }}</h2>
    <p class="research-intro">{{ t.researchIntro }}</p>
    <div class="topics-grid">
      <div v-for="topic in t.researchTopics" :key="topic.title" class="topic-card">
        <h3 class="topic-title">{{ topic.title }}</h3>
        <p class="topic-text">{{ topic.text }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.research-intro {
  margin: 0 0 28px 0;
  font-size: clamp(20px, 6vw, 25px);
  font-weight: 400;
  font-style: italic;
  line-height: 1.4;
  max-width: 580px;
  text-wrap: pretty;
}

.topics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 28px;
}

.topic-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-top: 2px solid var(--accent, #D4B36A);
  padding-top: 14px;
}

.topic-title {
  margin: 0;
  font-size: 19px;
  font-weight: 600;
}

.topic-text {
  margin: 0;
  font-family: 'Public Sans', sans-serif;
  font-size: 14px;
  line-height: 1.65;
  color: var(--muted, #9AA0AE);
}
</style>
