<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter();
const currentId = ref(router.currentRoute.value.params.id)
console.log(currentId.value)
</script>

<template>
  <div>
    <h1>hello : {{ currentId }}</h1>
  </div>
</template>
