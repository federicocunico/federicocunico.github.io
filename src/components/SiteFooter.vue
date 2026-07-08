<script setup>
defineProps({
  location: { type: String, required: true }
})
</script>

<template>
  <footer class="site-footer">
    <span>© 2026 Federico Cunico</span>
    <span>{{ location }}</span>
  </footer>
</template>

<style scoped>
.site-footer {
  border-top: 1px solid var(--rule, #232838);
  padding: 20px 0 32px 0;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 8px;
  font-family: 'Public Sans', sans-serif;
  font-size: 12px;
  color: var(--muted, #9AA0AE);
}
</style>
