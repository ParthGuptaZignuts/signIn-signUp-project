<script setup lang="ts">
import TopBar from '../components/TopBar.vue'
import SideBar from '@/components/SideBar.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <VApp>
    <SideBar />
    <VMain>
      <VContainer>
        <VRow>
          <VCol cols="12">
            <TopBar />
          </VCol>
        </VRow>
      </VContainer>
    </VMain>
  </VApp>
</template>
