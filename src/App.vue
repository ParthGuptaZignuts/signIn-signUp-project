<script setup lang="ts">
import Default from './Layouts/Default.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <Default v-if="route.meta.layout === 'default'" />
  <div v-else>
    <RouterView />
  </div>
</template>

<style scoped></style>
