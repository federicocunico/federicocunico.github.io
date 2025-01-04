<script setup lang="ts">
import { onMounted, ref } from 'vue'

// Define the props
const props = defineProps<{
  as?: string
  class?: string
  href?: string
  heading: string
  subheading: string
  date: string
  imagePath?: string
  altText?: string
  imageClass?: string
}>()

// Destructure props
const {
  href,
  heading,
  subheading,
  date,
  imagePath,
  altText,
  imageClass
} = props

// Create a ref for the image

const imgRef = ref('')

// load image from imagePath if it exists
async function getImagePath() {
  if (!imagePath) return;
  // import('@/assets/logo.png') // import the image
  import(/* @vite-ignore */imagePath) // import the image
    .then((image) => {
      imgRef.value = image.default
    })
    .catch((error) => {
      console.error(error)
    })
}

// Call the function to load the image
onMounted(() => {
  getImagePath()
})

</script>


<template lang="pug">
div(
  class='relative rounded-2xl border border-border bg-primary-foreground px-5 py-3 transition-all hover:border-foreground/25 hover:shadow-sm'
  :href="href"
)

  div(class="flex justify-between items-top")
    div(class="flex flex-col gap-y-1.5")
      div(class="flex flex-col gap-y-0.5")
        h1(class="text-lg font-medium" ) {{ heading }}
        h2(class="text-muted-foreground") {{ subheading }}
        h2(class="text-muted-foreground") {{ date }}
    template(v-if="imagePath")
      img(
        :src="imgRef"
        :alt="altText"
        :class="imageClass"
        loading="eager"
      )

  slot
</template>
