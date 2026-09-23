<script setup>
defineProps({
  index: { type: String, required: true },
  meta: { type: String, default: '' },
  title: { type: String, required: true }
})
</script>

<template>
  <section class="head grid12">
    <div class="kicker mono rule-top"><span>{{ index }}</span><span>{{ meta }}</span></div>
    <h1 class="display title rise">{{ title }}</h1>
    <div class="aside rise-2"><slot /></div>
  </section>
</template>

<style scoped>
.head { padding: 72px 0 48px; }
.kicker { grid-column: 1 / -1; display: flex; justify-content: space-between; gap: 16px; }
.kicker span:first-child { white-space: nowrap; }
.kicker span:last-child { text-align: right; }
.title { grid-column: 1 / span 8; margin-top: 32px; overflow-wrap: anywhere; hyphens: auto; }
.aside { grid-column: 9 / span 4; margin-top: 44px; display: flex; flex-direction: column; gap: 16px; }

@media (max-width: 1024px) {
  .title { grid-column: 1 / -1; }
  .aside { grid-column: 1 / span 8; margin-top: 8px; }
}

@media (max-width: 720px) {
  .head { padding: 40px 0 24px; row-gap: 20px; }
  .title { margin-top: 0; font-size: clamp(42px, 12vw, 56px); }
  .aside { grid-column: 1 / -1; margin-top: 0; }
}
</style>
