<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import RootContainer from './layout/RootContainer.vue';
import Header from '@/layout/Header.vue'
import Footer from '@/layout/Footer.vue'

import { getLocale } from "@/texts"

getLocale()

</script>

<template lang="pug">
RootContainer
  //- h1 Federico Cunico, PhD
  Header
  //- Menubar(:model="items")
  RouterView
  Footer

</template>
