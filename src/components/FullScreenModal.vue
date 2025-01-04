<template lang="pug">
  div(
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
  )
    div(
      class="relative flex bg-black text-white max-w-7xl max-h-[90vh] w-full h-[90vh] rounded-lg overflow-hidden"
    )
      button(
        class="absolute top-2 right-2 text-white bg-gray-700 rounded-full p-2 hover:bg-gray-600"
        @click="$emit('close')"
      )
        Cross1Icon(class="w-6 h-6")

      div(class="w-2/3 bg-black flex items-center justify-center")
        img(
          :src="`/astronomy/${image}`"
          alt="Full Screen"
          class="w-full max-h-[90vh] h-auto object-contain"
        )

      div(
        class="w-1/3 flex flex-col justify-between bg-primary-foreground dark:bg-primary-foreground text-foreground dark:text-foreground h-full"
      )
        div(
          class="p-6 m-4 rounded-lg shadow-lg bg-primary-foreground dark:bg-primary-foreground flex flex-col justify-start flex-1"
        )
          h2(class="text-2xl font-bold mb-4 border-b pb-2 border-gray-300 dark:border-gray-600")
            | {{ title }}
          p(class="text-md mt-2 leading-relaxed")
            | {{ description }}
  </template>

<script lang="ts" setup>

import { Cross1Icon } from '@radix-icons/vue'

defineProps({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
/* Add additional styles if needed */
</style>
