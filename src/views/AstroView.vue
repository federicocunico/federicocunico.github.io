<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';
import FullScreenModal from '@/components/astronomy/FullScreenModal.vue';
import type { AstronomyEntry } from '@/lib/astronomy_entry';


const astronomyEntries = ref<AstronomyEntry[]>([]);

onBeforeMount(() => {
  import("@/assets/astronomy.json")
    .then((res) => {
      let entries = res.default as AstronomyEntry[];

      // Sort entries by date
      entries.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });

      astronomyEntries.value = entries;

    })
    .catch((err) => {
      console.error(err);
    });
});


const modalVisible = ref(false);
const selectedEntry = ref<AstronomyEntry | null>(null);

const openModal = (entry: AstronomyEntry) => {
  selectedEntry.value = entry;
  modalVisible.value = true;
};

const closeModal = () => {
  modalVisible.value = false;
  selectedEntry.value = null;
};


</script>


<template lang="pug">
div(class="flex flex-wrap gap-4 justify-center items-center")
  div(
    v-for="(entry, index) in astronomyEntries"
    :key="index"
    class="relative w-48 h-48 bg-gray-200 rounded-lg overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform"
    @click="openModal(entry)"
  )
    img(
      :src="`/astronomy/${entry.filename}`"
      alt="Preview"
      class="object-cover w-full h-full"
    )
  FullScreenModal(
    v-if="modalVisible && selectedEntry"
    :entry="selectedEntry"
    @close="closeModal"
  )
</template>
