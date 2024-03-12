<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { items, type SubCategory } from '../ItemProducts'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const value = ref<any>(items)
const router = useRouter()
const currentId = ref<any>(router.currentRoute.value.params.id)
const STORAGE_KEY_PREFIX = 'cartItems_'
const cart = ref<any>([])

const addToCart = (item: SubCategory): void => {
  const selectedDate = localStorage.getItem('selectedDate')
  const storageKey = STORAGE_KEY_PREFIX + selectedDate
  const existingItems = JSON.parse(localStorage.getItem(storageKey)) || []
  const existingItemIndex = existingItems.findIndex(
    (cartItem: { id: any }) => cartItem.id === item.id
  )

  if (existingItemIndex !== -1) {
    existingItems[existingItemIndex].quantity++
  } else {
    item.quantity = 1
    existingItems.push(item)
  }

  localStorage.setItem(storageKey, JSON.stringify(existingItems))
  cart.value = [...existingItems]
  updateLocalStorage()
  updateTotalAmount()
  toast(`${item.title} added to cart`, {
    theme: 'auto',
    type: 'success',
    dangerouslyHTMLString: true
  })
}

const calculateTotalAmount = (): string => {
  return cart.value
    .reduce(
      (total: number, item: { price: number; quantity: number }) =>
        total + item.price * item.quantity,
      0
    )
    .toFixed(2)
}

const totalAmount = ref<Number>(0.0)
const updateTotalAmount = () => {
  return (totalAmount.value = +calculateTotalAmount())
}

const updateLocalStorage = (): void => {
  const selectedDate = localStorage.getItem('selectedDate')
  const storageKey = STORAGE_KEY_PREFIX + selectedDate
  localStorage.setItem(storageKey, JSON.stringify(cart.value))
  updateTotalAmount()
}

const currentSubcategories = ref([])
const filterSubcategories = (itemId: SubCategory) => {
  const currentItem = value.value.find((item: { id: SubCategory }) => item.id === itemId)
  return currentItem ? currentItem.subCategory : []
}
const updateSubcategories = () => {
  currentSubcategories.value = filterSubcategories(currentId.value)
}

onMounted(() => {
  updateSubcategories()
  const selectedDate = localStorage.getItem('selectedDate')
  const storageKey = STORAGE_KEY_PREFIX + selectedDate
  const storedItems = JSON.parse(localStorage.getItem(storageKey))
  if (storedItems && storedItems !== undefined) {
    cart.value = storedItems
  }
})

</script>

<template>
  <div>
    <h1>
      <router-link to="/marketplace"><VIcon>mdi mdi-chevron-left</VIcon></router-link>
      {{ currentSubcategories[0]?.parentCategory }}
      <VBtn class="float-end mt-5 bg-transparent" elevation="0" :to="`/marketplace/cart`"
        ><div class="demo-space-x">
          <VBadge :content="cart.length" location="end top">
            <VIcon size="30">mdi mdi-cart-check</VIcon>
          </VBadge>
        </div>
      </VBtn>
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
