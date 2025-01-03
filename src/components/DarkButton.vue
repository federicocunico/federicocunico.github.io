<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Icon } from '@iconify/vue'
import { Switch } from '@/components/ui/switch'
import { useColorMode } from '@vueuse/core'
import { computed, onBeforeMount } from 'vue'

// Pass { disableTransition: false } to enable transitions
const mode = useColorMode()

// onBeforeMount(() => {
//     if (mode.value === 'auto') {
//         mode.value = 'dark'
//     }
// })

// Determine whether the toggle is in dark mode
const isDarkMode = computed(() => mode.value === 'dark')

// Function to toggle the theme
const toggleTheme = () => {
  mode.value = isDarkMode.value ? 'light' : 'dark'
}

</script>

<!--
<template>
  <div class="flex items-center space-x-2">
    <button id="theme-toggle" @click="toggleTheme" class="relative inline-flex h-8 w-16 items-center rounded-full bg-gray-200 p-1
      transition-colors duration-1000 dark:bg-gray-700">
      <span class="
        h-6 w-6 rounded-full bg-white shadow-md
        transform transition-transform duration-300
        dark:translate-x-8 dark:bg-yellow-400">
      </span>

      <span class="absolute left-2 transition-opacity duration-300 dark:opacity-0">
        <Icon icon="radix-icons:moon" class="h-5 w-5 text-gray-500" />
      </span>
      <span class="absolute right-2 opacity-0 transition-opacity duration-300 dark:opacity-100">
        <Icon icon="radix-icons:sun" class="h-5 w-5 text-yellow-400" />
      </span>
    </button>
    <label for="theme-toggle" class="sr-only">Toggle theme</label>
  </div>
</template> -->


<template>
  <Button variant="outline" @click="toggleTheme">
    <Icon icon="radix-icons:moon"
      class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
    <Icon icon="radix-icons:sun"
      class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    <span class="sr-only">Toggle theme</span>
  </Button>
</template>

<!-- <template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline">
        <Icon icon="radix-icons:moon"
          class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Icon icon="radix-icons:sun"
          class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span class="sr-only">Toggle theme</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="mode = 'light'">
        Light
      </DropdownMenuItem>
      <DropdownMenuItem @click="mode = 'dark'">
        Dark
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template> -->
