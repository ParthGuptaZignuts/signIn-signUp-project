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
          <div class="titleHide">
            {{ t('Home') }}
          </div>
        </VBtn>

        <VBtn :to="'/marketplace'">
          <VIcon>mdi mdi-cart-variant</VIcon>
          <div class="titleHide">
            {{ t('Market Place') }}
          </div>
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
            <VListItem> <VIcon class="pr-2 pb-1">mdi mdi-account</VIcon>{{ user?.name }}</VListItem>
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

<style scoped>
@media only screen and (max-width: 768px) {
  .titleHide {
    display: none;
  }
}
</style>
