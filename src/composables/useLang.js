import { ref, watch, computed } from 'vue'
import { CONTENT } from '../siteContent'

const STORAGE_KEY = 'site-lang'

function initialLang() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'it' || stored === 'en') return stored
  } catch (e) {}
  return 'en' // default language
}

// Module-level state: one language for the whole app.
const lang = ref(initialLang())
const t = computed(() => CONTENT[lang.value])

watch(
  lang,
  (value) => {
    try { localStorage.setItem(STORAGE_KEY, value) } catch (e) {}
    document.documentElement.lang = value
  },
  { immediate: true }
)

export function useLang() {
  return {
    lang,
    t,
    setLang: (value) => { lang.value = value }
  }
}
