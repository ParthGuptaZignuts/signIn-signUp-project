<script setup lang="ts">
import { items } from '../ItemProducts'

const value = items.value
const lightColors = ['#FAD02E', '#FFD54F', '#FFECB3', '#C5E1A5', '#80CBC4', '#81D4FA']
const getRandomIndex = () => Math.floor(Math.random() * lightColors.length)

const getRandomColor = () => {
  const randomIndex = getRandomIndex()
  return lightColors[randomIndex]
}
</script>

<template>
  <h1>hello</h1>
  <v-app id="inspire">
    <v-row>
      <v-col v-for="(item, index) in value" :key="index" cols="12" sm="6" md="4" lg="3">
        <v-card :color="getRandomColor()" max-width="500" max-height="600" hover>
          <v-card-title>{{ item.title }}</v-card-title>
          <v-card-subtitle>{{ item.description }}</v-card-subtitle>
          <v-card-text>{{ item.category }}</v-card-text>
          <v-card-actions>
            <v-btn color="#000">Explore</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>
