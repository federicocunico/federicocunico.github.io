<script setup lang="ts">
import {getLocale, _IT_LOCALE} from "@/texts"
const text = () => {
  if (getLocale() === _IT_LOCALE) {
    return 'Disponibile'
  } else {
    return 'Open to work'
  }
}
</script>

<template>
  <div
    class='flex justify-center items-center gap-x-3 rounded-3xl border border-input px-4 py-2 text-sm shadow-sm transition-all hover:shadow-md'>
    <span class='relative flex items-center justify-center'>
      <span
        class='absolute inline-flex h-2 w-2 animate-ping rounded-full border border-green-400 bg-green-400 opacity-75'></span>
      <span class='relative inline-flex h-2 w-2 rounded-full bg-green-400'></span>
    </span>

    <p class='font-medium'>{{text()}}</p>
  </div>
</template>
