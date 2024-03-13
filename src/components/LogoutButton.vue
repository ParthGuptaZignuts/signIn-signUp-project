<script setup lang="ts">
// imports 
import { useUserAuthData } from '@/composables/useLogout'
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'

// variables 
const { logoutAction } = useUserAuthData()
const { t, locale } = useI18n()

// methods
const handleLogout: () => Promise<void> = async () => {
  await logoutAction()
}

// watcher
watch(locale, (newlocale) => {
  localStorage.setItem('locale', newlocale)
})
</script>

<template>
  <div class="demo-space-x">
    <VBtn variant="flat" color="error" @click="handleLogout">{{ t('LOG OUT') }}</VBtn>
  </div>
</template>
