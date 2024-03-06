<script setup lang="ts">
import { ref } from 'vue'
const isVisible = ref(true)
const currentDate = new Date()
</script>

<template>
  <VDialog :model-value="isVisible" max-width="fit-content" persistent>
    <VCard>
      <VCardTitle class="headline text-center"> Select A Date </VCardTitle>
      <v-container>
        <v-row justify="space-around">
          <v-date-picker color="primary" :min="currentDate.toISOString().split('T')[0]"></v-date-picker>
        </v-row>
      </v-container>
      <v-btn color="error" @click="isVisible = false">Close</v-btn>
    </VCard>
  </VDialog>
</template>
