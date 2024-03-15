<script setup lang="ts">
import { ref } from 'vue'

const searchItem = ref('')
const emit = defineEmits<{
  (event: 'submit', value: string): void
}>()
const handleInput = () => {
  emit('submit', searchItem.value)
}
</script>
<template>
  <form @submit.prevent="handleInput">
    <div class="d-flex align-center justify-center">
      <div class="w-50 mt-5">
        <VTextField label="Search.." variant="outlined" v-model="searchItem"></VTextField>
      </div>
      <div class="d-flex align-center justify-center ml-6">
        <VBtn variant="tonal" icon="mdi-magnify" type="submit"></VBtn>
      </div>
    </div>
  </form>
</template>
