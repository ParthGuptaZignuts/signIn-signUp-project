<script setup lang="ts">
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
watch(locale, (newlocale) => {
  localStorage.setItem('locale', newlocale)
})
</script>

<template>
  <VNavigationDrawer app style="background-color: #283046; color: white">
    <VList>
      <VListItem class="text-center">
        <VListItem-content class="font-weight-bold; mt-3">
          {{ t('The App') }}
        </VListItem-content>
      </VListItem>
      <VDivider></VDivider>
      <VListItem class="text-center">
        <VSelect v-model="locale" :items="['Gujarati', 'English', 'Hindi']" dense outlined>
          <template #prepend-inner>
            <VIcon>mdi mdi-translate</VIcon>
          </template>
        </VSelect>
      </VListItem>
    </VList>
  </VNavigationDrawer>
</template>

<style scoped>
select {
  margin-top: 5px;
  color: white;
  border: 1px solid white;
  padding: 0.25rem .75rem;
  border-radius: 5px;
}

@media only screen and (max-width: 600px) {
  select {
    width: 100%; 
  }
}
</style>
