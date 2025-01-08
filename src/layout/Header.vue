<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { RouterLink, useRouter } from 'vue-router';
import DarkButton from '@/components/ui/DarkButton.vue'
import { computed, ref } from 'vue';

const router = useRouter()
const currentRoute = computed(() => router.currentRoute.value.name)

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

const toGoogleScholar = () => {
  window.open('https://scholar.google.it/citations?user=fvOYgyAAAAAJ', '_blank')
}

const toGithub = () => {
  window.open('https://github.com/federicocunico', '_blank')
}

const isMenuOpen = ref(false) // State for the collapsible menu
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

</script>


<template lang="pug">
  div(class="relative flex justify-between mb-12 items-center")
    div
      div(class="text-xl font-semibold") {{ getLabelText }}
    div(class="hidden md:flex flex-wrap gap-1 items-center")
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

    //- Hamburger menu for small screens
    Button(
      class="md:hidden text-[1.5rem] p-2"
      variant="ghost"
      @click="toggleMenu"
    ) ☰

    //- Collapsible menu
    transition(name="fade")
      div(v-if="isMenuOpen" class="absolute top-full left-0 w-full bg-white dark:bg-gray-800 shadow-md p-4 md:hidden")
        div(class="flex flex-col gap-2")
          RouterLink(:to="{ name: 'home' }" @click="toggleMenu")
            Button(variant="ghost" class="text-[1.05rem] font-medium hover:text-foreground/75 dark:hover:text-foreground/50") Home
          RouterLink(:to="{ name: 'resume' }" @click="toggleMenu")
            Button(variant="ghost" class="text-[1.05rem] font-medium hover:text-foreground/75 dark:hover:text-foreground/50") Resume
          div
            Button(variant="ghost" @click="toGithub" class="text-[1.05rem] font-medium hover:text-foreground/75 dark:hover:text-foreground/50") Code
          div
            Button(variant="ghost" @click="toGoogleScholar" class="text-[1.05rem] font-medium hover:text-foreground/75 dark:hover:text-foreground/50") Papers
          RouterLink(:to="{ name: 'hobbies' }" @click="toggleMenu")
            Button(variant="ghost" class="text-[1.05rem] font-medium hover:text-foreground/75 dark:hover:text-foreground/50") Hobbies
          DarkButton
  </template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
