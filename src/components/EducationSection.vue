<script setup>
defineProps({
  t: { type: Object, required: true }
})
</script>

<template>
  <section id="formazione" class="section-block">
    <h2 class="section-label" style="margin-bottom: 24px">{{ t.educationTitle }}</h2>
    <div>
      <div v-for="edu in t.education" :key="edu.degree + edu.period" class="grid-row">
        <div class="grid-row-period">{{ edu.period }}</div>
        <div>
          <div class="grid-row-title">{{ edu.degree }}</div>
          <div class="grid-row-sub">{{ edu.org }}</div>
          <p class="grid-row-text">{{ edu.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
