<script setup lang="ts">
import { ref, onMounted } from 'vue'
import LogoutButton from './LogoutButton.vue'
import { useUserAuthData } from '../composables/useLogout'
const { user, userEmail } = useUserAuthData()

import { watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
watch(locale, (newlocale) => {
  localStorage.setItem('locale', newlocale)
})
</script>

<template>
  <v-navigation-drawer app>
    <v-list>
      <v-list-item class="text-center">
        <v-list-item-content class="font-weight-bold; mt-3">
          {{ t('The App') }}
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item class="text-center"> {{ t('Name') }} : {{ user?.name }} </v-list-item>
      <v-list-item class="text-center">
        {{ userEmail }}
      </v-list-item>
      <v-list-item class="text-center">
        <LogoutButton class="mt-5" />
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
