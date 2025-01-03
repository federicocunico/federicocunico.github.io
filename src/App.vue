<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import Menubar from 'primevue/menubar';
const router = useRouter();

const items = [
  {
    label: 'Home',
    icon: 'pi pi-fw pi-home',
    command: () => {
      router.push({ name: '/' });
    },
  },
  {
    label: 'Code',
    icon: 'pi pi-fw pi-user',
    command: () => {
      router.push({ name: 'code' });
    },
  },
  {
    label: 'Hobbies',
    icon: 'pi pi-fw pi-envelope',
    command: () => {
      router.push({ name: 'hobbies' });
    },
  }
];


</script>

<template lang="pug">
div
  h1 Federico Cunico, PhD
  Menubar(:model="items")
  RouterView

</template>
