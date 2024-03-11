<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount,watch ,Ref } from 'vue'
import { useRouter, RouteLocationNormalizedLoaded } from 'vue-router'
import { items, Item, Subcategory } from '../ItemProducts'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import Swal from 'sweetalert2'

interface CartItem extends Item {
  quantity: number
}
const STORAGE_KEY_PREFIX = 'cartItems_'
const cart: Ref<CartItem[]> = ref([])
const value: Ref<Item[]> = ref(items)
const router = useRouter()
const currentId: Ref<string | number> = ref(router.currentRoute.value.params.id)
const currentSubcategories: Ref<Subcategory[]> = ref([])
const dialogVisible: Ref<boolean> = ref(false)

onMounted(() => {
  const storedState = localStorage.getItem('dialogState');
  if (storedState) {
    dialogVisible.value = JSON.parse(storedState);
  }

  if (dialogVisible.value) {
    openDialog();
  }

  cart.value = loadCartFromLocalStorage()
  updateSubcategories()
  router.afterEach((to: RouteLocationNormalizedLoaded) => {
    currentId.value = to.params.id
    updateSubcategories()
  })
})

onBeforeUnmount(() => {
  const selectedDate = localStorage.getItem('selectedDate')
  const storageKey = STORAGE_KEY_PREFIX + selectedDate
  localStorage.setItem(storageKey, JSON.stringify(cart.value))
})

function loadCartFromLocalStorage(): CartItem[] {
  const selectedDate = localStorage.getItem('selectedDate')
  const storageKey = STORAGE_KEY_PREFIX + selectedDate
  const storedItems = JSON.parse(localStorage.getItem(storageKey))

  if (storedItems && storedItems !== undefined) {
    cart.value = storedItems
    updateSubcategories()
    return storedItems
  } else {
    return []
  }
}

const openDialog = (): void => {
  dialogVisible.value = true
}

const closeDialog = (): void => {
  dialogVisible.value = false
}

const filterSubcategories = (itemId: string | number): Subcategory[] => {
  const currentItem = value.value.find((item) => item.id === itemId)
  return currentItem ? currentItem.subCategory : []
}

const updateSubcategories = (): void => {
  currentSubcategories.value = filterSubcategories(currentId.value)
}

const increaseQuantity = (index: number): void => {
  cart.value[index].quantity++
  updateTotalAmount()

  updateLocalStorage()

}

const decreaseQuantity = (index: number): void => {
  if (cart.value[index].quantity > 1) {
    cart.value[index].quantity--
  } else {
    removeFromCart(index)
  }
  updateTotalAmount()

  updateLocalStorage()

}

const addToCart = (item: Subcategory): void => {
  const selectedDate = localStorage.getItem('selectedDate')
  const storageKey = STORAGE_KEY_PREFIX + selectedDate
  const existingItems = JSON.parse(localStorage.getItem(storageKey)) || []
  const existingItemIndex = existingItems.findIndex((cartItem) => cartItem.id === item.id)

  if (existingItemIndex !== -1) {
    existingItems[existingItemIndex].quantity++
  } else {
    item.quantity = 1
    existingItems.push(item)
  }

  localStorage.setItem(storageKey, JSON.stringify(existingItems))
  cart.value = [...existingItems]
  updateTotalAmount()

  updateLocalStorage()

  toast(`${item.title} added to cart`, {
    theme: 'auto',
    type: 'success',
    dangerouslyHTMLString: true
  })
}

const removeFromCart = (index: number): void => {
  const selectedDate = localStorage.getItem('selectedDate')
  const storageKey = STORAGE_KEY_PREFIX + selectedDate
  const existingItems = JSON.parse(localStorage.getItem(storageKey)) || []

  if (existingItems[index].quantity > 1) {
    existingItems[index].quantity--
  } else {
    const removedItem = existingItems.splice(index, 1)[0]
    console.log(`Removed ${removedItem.title} from the cart for date ${selectedDate}`)
  }
  updateLocalStorage()
  localStorage.setItem(storageKey, JSON.stringify(existingItems))
  cart.value = [...existingItems]
}

const totalAmount: Ref<number> = ref(0.0)
const updateTotalAmount = (): void => {
  totalAmount.value = +calculateTotalAmount()
}
const calculateTotalAmount = (): string => {
  return cart.value.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
}

