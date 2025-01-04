<template lang="pug">
  div(
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
  )
    div(
      class="relative w-full max-w-4xl max-h-full bg-black p-4"
    )
      button(
        class="absolute top-2 right-2 text-white bg-gray-700 rounded-full p-2 hover:bg-gray-600"
        @click="$emit('close')"
      ) X
      img(:src="`/assets/astronomy/${image}`" alt="Full Screen" class="w-full h-auto object-contain")
  </template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FullScreenModal',
  props: {
    image: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped>
/* Add additional styles if needed */
</style>
