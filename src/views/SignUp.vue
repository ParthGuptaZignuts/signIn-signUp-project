<script setup lang="ts">
import { ref } from 'vue'
import HomeButton from '@/components/HomeButton.vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import router from '@/router'
import { EmailValidator, PasswordValidator } from '../validation'

const visible = ref(false)
const apiResponse = ref(null)

const ConfirmPasswordValidator = (value: string) => {
  if (value) {
    if (formData.value.password === value) {
      return true
    }
    return 'Passwords do not match.'
  }
  return 'Confirm Password is required.'
}

interface User {
  name: string
  email: string
  password: string
  password_confirmation: string
}

const formData = ref<User>({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})

const registerCheckUser = () => {
  if (
    formData.value.name == '' ||
    formData.value.email == '' ||
    formData.value.password == '' ||
    formData.value.password_confirmation == ''
  ) {
    console.log('enter value')
  } else {
    registerUser()
  }
}
const registerUser = () => {
  axios
    .post('api/register', formData.value)
    .then((response) => {
      console.log('response:', response)

      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token)
        apiResponse.value = response.data
        console.log(apiResponse)
      }

      Swal.fire({
        icon: 'success',
        title: 'User created successfully!',
        showConfirmButton: false,
        timer: 1500
      })

      router.push('/signin')
      formData.value.name = ''
      formData.value.email = ''
      formData.value.password = ''
      formData.value.password_confirmation = ''

      return response
    })
    .catch((error) => {
      console.error('Error:', error)

      Swal.fire({
        icon: 'error',
        title: 'An error occurred!',
        showConfirmButton: false,
        timer: 1500
      })
      return Promise.reject(error)
    })
}
</script>

<template>
  <div>
    <h1
      class="mx-auto my-6"
      max-width="228"
      style="text-align: center; font-weight: 900; color: lightskyblue"
    >
      Sign-Up
    </h1>

    <VCard class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
      <form @submit.prevent="registerCheckUser">
        <div class="text-subtitle-1 text-medium-emphasis">Name</div>

        <VTextField
          density="compact"
          placeholder="Enter Full Name"
          prepend-inner-icon="mdi-account"
          variant="outlined"
          v-model="formData.name"
          required="true"
        ></VTextField>

        <div class="text-subtitle-1 text-medium-emphasis">Email</div>

        <VTextField
          density="compact"
          placeholder="Email address"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          v-model="formData.email"
          :rules="[EmailValidator]"
          required="true"
        ></VTextField>

        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
          Password
        </div>

        <VTextField
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
          v-model="formData.password"
          :rules="[PasswordValidator]"
          required="true"
        ></VTextField>

        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
          Re-Enter Password
        </div>

        <VTextField
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
          v-model="formData.password_confirmation"
          :rules="[ConfirmPasswordValidator]"
          required="true"
        ></VTextField>

        <VBtn
          block
          class="mb-8"
          color="blue"
          size="large"
          variant="tonal"
          type="submit"
          @click="registerCheckUser"
        >
          Sign-Up
        </VBtn>

        <VCardText class="text-center">
          <RouterLink class="text-blue text-decoration-none" to="/signin">
            Sign In <VIcon icon="mdi-chevron-right"></VIcon>
          </RouterLink>
        </VCardText>
      </form>
    </VCard>
    <HomeButton style="text-align: center; margin-top: 25px" />
  </div>
</template>
