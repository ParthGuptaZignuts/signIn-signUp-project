<script setup lang="ts">
// imports
import type Project from '@/Project'

// variable
const emit = defineEmits(['handleDialog'])

// Props
defineProps<{
  project: Project
  isVisible: boolean
}>()

</script>

<template>
  <VDialog :model-value="isVisible" max-width="fit-content" persistent>
    <VCard>
      <VCardTitle class="headline"> Title : {{ project?.name }}</VCardTitle>
      <VCardSubtitle>Description : {{ project?.description }}</VCardSubtitle>

      <VCardActions>
        <VBtn class="ms-auto" @click="emit('handleDialog', false)">Close</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
