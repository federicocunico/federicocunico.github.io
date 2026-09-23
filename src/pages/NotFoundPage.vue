<script setup>
import { useLang } from '../composables/useLang'
import PageHead from '../components/PageHead.vue'

const { t } = useLang()
</script>

<template>
  <PageHead index="404" :title="t.pageTitle.notFound">
    <p class="lead">{{ t.notFoundText }}</p>
    <RouterLink to="/" class="btn btn-solid back">{{ t.backHome }}</RouterLink>
  </PageHead>
  <div class="spacer" />
</template>

<style scoped>
.back { align-self: flex-start; }
.spacer { height: 120px; }
</style>
