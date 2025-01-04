<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { RouterLink, useRouter } from 'vue-router';
import DarkButton from '@/components/DarkButton.vue'
import { computed } from 'vue';

const router = useRouter()
const currentRoute = computed(() => router.currentRoute.value.name)

const toGoogleScholar = () => {
  window.open('https://scholar.google.it/citations?user=fvOYgyAAAAAJ', '_blank')
}

const toGithub = () => {
  window.open('https://github.com/federicocunico', '_blank')
}

const getLabelText = computed(() => {
  if (currentRoute.value === 'resume') {
    return 'Resume'
  } else if (currentRoute.value === 'hobbies') {
    return 'Federico Cunico'
  }
  // else if (currentRoute.value === 'home') {
  //   return 'Home'
  // }
  return "Federico Cunico"  // default
})


</script>


<template lang="pug">
div(class="flex justify-between mb-12")
  div
    div(class="text-xl font-semibold") {{ getLabelText }}
  div(class="flex flex-wrap gap-1 items-center")
    RouterLink(:to="{ name: 'home' }")
      Button(variant="ghost" class="text-[1.05rem] font-medium hover:text-foreground/75") Home
    RouterLink(:to="{ name: 'resume' }")
      Button(variant="ghost" class="text-[1.05rem] font-medium hover:text-foreground/75") Resume
    div
      Button(variant="ghost" @click="toGithub" class="text-[1.05rem] font-medium hover:text-foreground/75") Code
    div
      Button(variant="ghost" @click="toGoogleScholar" class="text-[1.05rem] font-medium hover:text-foreground/75") Papers
    RouterLink(:to="{ name: 'hobbies' }")
      Button(variant="ghost" class="text-[1.05rem] font-medium hover:text-foreground/75") Hobbies
    DarkButton


</template>
