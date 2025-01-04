<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';
import FullScreenModal from '@/components/FullScreenModal.vue';

const images = ref([
  'HorseNebula.jpg',
  'M1-Crab.jpg',
  'M3-cluster.jpg',
  'M33-triangulum.jpg',
  'M45-Pleiadis.jpg',
  'M45-Pleiadis_3h.jpg',
  'NGC2024-FlameNebula.jpg',
  'RosettaNebula.jpg',
  // Add more image file names TODO
]);

// const images = ref<Array<string>>([]);

const modalVisible = ref(false);
const selectedImage = ref<string | null>(null);

const openModal = (image: string) => {
  selectedImage.value = image;
  modalVisible.value = true;
};

const closeModal = () => {
  modalVisible.value = false;
  selectedImage.value = null;
};


</script>


<template lang="pug">
  div(class="flex flex-wrap gap-4 justify-center p-4")
    div(
      v-for="(image, index) in images"
      :key="index"
      class="relative w-48 h-48 bg-gray-200 rounded-lg overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform"
      @click="openModal(image)"
    )
      img(
        :src="`/astronomy/${image}`"
        alt="Preview"
        class="object-cover w-full h-full"
      )
    FullScreenModal(
      v-if="modalVisible && selectedImage"
      :image="selectedImage"
      @close="closeModal"
    )
  </template>

<style scoped>
/* Add any additional styling here */
</style>
