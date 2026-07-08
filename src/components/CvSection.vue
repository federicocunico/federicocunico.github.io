<script setup>
import { ref } from 'vue'
import { downloadCvPdf } from '../lib/generateCvPdf'

const props = defineProps({
  t: { type: Object, required: true },
  cvPdf: { type: String, required: true },
  lang: { type: String, required: true }
})

const generating = ref(false)

async function handleGenerate() {
  if (generating.value) return
  generating.value = true
  try {
    await downloadCvPdf(props.lang)
  } catch (err) {
    console.error('CV PDF generation failed', err)
  } finally {
    generating.value = false
  }
}
</script>

<template>
  <section id="cv" class="section-block">
    <div class="cv-header">
      <h2 class="section-label">{{ t.cvTitle }}</h2>
      <div class="cv-actions">
        <button class="btn-generate" :disabled="generating" @click="handleGenerate">
          {{ generating ? t.cvGenerating : t.cvGenerate }}
        </button>
        <a :href="cvPdf" target="_blank" rel="noopener" class="link-accent cv-download">
          {{ t.downloadCv }} ↓
        </a>
      </div>
    </div>
    <p class="cv-text">{{ t.cvText }}</p>
    <div class="cv-frame">
      <object :data="cvPdf" type="application/pdf" class="cv-object">
        <div class="cv-fallback">
          <p>{{ t.cvFallback }}</p>
          <button class="btn-generate" :disabled="generating" @click="handleGenerate">
            {{ generating ? t.cvGenerating : t.cvGenerate }}
          </button>
          <a :href="cvPdf" target="_blank" rel="noopener" class="link-accent">{{ t.cvOpen }} ↗</a>
        </div>
      </object>
    </div>
  </section>
</template>

<style scoped>
.cv-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.cv-actions {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}

.btn-generate {
  font-family: 'Public Sans', sans-serif;
  font-size: 12.5px;
  font-weight: 600;
  border: 1px solid var(--accent, #D4B36A);
  background: transparent;
  color: var(--accent, #D4B36A);
  border-radius: 999px;
  padding: 6px 14px;
  cursor: pointer;
}

.btn-generate:hover:not(:disabled) {
  background: var(--accent, #D4B36A);
  color: #14120a;
}

.btn-generate:disabled {
  opacity: 0.6;
  cursor: wait;
}

.cv-download {
  font-weight: 600;
}

.cv-text {
  margin: 0 0 18px 0;
  font-size: 16px;
  font-weight: 300;
  color: var(--soft, #C9CBD1);
}

.cv-frame {
  border: 1px solid var(--rule, #232838);
  border-radius: 8px;
  overflow: hidden;
  background: var(--card, rgba(255, 255, 255, 0.02));
}

.cv-object {
  width: 100%;
  height: 720px;
  display: block;
}

.cv-fallback {
  padding: 48px 24px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

.cv-fallback p {
  margin: 0;
  font-size: 16px;
  color: var(--muted, #9AA0AE);
}
</style>
