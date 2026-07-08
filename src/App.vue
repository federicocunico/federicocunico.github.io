<script setup>
import { ref, computed } from 'vue'
import { useLang } from './composables/useLang'
import { useTheme } from './composables/useTheme'
import { CONTENT, CONFIG, ASTRO, LINKS } from './siteContent'
import SiteNav from './components/SiteNav.vue'
import HeroSection from './components/HeroSection.vue'
import ResearchSection from './components/ResearchSection.vue'
import PublicationsSection from './components/PublicationsSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import EducationSection from './components/EducationSection.vue'
import PassionsSection from './components/PassionsSection.vue'
import CvSection from './components/CvSection.vue'
import ContactSection from './components/ContactSection.vue'
import SiteFooter from './components/SiteFooter.vue'
import LightboxModal from './components/LightboxModal.vue'

const { lang, toggleLang, langLabel } = useLang('en')
const { isDark, accent, themeIcon, toggleTheme } = useTheme(true)

const menuOpen = ref(false)
const lightbox = ref(null)

const t = computed(() => CONTENT[lang.value])

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}

function openLightbox(photo) {
  lightbox.value = photo
}

function closeLightbox() {
  lightbox.value = null
}
</script>

<template>
  <SiteNav
    :t="t"
    :lang-label="langLabel()"
    :theme-icon="themeIcon"
    :menu-open="menuOpen"
    @toggle-lang="toggleLang"
    @toggle-theme="toggleTheme"
    @toggle-menu="toggleMenu"
    @close-menu="closeMenu"
  />

  <HeroSection :t="t" :config="CONFIG" :links="LINKS" />

  <div class="content-wrap">
    <ResearchSection :t="t" />
    <PublicationsSection :t="t" :lang="lang" :accent="accent" />
    <ExperienceSection :t="t" />
    <EducationSection :t="t" />
    <PassionsSection :t="t" :astro="ASTRO" :links="LINKS" @open-photo="openLightbox" />
    <CvSection :t="t" :cv-pdf="CONFIG.cvPdf" :lang="lang" />
    <ContactSection :t="t" :cv-pdf="CONFIG.cvPdf" :links="LINKS" />
    <SiteFooter :location="CONFIG.location" />
  </div>

  <LightboxModal :photo="lightbox" @close="closeLightbox" />
</template>
