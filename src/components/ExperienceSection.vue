<script setup>
defineProps({
  t: { type: Object, required: true }
})
</script>

<template>
  <section id="esperienza" class="section-block">
    <h2 class="section-label" style="margin-bottom: 24px">{{ t.experienceTitle }}</h2>
    <div>
      <div v-for="job in t.experience" :key="job.role + job.period" class="grid-row">
        <div class="grid-row-period">{{ job.period }}</div>
        <div>
          <div class="grid-row-title">{{ job.role }}</div>
          <div class="grid-row-sub">{{ job.org }}</div>
          <p class="grid-row-text">{{ job.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
