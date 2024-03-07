<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { items } from '../ItemProducts'

const STORAGE_KEY = 'cartItems';

const value = ref(items)
const router = useRouter()
const currentId = ref(router.currentRoute.value.params.id)
const currentSubcategories = ref([])
const dialogVisible = ref(false)
const cart = ref(loadCartFromLocalStorage())

const openDialog = () => {
  dialogVisible.value = true
}

const closeDialog = () => {
  dialogVisible.value = false
}

const filterSubcategories = (itemId) => {
  const currentItem = value.value.find((item) => item.id === itemId)
  return currentItem ? currentItem.subCategory : []
}

const updateSubcategories = () => {
  currentSubcategories.value = filterSubcategories(currentId.value)
}

const addToCart = (item) => {
  cart.value.push(item)
  saveCartToLocalStorage(cart.value);
  console.log(`Added ${item.title} to the cart`)
}

const removeFromCart = (index) => {
  const removedItem = cart.value.splice(index, 1)[0]
  saveCartToLocalStorage(cart.value);
  console.log(`Removed ${removedItem.title} from the cart`)
}

const calculateTotalAmount = () => {
  return cart.value.reduce((total, item) => total + item.price, 0).toFixed(2)
}

onMounted(() => {
  updateSubcategories()
  router.afterEach(() => {
    currentId.value = router.currentRoute.value.params.id
    updateSubcategories()
  })
})

onBeforeUnmount(() => {
  saveCartToLocalStorage(cart.value);
})

function loadCartFromLocalStorage() {
  const storedItems = localStorage.getItem(STORAGE_KEY);
  return storedItems ? JSON.parse(storedItems) : [];
}

function saveCartToLocalStorage(cartItems) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
}
</script>


<template>
  <div>
    <v-dialog v-model="dialogVisible" fullscreen>
      <v-card>
        <v-card-title class="d-flex align-center justify-space-between">
          <span class="headline">Shopping Cart</span>
          <v-btn icon @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-list>
          <v-list-item-group v-if="cart.length > 0">
            <v-list-item v-for="(cartItem, index) in cart" :key="index">
              <v-list-item-content>
                <v-list-item-title>{{ cartItem.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ `$${cartItem.price.toFixed(2)}` }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon @click="removeFromCart(index)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list-item-group>
          <v-list-item v-else>
            <v-list-item-content>No items in the cart</v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="closeDialog">Close</v-btn>
          <span>Total Amount: ${{ calculateTotalAmount() }}</span>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <h1>
      {{ currentSubcategories[0]?.parentCategory }}
      <VIcon class="float-end mt-5" size="30" @click="openDialog">mdi mdi-cart-check</VIcon>
    </h1>

    <v-row class="pt-5">
      <v-col
        v-for="(subcategory, index) in currentSubcategories"
        :key="index"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        class="custom-card-col"
      >
        <v-card max-width="500" hover class="custom-card">
          <v-img :src="subcategory.imageUrl" height="200"></v-img>
          <div class="custom-card-title">{{ subcategory.title }}</div>
          <div class="custom-card-text">{{ subcategory.description }}</div>
          <div class="custom-card-subtitle">{{ `$${subcategory.price.toFixed(2)}` }}</div>
          <v-btn @click="addToCart(subcategory)" class="custom-card-button">
            <VIcon>mdi mdi-cart-plus</VIcon>Add to Cart</v-btn
          >
        </v-card>
      </v-col>
    </v-row>
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
</style>
