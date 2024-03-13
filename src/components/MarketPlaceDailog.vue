<script setup lang="ts">
// import
import { ref, watch } from 'vue'
import MarketPlaceProducts from './MarketPlaceProducts.vue'

// variables
const isVisible = ref<boolean>(true)
const currentDate = new Date()
const selectedDate = ref<any>()
const showProduct = ref(false)

// watcher
watch(selectedDate, (newVal) => {
  localStorage.setItem('selectedDate', new Date(newVal).toLocaleDateString())
  console.log(new Date(newVal).toLocaleDateString())
  isVisible.value = false

  if (newVal && !isVisible.value) {
    showProduct.value = true
  }
})
</script>

<template>
  <VDialog :model-value="isVisible" max-width="fit-content" persistent>
    <VCard>
      <VCardTitle class="headline text-center"> Select A Date </VCardTitle>
      <VContainer>
        <VRow justify="space-around">
          <VDatePicker
            color="primary"
            :min="currentDate.toISOString().split('T')[0]"
            v-model="selectedDate"
          ></VDatePicker>
        </VRow>
      </VContainer>
    </VCard>
  </VDialog>

  <MarketPlaceProducts v-if="showProduct" />
</template>
