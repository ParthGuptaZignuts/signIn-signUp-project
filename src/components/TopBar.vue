<script setup lang="ts">
import CreatePostButton from './CreatePostButton.vue'
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
watch(locale, (newlocale) => {
  localStorage.setItem('locale', newlocale)
})
</script>

<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title>{{ t('Awesome App') }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn :to="'/dashboard'">
          <v-icon>mdi mdi-home-outline</v-icon>
          {{ t('Home') }}
        </v-btn>

        <div class="pt-5">
          <v-icon>mdi mdi-translate</v-icon>
          {{ t('Select Language') }} ->
        </div>
        <select v-model="locale">
          <option>Gujarati</option>
          <option>English</option>
          <option>Hindi</option>
        </select>
      </v-toolbar-items>
    </v-toolbar>

    <CreatePostButton />

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>
