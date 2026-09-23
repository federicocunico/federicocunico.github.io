import { createRouter, createWebHistory } from 'vue-router'
import { watch } from 'vue'
import { useLang } from './composables/useLang'
import HomePage from './pages/HomePage.vue'

// Order and numbering used by the header and the home index.
export const NAV = [
  { name: 'home', key: 'home', num: '00', path: '/' },
  { name: 'cv', key: 'cv', num: '01', path: '/cv' },
  { name: 'research', key: 'research', num: '02', path: '/research' },
  { name: 'photo', key: 'photo', num: '03', path: '/photography' },
  { name: 'astro', key: 'astro', num: '04', path: '/astrophotography' },
  { name: 'music', key: 'music', num: '05', path: '/music' }
]

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/research', name: 'research', component: () => import('./pages/ResearchPage.vue') },
  { path: '/astrophotography', name: 'astro', component: () => import('./pages/AstroPage.vue') },
  { path: '/photography', name: 'photo', component: () => import('./pages/PhotographyPage.vue') },
  { path: '/music', name: 'music', component: () => import('./pages/MusicPage.vue') },
  { path: '/cv', name: 'cv', component: () => import('./pages/CvPage.vue') },
  { path: '/:pathMatch(.*)*', name: 'notFound', component: () => import('./pages/NotFoundPage.vue') }
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, saved) {
    return saved || { top: 0 }
  }
})

// Keep the document title in sync with the page and the language.
const { t } = useLang()
function updateTitle() {
  const name = router.currentRoute.value.name
  const title = t.value.pageTitle[name]
  document.title = name === 'home' || !title ? t.value.pageTitle.home : `${title} — Federico Cunico`
}
router.afterEach(updateTitle)
watch(t, updateTitle)
