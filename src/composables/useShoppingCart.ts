// useShoppingCart.ts
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRouter } from 'vue-router'
import { items } from '../ItemProducts'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import Swal from 'sweetalert2'

interface CartItem {
  quantity: number
}

export function useShoppingCart() {
  const STORAGE_KEY_PREFIX = 'cartItems_'
  const cart = ref([])
  const value = ref(items)
  const router = useRouter()
  const currentId = ref<string | number>(router.currentRoute.value.params.id)
  const currentSubcategories = ref([])
  const dialogVisible = ref<boolean>(false)

  onMounted(() => {
    const storedState = localStorage.getItem('dialogState')
    if (storedState) {
      dialogVisible.value = JSON.parse(storedState)
    }

    if (dialogVisible.value) {
      openDialog()
    }

    updateSubcategories()
    cart.value = loadCartFromLocalStorage()
    router.afterEach(() => {
      currentId.value = params.id
      updateSubcategories()
    })

    updateTotalAmount()
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

  const filterSubcategories = (itemId: string | number) => {
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
    updateLocalStorage()
    updateTotalAmount()
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
    const billContent = generateBillContent()
    const blob = new Blob([billContent], { type: 'text/plain' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'order_bill.txt'
    link.click()
  }

  const generateBillContent = (): string => {
    const selectedDate = localStorage.getItem('selectedDate')
    const fullName = formData.value.name
    const address = address.value
    const itemsInCart = cart.value.map(
      (item) =>
        `${item.title} (Quantity: ${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`
    )
    const totalAmount = calculateTotalAmount()
    const billContent = `
          Order Bill - ${selectedDate}
          
          Name: ${fullName}
          Address: ${address}
          
          Items in Cart:
          ${itemsInCart.join('\n')}
          
          Total Amount: $${totalAmount}
        `

    return billContent
  }
  watch(dialogVisible, (newValue) => {
    localStorage.setItem('dialogState', JSON.stringify(newValue))
  })

  // update local storage
  const updateLocalStorage = (): void => {
    const selectedDate = localStorage.getItem('selectedDate')
    const storageKey = STORAGE_KEY_PREFIX + selectedDate
    localStorage.setItem(storageKey, JSON.stringify(cart.value))
    updateTotalAmount()
  }

  // Return the public API of the composition
  return {
    cart,
    value,
    currentId,
    currentSubcategories,
    dialogVisible,
    addToCart
  }
}
