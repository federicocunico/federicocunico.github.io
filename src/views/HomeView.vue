<template lang="pug">
  div(
    class="flex items-start justify-center bg-background dark:bg-background text-foreground min-h-screen"
  )
    div(class="container mx-auto px-6 lg:px-12 text-center lg:text-left")
      div(class="lg:flex lg:items-center lg:justify-between")
        div(class="lg:w-2/3 space-y-6")
          h1(class="text-3xl md:text-6xl font-extrabold leading-tight")
            | {{ name }}
          h2(class="text-2xl md:text-5xl font-extrabold leading-tight mt-4")
            span(class="text-primary") {{ title }}
          p(v-for="d in description" class="text-lg md:text-2xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto lg:mx-0")
            | {{ d }}
          div(class="flex flex-wrap gap-4 justify-center lg:justify-start mt-6")
            <slot name="navigation-buttons" />
        div(class="mt-10 lg:mt-0 lg:w-1/3 flex justify-center lg:justify-end")
          div(class="relative w-56 h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden shadow-xl bg-gradient-to-b from-primary via-primary/50 to-transparent")
            img(
              src="@/assets/avatar.jpg"
              alt="Avatar"
              class="object-cover w-full h-full"
            )
  </template>

<script lang="ts" setup>
const name = 'Federico Cunico'; // Replace with your name
const title = 'Software Engineer & AI Researcher'; // Replace with your expertise
// const description = `
//     I'm a software engineer developer, I work mainly in Vue.js and TypeScript for web development, and Python and C# for scripting and backend.
//     I have a formal education in Computer Science and AI and I am currently working as AI Researcher at the University of Verona, Italy.
//   `;
const description = [
  `Hi, I’m a Software Engineer who loves solving complex problems and creating
seamless web experiences with Vue.js and TypeScript.`,
  `I also bring expertise in backend development with Python and C#.
With a strong foundation in Computer Science and Artificial Intelligence,
I am currently working as AI Researcher at the University of Verona, Italy.
`,
  'Feel free to explore my work and get in touch!'
] as Array<string>;

</script>

<style scoped>
/* Optional styles for fine-tuning */
</style>
