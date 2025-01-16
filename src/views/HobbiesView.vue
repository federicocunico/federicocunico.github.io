<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'

import AstroMosaic from './AstroView.vue';

</script>
<template lang="pug">
div(class="flex flex-col gap-4 items-center justify-normal")

  //- ASTROPHOTOGRAPHY
  Card
    CardHeader(class="flex flex-row items-center justify-between space-y-0 pb-2")
      CardTitle(class="text-2xl font-medium") Astrophotography

    CardContent
      div(class="text-xl font-normal")
        | One of my passions is Astrophotography. Below you can find some of the images I took. I usually tend to shoot deep sky objects, due to my current hardware limitations, but I also enjoy wide field photography.
      div(class="text-xl font-normal")
        | I started in August 2024, and I am still learning new techniques and improving my skills.

  AstroMosaic

  Separator(class="my-4")

  //- MUSIC
  Card
    CardHeader(class="flex flex-row items-center justify-between space-y-0 pb-2")
      CardTitle(class="text-2xl font-medium") Music production

    CardContent
      div(class="text-xl font-normal")
        | I also enjoy playing the guitar, and other instruments. From time to time, I do like to create music. In January 2025, to celebrate my 15 years into the music writing journey, I released an album called "Legacy" that includes my best works across a period of 10 years, from 2012 to 2022.
      div(class="text-xl font-normal")
        | I have never shared my music with the public, but I thought it would be a good idea to start doing so. Here is my SoundCloud page, if you like to give it a listen:
      //- Button(variant="link" href="https://soundcloud.com/incomplete-sounds") Incomplete Sounds
      //- div(class="text-xl font-normal")
      //-   a(href="https://soundcloud.com/incomplete-sounds") Incomplete Sounds

  <iframe  width="80%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1951965371&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/incomplete-sounds" title="Incomplete Sounds" target="_blank" style="color: #cccccc; text-decoration: none;">Incomplete Sounds</a> · <a href="https://soundcloud.com/incomplete-sounds/sets/legacy" title="Legacy" target="_blank" style="color: #cccccc; text-decoration: none;">Legacy</a></div>


  //- section(class="flex flex-col items-start gap-4 rounded-md bg-primary-foreground dark:bg-primary-foreground")
  //-   h1(class="text-2xl font-bold" style="color: red;") This section is a work in progress

  //- section(class="flex flex-col items-start gap-4 rounded-md bg-primary-foreground dark:bg-primary-foreground")
  //-   h1(class="text-2xl font-bold") Astrophotography
  //-   p One of my passions is Astrophotography. Below you can find some of the images I took. I usually tend to shoot deep sky objects, but I also enjoy wide field photography.
  //-   p I started in August 2024, and I am still learning new techniques and improving my skills.


  //- section(class="flex flex-col items-start gap-4 rounded-md bg-primary-foreground dark:bg-primary-foreground")
  //-   h1(class="text-2xl font-bold") Music
  //-   p I also enjoy playing the guitar, and other instruments. From time to time, I do like to create music.
  //-   p Here is my SoundCloud page, if you like to give it a listen.

</template>
