<script setup lang="ts">
import { useUserAuthData } from '@/composables/useLogout'
const { logoutAction } = useUserAuthData()
const handleLogout: () => Promise<void> = async () => {
  await logoutAction()
}
</script>

<template>
  <div class="demo-space-x">
    <VBtn variant="flat" color="error" @click="handleLogout">Log Out</VBtn>
  </div>
</template>
