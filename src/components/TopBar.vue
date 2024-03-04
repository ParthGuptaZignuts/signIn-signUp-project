<script setup lang="ts">
import CreatePostButton from './CreatePostButton.vue'
interface MenuItem {
  title: string
  path: string
  icon: string
}

const appTitle: string = 'Awesome App'
const menuItems: MenuItem[] = [
  { title: 'Home', path: '/dashboard', icon: 'mdi mdi-home-outline' },
  { title: 'Select Language', icon: 'mdi ' }
]
</script>

<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title>{{ appTitle }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="item in menuItems" :key="item.title">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <CreatePostButton />

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>
