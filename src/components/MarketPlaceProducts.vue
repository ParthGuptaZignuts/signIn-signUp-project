<script setup lang="ts">
import { ref } from 'vue'
import { items } from '../ItemProducts'
const value = ref(items)
const lightColors = ["#E5FAFB", "#FDEDE8", "#FEF5E5", "#E6FFFA"]
const getRandomIndex = () => Math.floor(Math.random() * lightColors.length)

const getRandomColor = () => {
  const randomIndex = getRandomIndex()
  return lightColors[randomIndex]
}
</script>

<template>
  <div>
    <VRow class="pt-5">
      <VCol
        v-for="(item, index) in value"
        :key="index"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        class="custom-card-col"
      >
        <VCard :color="getRandomColor()" max-width="400" hover>
          <VCardTitle>{{ item.title }}</VCardTitle>
          <VCard-subtitle>{{ item.description }}</VCard-subtitle>
          <VCard-text>{{ item.category }}</VCard-text>
          <VCard-actions>
            <VBtn color="#000" :to="`/marketplace/category/${item.id}`">Explore</VBtn>
          </VCard-actions>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>

<style scoped>
.custom-card-col {
  margin-bottom: 16px;
}
</style>
