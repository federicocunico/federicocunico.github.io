import { ref, watch } from 'vue'

const STORAGE_KEY = 'site-lang'

export function useLang(defaultLang = 'en') {
  const stored = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null
  const lang = ref(stored === 'it' || stored === 'en' ? stored : defaultLang)

  watch(lang, (value) => {
    localStorage.setItem(STORAGE_KEY, value)
  })

  function toggleLang() {
    lang.value = lang.value === 'en' ? 'it' : 'en'
  }

  return { lang, toggleLang, langLabel: () => (lang.value === 'en' ? 'IT' : 'EN') }
}
