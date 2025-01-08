<template lang="pug">
  div(
    class="flex flex-col items-start justify-center bg-background dark:bg-background text-foreground"
  )
    div(class="flex flex-row md:gap-7")
      //- Text description is a flex-col left aligned
      div(class="flex flex-col gap-4 items-start text-justify")
          h1(class="text-3xl md:text-6xl font-extrabold leading-tight")
            | {{ name }}
          h2(class="text-2xl md:text-5xl font-extrabold leading-tight")
            span(class="text-primary") {{ position }}
          p(v-for="d in selfPresentation()" class="text-lg md:text-2xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto lg:mx-0")
            | {{ d }}
      div(class="hidden md:flex flex-col items-center justify-center")
        div(class="w-[120px] h-[120px] md:w-[170px] md:h-[170px] lg:w-[250px] lg:h-[250px] rounded-full overflow-hidden shadow-xl bg-gradient-to-b from-primary via-primary/50 to-transparent")
          img(
            src="@/assets/avatar.jpg"
            alt="Avatar"
            class="object-cover w-full h-full xs:hidden block"
          )
  </template>

<script lang="ts" setup>
import { selfPresentation, name, position } from '@/texts'

// const description = `
//     I'm a software engineer developer, I work mainly in Vue.js and TypeScript for web development, and Python and C# for scripting and backend.
//     I have a formal education in Computer Science and AI and I am currently working as AI Researcher at the University of Verona, Italy.
//   `;


</script>

<style scoped>
/* Optional styles for fine-tuning */
</style>
