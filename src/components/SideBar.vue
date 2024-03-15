<script setup lang="ts">
// imports
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'

// variable
const { t, locale } = useI18n()

// watcher
watch(locale, (newlocale) => {
  localStorage.setItem('locale', newlocale)
})
</script>

<template>
  <VNavigationDrawer app style="background-color: #283046; color: white">
    <VList>
      <VListItem class="text-center">
        <VListItemContent class="font-weight-bold; mt-3">
          {{ t('The App') }}
        </VListItemContent>
      </VListItem>
      <VDivider></VDivider>
      <VListItem class="text-center">
        <VSelect v-model="locale" :items="['Gujarati', 'English', 'Hindi']" dense outlined>
          <template #prepend-inner>
            <VIcon>mdi mdi-translate</VIcon>
          </template>
        </VSelect>
      </VListItem>

      <VListItem style="max-width: 100%">
        <VBtn :to="`/githubuserfinder`" class="bg-transparent justify-space-between" elevation="0">
          <VIcon>mdi mdi-card-account-details</VIcon
          ><span class="pl-2">{{ t('Search For Profile') }}</span>
        </VBtn>
      </VListItem>

      <VListItem style="max-width: 100%">
        <VBtn :to="`/imageHomepage`" class="bg-transparent justify-space-between" elevation="0">
          <VIcon>mdi mdi-image-search</VIcon><span class="pl-2">{{ t('View Products') }}</span>
        </VBtn>
      </VListItem>
    </VList>
  </VNavigationDrawer>
</template>

<style scoped>
select {
  margin-top: 5px;
  color: white;
  border: 1px solid white;
  padding: 0.25rem 0.75rem;
  border-radius: 5px;
}

@media only screen and (max-width: 600px) {
  select {
    width: 100%;
  }

  .ml-2 {
    margin-left: 0.5rem;
  }
}
</style>
