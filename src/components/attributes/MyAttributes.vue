<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { BriefcaseBusiness, MapPin, Clock, Files } from 'lucide-vue-next';

// current time in Italy, only hours and minutes
// let intervCallback = null as any;
// const currentTime = ref<string>('');
// const updateTime = () => {
//   currentTime.value = new Date().toLocaleString('en-IT', {
//     hour: '2-digit',
//     minute: '2-digit',
//   });
// };

// onMounted(() => {
//   updateTime();
//   intervCallback = setInterval(updateTime, 1000);
// });

// // clear interval on unmounted
// onUnmounted(() => {
//   if (intervCallback) {
//     clearInterval(intervCallback);
//   }
// });

</script>

<template lang="pug">
  div(class="flex gap-3")
    div(class="flex items-center gap-1")
      BriefcaseBusiness
      //- div(class="flex flex-col justify-center items-center")
      //-   span Full-Stack
      //-   span Developer
      //-   span <span>&#8746;</span>
      //-   span AI Researcher
      //- intersection
      //- span Full-Stack Developer <span>&#8745;</span> AI Researcher
      //- union
      span Full-Stack Developer <span>&#8746;</span> AI Researcher

    div(class="flex items-center gap-1")
      MapPin
      span Verona, Italy

    //- div(class="flex items-center gap-1")
    //-   Clock
    //-   span {{ currentTime }}

    //- div(class="flex items-center gap-1")
    //-   i.pi.pi-envelope.text-xl
    //-   span
</template>
