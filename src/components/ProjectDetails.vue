<script setup lang="ts">
import type Project from '@/Project';
import {ref} from 'vue'
const dialog = ref(false)
defineProps<{
    project : Project
}>()
</script>
<template>
<div class="text-center d-inline pr-2">
    <VBtn @click="dialog = true" color="green">
    View
    </VBtn>
    <VDialog
    v-model="dialog"
    width="auto"
    >
    <VCard
        max-width="400"
        prepend-icon="mdi-eye"
        :text="project.description"
        :title="project.name"
    >
        <template v-slot:actions>
        <VBtn
            class="ms-auto"
            text="Close"
            @click="dialog = false"
        ></VBtn>
        </template>
    </VCard>
    </VDialog>
</div>
</template>
  
  

  