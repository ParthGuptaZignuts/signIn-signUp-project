<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { items } from '../ItemProducts'

const value = ref(items)
const router = useRouter()
const currentId = ref(router.currentRoute.value.params.id)
const currentSubcategories = ref([])
const dialogVisible = ref(false);

const openDialog = () => {
  dialogVisible.value = true;
};

const filterSubcategories = (itemId) => {
  const currentItem = value.value.find((item) => item.id === itemId)
  return currentItem ? currentItem.subCategory : []
}

const updateSubcategories = () => {
  currentSubcategories.value = filterSubcategories(currentId.value)
}

const addToCart = (item) => {
  console.log(`Added ${item.title} to the cart`)
}

onMounted(() => {
  updateSubcategories() 
  router.afterEach(() => {
    currentId.value = router.currentRoute.value.params.id
    updateSubcategories()
  })
})
</script>

<template>
  <div>
    <v-dialog v-model="dialogVisible" fullscreen>
        <v-card>
          <v-card-title>
            <span class="headline">Shopping Cart</span>
            <v-btn icon @click="dialogVisible = false" class="float-end">
              <v-icon >mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <!-- Place your shopping cart content here -->
            <!-- You can customize this part based on your needs -->
            <!-- For example, display the items in the cart, their quantities, etc. -->
            <div v-for="(item, index) in cartItems" :key="index">
              {{ item.title }} - Quantity: {{ item.quantity }}
            </div>
          </v-card-text>
        </v-card>
      </v-dialog>

    <h1>{{ currentSubcategories[0]?.parentCategory }} <VIcon class="float-end mt-5" size="30" @click="openDialog" >mdi mdi-cart-check</VIcon></h1>
    
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
          <v-btn @click="addToCart(subcategory)" class="custom-card-button"> <VIcon>mdi mdi-cart-plus</VIcon>Add to Cart</v-btn>
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
