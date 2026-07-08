import { ref, watch, computed } from 'vue'

const STORAGE_KEY = 'site-theme'
const DARK_ACCENT = '#D4B36A'
const LIGHT_ACCENT = '#8A742F'

const darkPalettes = {
  '--bg': '#0B0E16',
  '--ink': '#E9E6DD',
  '--soft': '#C9CBD1',
  '--muted': '#9AA0AE',
  '--rule': '#232838',
  '--card': 'rgba(255,255,255,0.02)',
  '--navbg': 'rgba(11,14,22,0.85)',
  '--pill': 'rgba(0,0,0,0.25)',
  '--heroImgOpacity': '0.35'
}

const lightPalettes = {
  '--bg': '#FBFAF7',
  '--ink': '#1C1A17',
  '--soft': '#45413A',
  '--muted': '#6B6459',
  '--rule': '#E7E2D8',
  '--card': 'rgba(255,255,255,0.7)',
  '--navbg': 'rgba(251,250,247,0.9)',
  '--pill': 'rgba(255,255,255,0.6)',
  '--heroImgOpacity': '0.16'
}

export function useTheme(defaultDark = true) {
  const stored = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null
  const isDark = ref(stored ? stored === 'dark' : defaultDark)

  const accent = computed(() => (isDark.value ? DARK_ACCENT : LIGHT_ACCENT))
  const themeIcon = computed(() => (isDark.value ? '☀' : '☾'))

  function applyTheme() {
    const root = document.documentElement
    const palette = isDark.value ? darkPalettes : lightPalettes
    const accentValue = accent.value

    Object.entries(palette).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })
    root.style.setProperty('--accent', accentValue)
    root.style.setProperty('--rule2', `${accentValue}66`)
  }

  watch(isDark, () => {
    localStorage.setItem(STORAGE_KEY, isDark.value ? 'dark' : 'light')
    applyTheme()
  }, { immediate: true })

  function toggleTheme() {
    isDark.value = !isDark.value
  }

  return { isDark, accent, themeIcon, toggleTheme }
}