const removeItem = (index: number): void => {
  cart.value.splice(index, 1)
  updateTotalAmount()
  updateLocalStorage()
  toast(`Item Removed from cart`, {
    theme: 'auto',
    type: 'error',
    dangerouslyHTMLString: true
  })
}

const formData = ref({
  name: '',
  cardNumber: '',
  expiryDate: '',
  cvv: ''
})

const placeOrder = (e): void => {
  e.preventDefault()

  if (cart.value.length === 0) {
    toast('Please Add Items In the Cart', {
      theme: 'auto',
      type: 'error',
      dangerouslyHTMLString: true
    })
    return
  }

  if (
    !formData.value.name ||
    !formData.value.cardNumber ||
    !formData.value.expiryDate ||
    !formData.value.cvv
  ) {
    toast('Please fill in all required fields', {
      theme: 'auto',
      type: 'error',
      dangerouslyHTMLString: true
    })
    return
  }
  console.log('Placing order with:', formData, cart.value)
  formData.value = {
    name: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  }
  openAddressDialog()
}

// address order
const dialog = ref(false)
const fullName = ref('')
const address = ref('')

const openAddressDialog = () => {
  dialog.value = true
}

const closeAddressDialog = () => {
  fullName.value = ''
  address.value = ''
  dialog.value = false
}

const submitOrder = () => {
  if (!fullName.value || !address.value) {
    toast('Please fill in all required fields', {
      theme: 'auto',
      type: 'error',
      dangerouslyHTMLString: true
    })
    return
  }
  console.log('Full Name:', fullName.value)
  console.log('Address:', address.value)

  if (fullName.value && address.value) {
    Swal.fire({
      icon: 'success',
      title: 'Order Placed!',
      text: 'Your order has been successfully placed.',
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      downloadBill()
      clearCart()
    })
    fullName.value = ''
    address.value = ''
    closeAddressDialog()
  }
}

const clearCart = (): void => {
  const selectedDate = localStorage.getItem('selectedDate')
  const storageKey = STORAGE_KEY_PREFIX + selectedDate
  localStorage.removeItem(storageKey)
  cart.value = []
  updateTotalAmount()
}

