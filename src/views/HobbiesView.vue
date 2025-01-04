<script setup lang="ts">
import AstroView from './AstroView.vue';
</script>
<template lang="pug">
div(class="flex flex-col gap-4 items-center justify-normal")

  section(class="flex flex-col items-start gap-4 rounded-md bg-primary-foreground dark:bg-primary-foreground")
    h1(class="text-2xl font-bold" style="color: red;") This section is a work in progress

  section(class="flex flex-col items-start gap-4 rounded-md bg-primary-foreground dark:bg-primary-foreground")
    h1(class="text-2xl font-bold") Astrophotography
    p One of my passions is Astrophotography. Below you can find some of the images I took. I usually tend to shoot deep sky objects, but I also enjoy wide field photography.
    p I started in August 2024, and I am still learning new techniques and improving my skills.
    AstroView

  section(class="flex flex-col items-start gap-4 rounded-md bg-primary-foreground dark:bg-primary-foreground")
    h1(class="text-2xl font-bold") Music
    p I also enjoy playing the guitar, and other instruments. From time to time, I do like to create music. I am planning to release some of my works on Spotify, SoundCloud or similar platforms.
    p A dedicated section may be coming soon...
</template>
