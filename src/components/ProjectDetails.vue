<script setup lang="ts">
import type Project from '@/Project'
import { ref } from 'vue'
const dialog = ref(false)
defineProps<{
  project: Project
}>()
</script>
<template>
  <div class="text-center d-inline pr-2">
    <v-btn @click="dialog = true" color="green"> View </v-btn>

    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-card-title class="headline"> Title : {{ project.name }}</v-card-title>
        <v-card-subtitle>Description : {{ project.description }}</v-card-subtitle>

        <v-card-actions>
          <v-btn class="ms-auto" text @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
