<script setup lang="ts">
import { ref, type Ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useRouter } from 'vue-router'
import { items, type Items, type SubCategory } from '../ItemProducts'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import Swal from 'sweetalert2'
import { nameValidationRule, cardNumberValidationRule, cardCvvValidationRule } from '../validation'

interface CartItem extends Items {
  imageUrl: string | Object | undefined
  price: number
  quantity: number
}

const STORAGE_KEY_PREFIX = 'cartItems_'
const cart: Ref<CartItem[]> = ref([])
const value: Ref<Items[]> = ref(items)
const router = useRouter()
const currentId = ref<any>(router.currentRoute.value.params.id)
const currentSubcategories: Ref<SubCategory[]> = ref([])

onMounted(() => {
  updateSubcategories()
  cart.value = loadCartFromLocalStorage()
  updateTotalAmount()
})

onBeforeUnmount(() => {
  const selectedDate = localStorage.getItem('selectedDate')
  const storageKey = STORAGE_KEY_PREFIX + selectedDate
  localStorage.setItem(storageKey, JSON.stringify(cart.value))
})

const loadCartFromLocalStorage = (): CartItem[] => {
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

const filterSubcategories = (itemId: string | number): SubCategory[] => {
  const currentItem = value.value.find((item) => item.id === itemId)
  return currentItem ? currentItem.subCategory : []
}

const updateSubcategories = (): void => {
  currentSubcategories.value = filterSubcategories(currentId.value)
}

const increaseQuantity = (index: number): void => {
  cart.value[index].quantity++
  updateLocalStorage()
  updateTotalAmount()
}

const decreaseQuantity = (index: number): void => {
  if (cart.value[index].quantity > 1) {
    cart.value[index].quantity--
  } else {
    removeFromCart(index)
  }
  updateLocalStorage()
  updateTotalAmount()
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

const calculateTotalAmount = (): string => {
  return cart.value.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
}

const totalAmount: Ref<number> = ref(0.0)
const updateTotalAmount = (): void => {
  totalAmount.value = +calculateTotalAmount()
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

const isFormValid = computed(() => {
  return (
    formData.value.name &&
    formData.value.cardNumber &&
    formData.value.expiryDate &&
    formData.value.cvv &&
    !/\d/.test(formData.value.name)
  )
})

const placeOrder = (e: { preventDefault: () => void }): void => {
  e.preventDefault()

  if (cart.value.length === 0) {
    toast('Please Add Items In the Cart', {
      theme: 'auto',
      type: 'error',
      dangerouslyHTMLString: true
    })
    return
  }

  if (!isFormValid.value) {
    toast('Please fill in all required fields correctly', {
      theme: 'auto',
      type: 'error',
      dangerouslyHTMLString: true
    })
    return
  }

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

  if (fullName.value && address.value) {
    const orderDetails: { 'Full Name': string | null ; Address: string | null } =  {
      'Full Name': fullName.value,
      Address: address.value
    }
    localStorage.setItem('OrderDetails', JSON.stringify(orderDetails))
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
  localStorage.removeItem('OrderDetails');
  cart.value = []
  updateTotalAmount()
}
// download bill
const downloadBill = (): void => {
  const billContent = generateBillContent()
  const blob = new Blob([billContent], { type: 'text/plain' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'order_bill.txt'
  link.click()
}
const generateBillContent = (): string => {
  const selectedDate = localStorage.getItem('selectedDate')
  const orderDetailsString  = localStorage.getItem('OrderDetails');
  const orderDetails = JSON.parse(orderDetailsString);
  console.log(orderDetails);
  const itemsInCart = cart.value.map(
    (item) =>
      `${item.title} (Quantity: ${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`
  )
  const totalAmountValue = calculateTotalAmount()
  const billContent = `
    Order Bill - ${selectedDate} 
    Name - ${orderDetails["Full Name"]}
    Address - ${orderDetails.Address}
    Items in Cart:
    ${itemsInCart.join('\n')}
    Total Amount: $${totalAmountValue}
  `

  return billContent
}

// update local storage
const updateLocalStorage = (): void => {
  const selectedDate = localStorage.getItem('selectedDate')
  const storageKey = STORAGE_KEY_PREFIX + selectedDate
  localStorage.setItem(storageKey, JSON.stringify(cart.value))
  updateTotalAmount()
}

const goback = () => {
  router.go(-1)
}

// limit card number length
const limitCardNumberLength = (event: Event) => {
  const inputElement = event.target as HTMLInputElement
  const currentValue = inputElement.value.replace(/\s/g, '')
  if (currentValue.length > 16) {
    inputElement.value = currentValue.slice(0, 16)
    inputElement.dispatchEvent(new Event('input'))
  }
}

// date
const currentDate = new Date()

// cardCvv limit
const limitCvvNumberLength = (event: Event) => {
  const inputElement = event.target as HTMLInputElement
  const currentValue = inputElement.value.replace(/\s/g, '')
  if (currentValue.length > 3) {
    inputElement.value = currentValue.slice(0, 3)
    inputElement.dispatchEvent(new Event('input'))
  }
}
</script>

<template>
  <VCard>
    <!-- header -->
    <VCardTitle class="d-flex align-center justify-space-between">
      <span class="headline" style="color: #283046; font-weight: 900; font-size: 40px"
        >Shopping Cart</span
      >
      <VBtn @click="goback" class="bg-transparent" elevation="0">
        <VIcon>mdi-close</VIcon>
      </VBtn>
    </VCardTitle>
    <VDivider></VDivider>

    <VRow>
      <!-- left side  -->
      <VCol cols="12" md="8">
        <VList>
          <VListItemGroup v-if="cart.length > 0">
            <VListItem v-for="(cartItem, index) in cart" :key="index">
              <VListItemContent>
                <VCard class="cart-item-card" elevation="3" style="background-color: #f9f9f9">
                  <VContainer>
                    <VRow>
                      <!-- Image Column -->
                      <VCol cols="2">
                        <VImg :src="cartItem.imageUrl" max-height="100"></VImg>
                      </VCol>

                      <!-- Details Column -->
                      <VCol cols="5">
                        <VRow>
                          <VCol cols="12">
                            <VCardTitle class="item-title" style="font-size: 18px">{{
                              cartItem.title
                            }}</VCardTitle>
                          </VCol>
                          <VCol cols="12">
                            <VCard-subtitle class="item-price" style="font-size: 16px">{{
                              `$${cartItem.price.toFixed(2)}`
                            }}</VCard-subtitle>
                          </VCol>
                        </VRow>
                      </VCol>

                      <VCol cols="5">
                        <VCol cols="12">
                          <VRow align="center">
                            <!-- Decrease Quantity Button -->
                            <VCol cols="2">
                              <VBtn
                                icon
                                @click="decreaseQuantity(index)"
                                class="quantity-btn bg-transparent"
                                elevation="0"
                              >
                                <VIcon>mdi-minus</VIcon>
                              </VBtn>
                            </VCol>

                            <!-- Quantity Display -->
                            <VCol cols="2">
                              <span class="item-quantity">{{ cartItem.quantity }}</span>
                            </VCol>

                            <!-- Increase Quantity Button -->
                            <VCol cols="2">
                              <VBtn
                                icon
                                @click="increaseQuantity(index)"
                                class="quantity-btn bg-transparent"
                                elevation="0"
                              >
                                <VIcon>mdi-plus</VIcon>
                              </VBtn>
                            </VCol>

                            <!-- Delete Button -->
                            <VCol cols="6">
                              <VBtn
                                icon
                                @click="removeItem(index)"
                                class="delete-btn float-end bg-transparent"
                                elevation="0"
                              >
                                <VIcon>mdi-delete</VIcon>
                              </VBtn>
                            </VCol>
                          </VRow>
                        </VCol>
                      </VCol>
                    </VRow>
                  </VContainer>
                </VCard>
              </VListItemContent>
            </VListItem>
          </VListItemGroup>

          <!-- No items message -->
          <VListItem v-else>
            <VListItemContent>No items in the cart</VListItemContent>
          </VListItem>
        </VList>
      </VCol>

      <!-- right side -->
      <VCol cols="12" md="4">
        <VCard
          class="total-card"
          elevation="3"
          style="border-radius: 15px; background-color: #283046; height: 800px; color: white"
        >
          <VContainer>
            <!-- Total Amount Section -->
            <VRow>
              <VCol>
                <VCardTitle class="total-title" style="font-size: 20px"> Total Amount </VCardTitle>
                <VCard-subtitle class="total-amount" style="font-size: 18px">
                  ${{ totalAmount.toFixed(2) }}
                </VCard-subtitle>
                <VDivider></VDivider>
                <VCard-subtitle class="item-count">Items in Cart: {{ cart.length }}</VCard-subtitle>
              </VCol>
            </VRow>

            <!-- Payment Form Section -->
            <VRow>
              <VCol>
                <VForm>
                  <VTextField
                    v-model="formData.name"
                    label="Name"
                    required="true"
                    variant="outlined"
                    :rules="[nameValidationRule]"
                    maxlength="40"
                  ></VTextField>
                  <VTextField
                    v-model="formData.cardNumber"
                    type="number"
                    label="Card Number"
                    required="true"
                    variant="outlined"
                    @input="limitCardNumberLength"
                    :rules="[cardNumberValidationRule]"
                  ></VTextField>
                  <VRow>
                    <VCol>
                      <VTextField
                        v-model="formData.expiryDate"
                        label="Expiry Date"
                        required="true"
                        type="date"
                        variant="outlined"
                        :min="currentDate.toISOString().split('T')[0]"
                      ></VTextField>
                    </VCol>
                    <VCol>
                      <VTextField
                        v-model="formData.cvv"
                        label="CVV"
                        required="true"
                        variant="outlined"
                        type="password"
                        @input="limitCvvNumberLength"
                        :rules="[cardCvvValidationRule]"
                      ></VTextField>
                    </VCol>
                  </VRow>
                  <VRow>
                    <VCol>
                      <div class="demo-space-x">
                        <VBtn
                          variant="flat"
                          color="info"
                          @click="placeOrder"
                          :disabled="!isFormValid"
                          type="submit"
                        >
                          Place Order
                        </VBtn>
                      </div>
                    </VCol>
                  </VRow>
                </VForm>
              </VCol>
            </VRow>

            <!-- address order -->
            <VDialog v-model="dialog" max-width="600px">
              <VCard>
                <VCardTitle>Order Details</VCardTitle>
                <VCardText>
                  <VForm ref="orderForm" @submit.prevent="submitOrder">
                    <VTextField
                      v-model="fullName"
                      label="Full Name"
                      required
                      variant="outlined"
                      :rules="[nameValidationRule]"
                      maxlength="40"
                    ></VTextField>
                    <VTextField
                      v-model="address"
                      label="Address"
                      required
                      variant="outlined"
                      maxlength="90"
                    ></VTextField>

                    <VCardActions>
                      <VBtn color="primary" type="submit">Submit</VBtn>
                      <VBtn color="error" @click="closeAddressDialog">Cancel</VBtn>
                    </VCardActions>
                  </VForm>
                </VCardText>
              </VCard>
            </VDialog>
          </VContainer>
        </VCard>
      </VCol>
    </VRow>
  </VCard>
</template>
