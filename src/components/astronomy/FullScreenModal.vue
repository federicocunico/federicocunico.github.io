<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import { Cross1Icon } from '@radix-icons/vue'
import type { AstronomyEntry } from '@/lib/astronomy_entry';

defineProps<{
  entry: AstronomyEntry;
}>();

const emit = defineEmits(['close'])

const handleOverlayClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  // Check if the clicked element is the overlay itself
  if (target.classList.contains('astroOverlay')) {
    // Emit the close event
    emit('close');
  }
};

</script>


<template lang="pug">
  div(
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 astroOverlay"
    @click="handleOverlayClick"
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
          :src="`/astronomy/${entry.filename}`"
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
            | {{ entry.title }}
          p(class="text-sm mt-4")
            | Date: {{ entry.date }}
          p(class="text-sm")
            | Equipment: {{ entry.equipment }}
          p(class="text-sm")
            | Total integration time: {{ entry.total_integration }}

          p(class="text-md mt-2 leading-relaxed")
            | {{ entry.description }}
          //- vertical separator
          div(class="border-r border-gray-300 dark:border-gray-600 w-full mx-4")
          //- metadata

  </template>
