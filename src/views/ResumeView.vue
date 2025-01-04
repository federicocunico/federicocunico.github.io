<script lang="ts" setup>
import MyAttributes from '@/components/MyAttributes.vue';
import OpenToWork from '@/components/OpenToWork.vue';
import Section from '@/components/Section.vue';
import Card from '@/components/Card.vue';
import SkillLayout from '@/components/SkillLayout.vue';

import bioString from "@/md/short_bio.md?raw";

const bio = bioString;

</script>

<template lang="pug">
  div(class="flex flex-col pt-6 gap-6")
    div(class="flex flex-col items-center gap-4")
      //- Avatar Image
      div.w-40.h-40.rounded-full.overflow-hidden
        img(src="@/assets/avatar.jpg", alt="Avatar", class="w-full h-full object-cover")

      //- Info Items in a Row
      div.md-container.md-mx-auto
        div(class="text-3xl font-bold") Federico Cunico, PhD


      OpenToWork

      MyAttributes

    Section(title='About')
      p(class='text-muted-foreground')
        | {{ bio }}
    Section(title='Experience')
      Card(
        heading='Assistant Researcher'
        subheading='University of Verona'
        date='Oct 2024 - Dec 2025'
      )
        ul(class='section-ul')
          li
            | I am currently working as an Assistant Researcher at the University of Verona, Italy. My research
            | focuses on the development of novel algorithms for robotic assisted medical surgery, in particular
            | from the computer vision perspective.
      Card(
        heading='AI Software Engineer'
        subheading='Humatics s.r.l.'
        date='Feb 2020 - Oct 2021'
        imageClass="h-[50px] w-auto"
      )
        ul(class='ml-4 list-disc text-muted-foreground')
          li
            | I worked as an AI Software Engineer at Humatics s.r.l., a startup company based in Verona, Italy.
            | My main tasks were the development of computer vision algorithms for industrial applications,
            | in particular for the analysis of surveillance videos.

    Section(title='Education')
      Card(
        heading='Doctor of Phylosophy - Computer Science'
        subheading='University of Verona'
        date='Oct 2021 - Oct 2024'
        imagePath='/univr_logo.png'
        imageClass="h-[70px] w-auto"
        altText='University of Verona'
      )
        ul(class='section-ul')
          li
            | I pursued the PhD program in Computer Science at the University of Verona, Italy. My research
            | focused on the development of novel algorithms for computer vision and deep learning applied to
            | industrial scene analysis including surveillance scenarios and human-robot interaction.
          li
            | During my PhD I had the opportunity to work as a visiting researcher at the
            | University of Glasgow under the supervision of Professor Alessandro Vinciarelli for a total of 6 months
            | and at the Leibniz University of Hannover, under the supervision of Professor Bodo Rosenhahn for a total of 3 months.

      Card(
        heading="Masters's Degree in Engineering and Computer Science"
        subheading='University of Verona'
        date='Oct 2017 - Jul 2019'
        imagePath='/univr_logo.png'
        imageClass="h-[70px] w-auto"
        altText='University of Verona'
      )
        ul(class='section-ul')
          li
            | I studied Engineering and Computer Science at the University of Verorna,
            | with a focus on Computer Vision. My master's thesis implemented a deep learning model
            | for 6-DoF object pose estimation in industrial scenarios.
            | I successfully completed my master's thesis in the first useful date for the graduation session.

      Card(
        heading="Bachelor's Degree in Bioinformatics"
        subheading='University of Verona'
        date='Oct 2014 - Jul 2017'
        imagePath='/src/assets/univr_logo.png'
        imageClass="h-[70px] w-auto"
        altText='University of Verona'
      )
        ul(class='section-ul')
          li
            | I studied Bioinformatics, a discipline that combines computer science, statistics, and biology.
            | I successfully completed my bachelor's thesis in the first useful date for the graduation session.

    Section(title='Other qualifications')
      Card(
        heading="State Exam"
        subheading='Engineer'
        date='Jul 2020'
      )
        ul(class='section-ul')
          li
            | I have achieved the qualification to practice as an Information Engineer in Italy
            | (Ingegnere Sezione A: informazione) with full marks.

    Section(title='Skills')
      SkillLayout(title='Languages' :skills="['Python', 'TypeScript', 'C#', 'SQL']")
      SkillLayout(title='Frontend' :skills="['VueJS', 'Bootstrap', 'TailwindCSS', 'ESLint', 'HTML', 'CSS']")
      SkillLayout(title='Backend' :skills="['Django', 'Flask', 'FastAPI', '.NET Core', 'Express.js']")
      SkillLayout(title='Databases' :skills="['PostgreSQL', 'MS SQL Server', 'Redis']")
      SkillLayout(title='Tools' :skills="['Git', 'Docker', 'Kubernetes', 'Kafka', 'RabbitMQ']")
      SkillLayout(title='Dev Tools' :skills="['Visual Studio Code', 'PyCharm', 'Postman', 'Raider']")
      SkillLayout(title='Others' :skills="['Adobe Premiere', 'Adobe PS', 'LaTeX']")




</template>

<style scoped lang="scss">
.section-ul {
  @apply ml-4 list-disc text-muted-foreground;
}
</style>
