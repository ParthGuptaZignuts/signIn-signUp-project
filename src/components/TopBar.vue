<script setup lang="ts">
import { ref } from 'vue'
const appTitle = 'Awesome App'
const sidebar = ref(false)
const menuItems = [
  { title: 'Home', path: '/dashboard', icon: 'mdi mdi-home-outline' },
  { title: 'Create Post', path: '/createpost', icon: 'mdi mdi-pencil' }
]
</script>

<template>
  <v-app>
    <v-navigation-drawer v-model="sidebar" app >
      <v-list>
        <v-list-tile v-for="item in menuItems" :key="item.title" :to="item.path">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app>
      <v-toolbar-title>
          {{ appTitle }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="item in menuItems" :key="item.title" :to="item.path">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>
