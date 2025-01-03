<script lang="ts" setup>
import MyAttributes from '@/components/attributes/MyAttributes.vue';
import OpenToWork from '@/components/OpenToWork.vue';
</script>

<template lang="pug">
  .flex.flex-col.items-center.pt-6
    //- Avatar Image
    .w-40.h-40.rounded-full.overflow-hidden.mb-6
      img(src="@/assets/avatar.jpg", alt="Avatar", class="w-full h-full object-cover")

    //- Info Items in a Row
    .md-container.md-mx-auto
      div(class="text-3xl font-bold") Federico Cunico, PhD

    div.pt-3
      OpenToWork
    div.pt-3
      MyAttributes
    div.pt-5


</template>
