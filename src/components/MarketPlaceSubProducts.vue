<script setup lang="ts">
import { useShoppingCart } from '../composables/useShoppingCart'
const {
  currentSubcategories,
  addToCart
} = useShoppingCart()
</script>

<template>
  <div>
    <h1>
      <router-link to="/marketplace"><VIcon>mdi mdi-chevron-left</VIcon></router-link>
      {{ currentSubcategories[0]?.parentCategory }}
      <VBtn class="float-end mt-5 bg-transparent" elevation="0" :to="`/marketplace/cart`"><VIcon  size="30">mdi mdi-cart-check</VIcon></VBtn>
    </h1>

    <VRow class="pt-5">
      <VCol
        v-for="(subcategory, index) in currentSubcategories"
        :key="index"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        class="custom-card-col"
      >
        <VCard max-width="500" hover class="custom-card">
          <VImg :src="subcategory.imageUrl" height="200"></VImg>
          <div class="custom-card-title">{{ subcategory.title }}</div>
          <div class="custom-card-text">{{ subcategory.description }}</div>
          <div class="custom-card-subtitle">{{ `$${subcategory.price.toFixed(2)}` }}</div>
          <VBtn @click="addToCart(subcategory)" class="custom-card-button">
            <VIcon>mdi mdi-cart-plus</VIcon>Add to Cart</VBtn
          >
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>

<style scoped>
.custom-card-col {
  margin-bottom: 16px;
}

.custom-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.custom-card img {
  object-fit: cover;
}

.custom-card-title {
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
}

.custom-card-text {
  padding: 10px;
  flex-grow: 1;
}

.custom-card-subtitle {
  padding: 10px;
}

.custom-card-button {
  margin-top: auto;
  background-color: #2196f3;
  color: white;
}

.item-title {
  font-size: 18px;
  font-weight: bold;
}

.item-price {
  font-size: 16px;
}

.quantity-row {
  margin-top: -8px;
}

.item-quantity {
  font-size: 16px;
  font-weight: bold;
}

.cart-item-card {
  margin-bottom: 16px;
}

.total-card {
  height: 100%;
}

.total-title {
  font-size: 18px;
  font-weight: bold;
}

.total-amount {
  font-size: 24px;
  color: white;
  font-weight: bolder;
}

.cart-item-card {
  margin-bottom: 16px;
}

.item-title {
  font-size: 18px;
  font-weight: bold;
}

.item-price {
  font-size: 16px;
  color: #888;
}

.quantity-row {
  margin-top: 8px;
}

.quantity-col {
  margin: 0 8px;
}

.item-quantity {
  font-size: 16px;
}

.delete-col {
  text-align: right;
}
</style>
