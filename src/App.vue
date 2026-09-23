<script setup>
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import PlayerBar from './components/PlayerBar.vue'
import { usePlayer } from './composables/usePlayer'

const { current } = usePlayer()
</script>

<template>
  <div class="app" :class="{ 'has-player': current }">
    <SiteHeader />
    <main class="wrap">
      <RouterView />
    </main>
    <SiteFooter />
    <PlayerBar />
  </div>
</template>

<style scoped>
.app { min-height: 100vh; }
.app.has-player { padding-bottom: 78px; }
</style>
