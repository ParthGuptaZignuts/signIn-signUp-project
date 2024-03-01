<script setup lang="ts">
import { ref } from 'vue'
import HomeButton from '@/components/HomeButton.vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import router from '@/router'

const visible = ref(false)
const apiResponse = ref(null)

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

const registerUser = () => {
  axios
    .post('api/register', formData.value)
    .then((response) => {
      console.log('response:', response);

      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        apiResponse.value = response.data;
        console.log(apiResponse);
      }

      Swal.fire({
        icon: 'success',
        title: 'User created successfully!',
        showConfirmButton: false,
        timer: 1500
      });

      router.push('/signin')
      // Clear form data after successful registration
      formData.value.name = '';
      formData.value.email = '';
      formData.value.password = '';
      formData.value.password_confirmation = '';

      return response;
    })
    .catch((error) => {
      console.error('Error:', error);

      Swal.fire({
        icon: 'error',
        title: 'An error occurred!',
        showConfirmButton: false,
        timer: 1500
      });

      return Promise.reject(error); // Re-throw the error to handle it elsewhere
    });
};

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

    <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
      <form @submit.prevent="registerUser">
        <div class="text-subtitle-1 text-medium-emphasis">Name</div>

        <v-text-field
          density="compact"
          placeholder="Enter Full Name"
          prepend-inner-icon="mdi-account"
          variant="outlined"
          v-model="formData.name"
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis">Email</div>

        <v-text-field
          density="compact"
          placeholder="Email address"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          v-model="formData.email"
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
          Password
        </div>

        <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
          v-model="formData.password"
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
          Re-Enter Password
        </div>

        <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
          v-model="formData.password_confirmation"
        ></v-text-field>

        <v-btn
          block
          class="mb-8"
          color="blue"
          size="large"
          variant="tonal"
          type="submit"
          @click="registerUser"
        >
          Sign-Up
        </v-btn>

        <v-card-text class="text-center">
          <router-link class="text-blue text-decoration-none" to="/signin">
            Sign In <v-icon icon="mdi-chevron-right"></v-icon>
          </router-link>
        </v-card-text>
      </form>
    </v-card>
    <HomeButton style="text-align: center; margin-top: 25px" />

    <!-- Display the API response -->
    <div v-if="apiResponse">
      <h2>API Response:</h2>
      <pre>{{ apiResponse }}</pre>
    </div>
  </div>
</template>