// download bill 
const downloadBill = (): void => {
  const billContent = generateBillContent();
  const blob = new Blob([billContent], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'order_bill.txt';
  link.click();
};

const generateBillContent = (): string => {
  const selectedDate = localStorage.getItem('selectedDate');
  const fullName = formData.value.name; 
  const address = address.value; 
  const itemsInCart = cart.value.map(
    (item) => `${item.title} (Quantity: ${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`
  );
  const totalAmount = calculateTotalAmount();
  const billContent = `
    Order Bill - ${selectedDate}
    
    Name: ${fullName}
    Address: ${address}
    
    Items in Cart:
    ${itemsInCart.join('\n')}
    
    Total Amount: $${totalAmount}
  `;

  return billContent;
};
watch(dialogVisible, (newValue) => {
  localStorage.setItem('dialogState', JSON.stringify(newValue));
});

// update local storage 

const updateLocalStorage = (): void => {
  const selectedDate = localStorage.getItem('selectedDate')
  const storageKey = STORAGE_KEY_PREFIX + selectedDate
  localStorage.setItem(storageKey, JSON.stringify(cart.value))
}
</script>

<template>
  <div>
    <v-dialog v-model="dialogVisible" fullscreen>
      <v-card>
        <!-- header -->
        <v-card-title class="d-flex align-center justify-space-between">
          <span class="headline" style="color: #283046; font-weight: 900; font-size: 40px"
            >Shopping Cart</span
          >
          <v-btn icon @click="closeDialog" class="bg-transparent" elevation="0">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>

        <v-row>
          <!-- left side  -->
          <v-col cols="12" md="8">
            <v-list>
              <v-list-item-group v-if="cart.length > 0">
                <v-list-item v-for="(cartItem, index) in cart" :key="index">
                  <v-list-item-content>
                    <v-card class="cart-item-card" elevation="3" style="background-color: #f9f9f9">
                      <v-container>
                        <v-row>
                          <!-- Image Column -->
                          <v-col cols="2">
                            <v-img :src="cartItem.image" max-height="100"></v-img>
                          </v-col>

                          <!-- Details Column -->
                          <v-col cols="5">
                            <v-row>
                              <v-col cols="12">
                                <v-card-title class="item-title" style="font-size: 18px">{{
                                  cartItem.title
                                }}</v-card-title>
                              </v-col>
                              <v-col cols="12">
                                <v-card-subtitle class="item-price" style="font-size: 16px">{{
                                  `$${cartItem.price.toFixed(2)}`
                                }}</v-card-subtitle>
                              </v-col>
                            </v-row>
                          </v-col>

                          <v-col cols="5">
                            <v-col cols="12">
                              <v-row align="center">
                                <!-- Decrease Quantity Button -->
                                <v-col cols="2">
                                  <v-btn
                                    icon
                                    @click="decreaseQuantity(index)"
                                    class="quantity-btn bg-transparent"
                                    elevation="0"
                                  >
                                    <v-icon>mdi-minus</v-icon>
                                  </v-btn>
                                </v-col>

                                <!-- Quantity Display -->
                                <v-col cols="2">
                                  <span class="item-quantity">{{ cartItem.quantity }}</span>
                                </v-col>

                                <!-- Increase Quantity Button -->
                                <v-col cols="2">
                                  <v-btn
                                    icon
                                    @click="increaseQuantity(index)"
                                    class="quantity-btn bg-transparent"
                                    elevation="0"
                                  >
                                    <v-icon>mdi-plus</v-icon>
                                  </v-btn>
                                </v-col>

                                <!-- Delete Button -->
                                <v-col cols="6">
                                  <v-btn
                                    icon
                                    @click="removeItem(index)"
                                    class="delete-btn float-end bg-transparent"
                                    elevation="0"
                                  >
                                    <v-icon>mdi-delete</v-icon>
                                  </v-btn>
                                </v-col>
                              </v-row>
                            </v-col>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>

              <!-- No items message -->
              <v-list-item v-else>
                <v-list-item-content>No items in the cart</v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>

          <!-- right side -->
          <v-col cols="12" md="4" style="margin: auto; margin-left: -20px">
            <v-card
              class="total-card"
              elevation="3"
              style="border-radius: 15px; background-color: #283046; height: 800px; color: white"
            >
              <v-container>
                <!-- Total Amount Section -->
                <v-row>
                  <v-col>
                    <v-card-title class="total-title" style="font-size: 20px">
                      Total Amount
                    </v-card-title>
                    <v-card-subtitle class="total-amount" style="font-size: 18px">
                      ${{ totalAmount.toFixed(2) }}
                    </v-card-subtitle>
                    <v-divider></v-divider>
                    <v-card-subtitle class="item-count"
                      >Items in Cart: {{ cart.length }}</v-card-subtitle
                    >
                  </v-col>
                </v-row>

                <!-- Payment Form Section -->
                <v-row>
                  <v-col>
                    <v-form>
                      <v-text-field
                        v-model="formData.name"
                        label="Name"
                        required="true"
                        variant="outlined"
                      ></v-text-field>
                      <v-text-field
                        v-model="formData.cardNumber"
                        type="number"
                        label="Card Number"
                        required="true"
                        variant="outlined"
                      ></v-text-field>
                      <v-row>
                        <v-col>
                          <v-text-field
                            v-model="formData.expiryDate"
                            label="Expiry Date"
                            required="true"
                            type="date"
                            variant="outlined"
                          ></v-text-field>
                        </v-col>
                        <v-col>
                          <v-text-field
                            v-model="formData.cvv"
                            label="CVV"
                            required="true"
                            variant="outlined"
                            type="number"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <div class="demo-space-x">
                            <VBtn variant="flat" color="info" @click="placeOrder" type="submit">
                              Place Order
                            </VBtn>
                          </div>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-col>
                </v-row>

                <!-- address order -->
                <v-dialog v-model="dialog" max-width="600px">
                  <v-card>
                    <v-card-title>Order Details</v-card-title>
                    <v-card-text>
                      <v-form ref="orderForm" @submit.prevent="submitOrder">
                        <v-text-field
                          v-model="fullName"
                          label="Full Name"
                          required
                          variant="outlined"
                        ></v-text-field>
                        <v-text-field
                          v-model="address"
                          label="Address"
                          required
                          variant="outlined"
                        ></v-text-field>

                        <v-card-actions>
                          <v-btn color="primary" type="submit">Submit</v-btn>
                          <v-btn color="error" @click="closeAddressDialog">Cancel</v-btn>
                        </v-card-actions>
                      </v-form>
                    </v-card-text>
                  </v-card>
                </v-dialog>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>

    <h1>
      <router-link to="/marketplace"><VIcon>mdi mdi-chevron-left</VIcon></router-link>
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
