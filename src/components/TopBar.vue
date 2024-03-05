<script setup lang="ts">
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUserAuthData } from '../composables/useLogout'
import avatar1 from '../assets/avatar.png'
import LogoutButton from './LogoutButton.vue'

const { user, userEmail } = useUserAuthData()
const { t, locale } = useI18n()
watch(locale, (newlocale) => {
  localStorage.setItem('locale', newlocale)
})
</script>

<template>
  <VApp>
    <VToolbar app>
      <VToolbarTitle>{{ t('Awesome App') }}</VToolbarTitle>
      <VSpacer></VSpacer>
      <VToolbarItems class="hidden-xs-only">
        <VBtn :to="'/dashboard'">
          <VIcon>mdi mdi-home-outline</VIcon>
          {{ t('Home') }}
        </VBtn>

        <VMenu open-on-hover>
          <template #activator="{ props }">
            <div class="demo-space-x pt-2 ml-2 mr-2">
              <VBadge
                dot
                bordered
                color="success"
                location="bottom end"
                :offset-x="5"
                :offset-y="1"
                v-bind="props"
              >
                <VAvatar size="large">
                  <VImg :src="avatar1" />
                </VAvatar>
              </VBadge>
            </div>
          </template>

          <VList>
            <VListItem>{{ t('Name') }} : {{ user?.name }}</VListItem>
            <VListItem>{{ userEmail }}</VListItem>
            <VListItem><LogoutButton /></VListItem>
          </VList>
        </VMenu>
      </VToolbarItems>
    </VToolbar>

    <VContent>
      <router-view></router-view>
    </VContent>
  </VApp>
</template>
