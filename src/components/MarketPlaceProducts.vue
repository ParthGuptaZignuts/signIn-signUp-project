<script setup lang="ts">
import { ref } from 'vue'
import { items } from '../ItemProducts'
const value = ref(items)
const lightColors = ['#FAD02E', '#FFD54F', '#FFECB3', '#C5E1A5', '#80CBC4', '#81D4FA']
const getRandomIndex = () => Math.floor(Math.random() * lightColors.length)

const getRandomColor = () => {
  const randomIndex = getRandomIndex()
  return lightColors[randomIndex]
}
</script>

<template>
  <div>
    <v-row class="pt-5">
      <v-col
        v-for="(item, index) in value"
        :key="index"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        class="custom-card-col"
      >
        <v-card :color="getRandomColor()" max-width="400" hover>
          <v-card-title>{{ item.title }}</v-card-title>
          <v-card-subtitle>{{ item.description }}</v-card-subtitle>
          <v-card-text>{{ item.category }}</v-card-text>
          <v-card-actions>
            <v-btn color="#000" :to="`/marketplace/category/${item.id}`">Explore</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.custom-card-col {
  margin-bottom: 16px;
}
</style>
