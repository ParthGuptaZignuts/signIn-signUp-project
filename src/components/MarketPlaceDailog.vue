<script setup lang="ts">
import { ref, watch } from 'vue'
import MarketPlaceProducts from './MarketPlaceProducts.vue'

const isVisible = ref(true)
const currentDate = new Date()
const selectedDate = ref()
const showProduct = ref(false)


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
      <v-container>
        <v-row justify="space-around">
          <v-date-picker
            color="primary"
            :min="currentDate.toISOString().split('T')[0]"
            v-model="selectedDate"
          ></v-date-picker>
        </v-row>
      </v-container>
    </VCard>
  </VDialog>

  <MarketPlaceProducts v-if="showProduct" />
</template>
