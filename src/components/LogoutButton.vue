<script setup lang="ts">
import { useUserAuthData } from '@/composables/useLogout'
const { logoutAction } = useUserAuthData()
const handleLogout: () => Promise<void> = async () => {
  await logoutAction()
}

import { watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
watch(locale, (newlocale) => {
  localStorage.setItem('locale', newlocale)
})
</script>

<template>
  <div class="demo-space-x">
    <VBtn variant="flat" color="error" @click="handleLogout">{{ t('LOG OUT') }}</VBtn>
  </div>
</template>
