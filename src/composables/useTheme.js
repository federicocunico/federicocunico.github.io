import { ref, watch } from 'vue'

const STORAGE_KEY = 'site-theme'

// Light is the default; index.html applies the stored choice before first paint.
function initialDark() {
  try { return localStorage.getItem(STORAGE_KEY) === 'dark' } catch (e) { return false }
}

const isDark = ref(initialDark())

watch(
  isDark,
  (dark) => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
    try { localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light') } catch (e) {}
  },
  { immediate: true }
)

export function useTheme() {
  return { isDark, toggleTheme: () => { isDark.value = !isDark.value } }
}
