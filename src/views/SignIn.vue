<script setup lang="ts">
import { ref } from 'vue'
const visible = ref(false)
import HomeButton from '../components/HomeButton.vue'

import { useLogin } from '@/composables/useLogin'

const { formData, handleLogin } = useLogin() ;
</script>

<template>
  <div>
    <h1
      class="mx-auto my-6"
      max-width="228"
      style="text-align: center; font-weight: 900; color: lightskyblue"
    >
      Sign In
    </h1>

    <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
      <form @submit.prevent="handleLogin">
        <div class="text-subtitle-1 text-medium-emphasis">Account</div>

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

        <v-btn block class="mb-8" color="blue" size="large" variant="tonal" type="submit" >
          Log In
        </v-btn>

        <v-card-text class="text-center">
          <router-link class="text-blue text-decoration-none" to="/signup">
            Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
          </router-link>
        </v-card-text>
      </form>
    </v-card>
    <HomeButton style="text-align: center; margin-top: 25px" />
  </div>
</template>


<!-- testing for login  
email : realhalamadrid04@gmail.com
password : Real@0407-->