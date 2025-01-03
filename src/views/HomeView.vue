<script lang="ts" setup>
import MyAttributes from '@/components/attributes/MyAttributes.vue';
import OpenToWork from '@/components/OpenToWork.vue';
import Section from '@/components/Section.vue';
import Card from '@/components/Card.vue';

import bioString from "@/md/short_bio.md?raw";

const bio = bioString;

</script>

<template lang="pug">
  div(class="flex flex-col items-center pt-6 gap-5")
    //- Avatar Image
    .w-40.h-40.rounded-full.overflow-hidden.mb-6
      img(src="@/assets/avatar.jpg", alt="Avatar", class="w-full h-full object-cover")

    //- Info Items in a Row
    .md-container.md-mx-auto
      div(class="text-3xl font-bold") Federico Cunico, PhD


    OpenToWork

    MyAttributes

    Section(title='About')
      p(class='text-muted-foreground')
        | {{ bio }}
    Section(title='Experience')
      Card(
        heading='Lorem Ipsum'
        subheading='Sit amet consectetur'
        date='Dec 2022 - Nov 2023'
        imagePath='/src/assets/univr_logo.png'
        altText='Lorem, ipsum dolor sit'
        imageClass='h-12 w-auto md:-left-16'
      )
        ul(class='ml-4 list-disc text-muted-foreground')
          li
            | Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore debitis recusandae, ut
            | molestiae laboriosam pariatur!

            li Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, pariatur!
      Card(
        heading='Lorem Ipsum'
        subheading='Sit amet consectetur'
        date='Dec 2022 - Nov 2023'
        imagePath='/src/assets/humatics.png'
        altText='Lorem, ipsum dolor sit'
        imageClass='h-12 w-auto md:-left-16'
      )
        ul(class='ml-4 list-disc text-muted-foreground')
          li
            | Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore debitis recusandae, ut
            | molestiae laboriosam pariatur!

            li Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, pariatur!
      Card(
        heading='Lorem Ipsum'
        subheading='Sit amet consectetur'
        date='Dec 2022 - Nov 2023'
        imagePath='/src/assets/avatar.jpg'
        altText='Lorem, ipsum dolor sit'
        imageClass='h-12 w-auto md:-left-16'
      )




</template>
