<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import RootContainer from './layout/RootContainer.vue';
import Header from '@/layout/Header.vue'
import Footer from '@/layout/Footer.vue'

// import Menubar from 'primevue/menubar';
// const router = useRouter();

// const items = [
//   {
//     label: 'Home',
//     icon: 'pi pi-fw pi-home',
//     command: () => {
//       router.push({ name: 'home' });
//     },
//   },
//   {
//     label: 'Code',
//     icon: 'pi pi-fw pi-user',
//     command: () => {
//       router.push({ name: 'code' });
//     },
//   },
//   {
//     label: 'Hobbies',
//     icon: 'pi pi-fw pi-envelope',
//     command: () => {
//       router.push({ name: 'hobbies' });
//     },
//   }
// ];


</script>

<template lang="pug">
RootContainer
  //- h1 Federico Cunico, PhD
  Header
  //- Menubar(:model="items")
  RouterView
  Footer

</template>

<style scoped>
.p-menubar {
  text-align: center;
}

.ui-menu-list {
  display: inline-block;
}
</style>
