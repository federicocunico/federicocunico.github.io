<script setup>
defineProps({
  t: { type: Object, required: true },
  cvPdf: { type: String, required: true },
  links: { type: Object, required: true }
})
</script>

<template>
  <section id="contatti" class="section-block contact">
    <h2 class="section-label">{{ t.contactTitle }}</h2>
    <p class="contact-text">{{ t.contactText }}</p>
    <div class="contact-actions">
      <a :href="links.linkedin" target="_blank" rel="noopener" class="btn-primary">LinkedIn</a>
      <a :href="cvPdf" target="_blank" rel="noopener" class="btn-secondary">{{ t.downloadCv }}</a>
    </div>
  </section>
</template>

<style scoped>
.contact {
  padding-bottom: clamp(48px, 11vw, 72px);
  text-align: center;
}

.contact-text {
  margin: 0 auto 22px auto;
  font-size: clamp(20px, 6vw, 25px);
  font-weight: 300;
  font-style: italic;
  line-height: 1.5;
  max-width: 480px;
  text-wrap: pretty;
}

.contact-actions {
  display: flex;
  justify-content: center;
  gap: 14px;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary {
  font-family: 'Public Sans', sans-serif;
  font-size: 13.5px;
  font-weight: 600;
  text-decoration: none;
  padding: 11px 24px;
  border-radius: 999px;
}

.btn-primary {
  background: var(--accent, #D4B36A);
  color: #14120a;
}

.btn-primary:hover {
  opacity: 0.88;
}

.btn-secondary {
  border: 1px solid var(--accent, #D4B36A);
  color: var(--accent, #D4B36A);
}

.btn-secondary:hover {
  background: var(--accent, #D4B36A);
  color: #14120a;
}
</style>
