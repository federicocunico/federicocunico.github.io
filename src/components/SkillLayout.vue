<script lang="ts" setup>
import { Badge } from './ui/badge'
const props = defineProps<{
  title: string
  skills: string[]
}>()

</script>
<template>
  <div class='flex flex-col gap-y-2 md:flex-row md:gap-x-5 md:gap-y-0'>
    <div class='w-1/5 font-medium'>{{ title }}</div>
    <div class='flex w-4/5 flex-wrap gap-x-4 gap-y-2'>
      <!-- {skills.map((skill: string[]) => <Button as='button' title={skill} style='pill' />)} -->
      <!-- class='rounded-full bg-primary-foreground text-primary-background px-2 py-1 text-sm font-semibold' -->
      <!-- <div v-for='(skill, index) in skills' :key='index' class='pill' style="cursor: default;">
        {{ skill }}</div>-->
      <Badge v-for="skill in skills" :key="skill" variant="secondary">{{ skill }}</Badge>
    </div> 
  </div>
</template>

<!-- <style scoped>
.pill {
  @apply flex justify-center items-center gap-x-3 rounded-3xl border border-input px-4 py-2 text-sm shadow-sm transition-all hover:shadow-md;
  @apply bg-primary-foreground;
  @apply dark:bg-primary-foreground;
}
</style> -->
