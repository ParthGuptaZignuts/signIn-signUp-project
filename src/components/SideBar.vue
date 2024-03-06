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
        <div>
          <VIcon>mdi mdi-translate</VIcon>
          {{ t('Select Language') }}:
        </div>

        <select style="width: fit-content" v-model="locale">
          <option>Gujarati</option>
          <option>English</option>
          <option>Hindi</option>
        </select>
      </VListItem>
    </VList>
  </VNavigationDrawer>
</template>

<style scoped>
select{
  margin-top: 5px;
  color: white;
  border: 1px solid white;
  padding: 0.25rem .75rem;
  border-radius: 5px;
}
</style>