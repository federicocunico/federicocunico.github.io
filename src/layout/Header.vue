<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { RouterLink } from 'vue-router';
import DarkButton from '@/components/DarkButton.vue'

const toGoogleScholar = () => {
  window.open('https://scholar.google.it/citations?user=fvOYgyAAAAAJ', '_blank')
}

const toGithub = () => {
  window.open('https://github.com/federicocunico', '_blank')
}

</script>


<template lang="pug">
div(class="flex justify-between")
  div
    div(class="text-xl font-semibold") Curriculum Vitae
  div(class="flex gap-1 items-center")
    RouterLink(:to="{ name: 'home' }")
      Button(variant="ghost" class="text-[1.05rem] font-medium hover:text-foreground/75") Home
    //- RouterLink(:to="{ name: 'code' }")
    //-   Button(variant="ghost" class="text-[1.05rem] font-medium hover:text-foreground/75") Code
    div
      Button(variant="ghost" @click="toGithub" class="text-[1.05rem] font-medium hover:text-foreground/75") Code
    div
      Button(variant="ghost" @click="toGoogleScholar" class="text-[1.05rem] font-medium hover:text-foreground/75") Papers
    RouterLink(:to="{ name: 'hobbies' }")
      Button(variant="ghost" class="text-[1.05rem] font-medium hover:text-foreground/75") Hobbies
    DarkButton


</template>
