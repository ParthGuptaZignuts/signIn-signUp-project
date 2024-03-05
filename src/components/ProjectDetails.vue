<script setup lang="ts">
import type Project from '@/Project'

const emit = defineEmits(['handleDialog'])
defineProps<{
  project: Project
  isVisible: boolean
}>()
</script>

<template>
  <v-dialog :model-value="isVisible" max-width="fit-content" persistent>
    <v-card>
      <v-card-title class="headline"> Title : {{ project?.name }}</v-card-title>
      <v-card-subtitle>Description : {{ project?.description }}</v-card-subtitle>

      <v-card-actions>
        <VBtn class="ms-auto" @click="emit('handleDialog', false)">Close</VBtn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
