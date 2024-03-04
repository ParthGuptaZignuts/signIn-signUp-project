<script setup lang="ts">
import { ref } from 'vue'
import axios, { AxiosError } from 'axios'
import Swal from 'sweetalert2'

interface MenuItem {
  title: string
  path: string
  icon: string
}

interface Project {
  name: string
  description: string
}

const appTitle: string = 'Awesome App'
const menuItems: MenuItem[] = [
  { title: 'Home', path: '/dashboard', icon: 'mdi mdi-home-outline' },
  { title: 'Create Post', icon: 'mdi mdi-pencil' }
]

const isCreatePostDialogOpen = ref<boolean>(false)

const openCreatePostDialog = () => {
  isCreatePostDialogOpen.value = true
}

const closeCreatePostDialog = () => {
  isCreatePostDialogOpen.value = false
}

const handleMenuItemClick = (menuItem: MenuItem) => {
  if (menuItem.title === 'Create Post') {
    openCreatePostDialog()
  }
}

const project = ref<Project>({
  name: '',
  description: ''
})

const isSaving = ref<boolean>(false)
const data = ref<Project | null>(null)

const handleSave = () => {
  isSaving.value = true
  axios
    .post('/api/projects', project.value)
    .then((response) => {
      Swal.fire({
        icon: 'success',
        title: 'Project saved successfully!',
        showConfirmButton: false,
        timer: 1500
      })
      isSaving.value = false
      project.value.name = ''
      project.value.description = ''
      data.value = response.data
      closeCreatePostDialog()
      return response
    })
    .catch((error: AxiosError) => {
      isSaving.value = false
      return error
    })
}
</script>

<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title>{{ appTitle }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="item in menuItems" :key="item.title" @click="handleMenuItemClick(item)">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>

    <v-dialog v-model="isCreatePostDialogOpen" persistent max-width="500">
      <v-card>
          <h2 class="text-center mt-5 mb-3">Create New Project</h2>
          <v-card>
            <v-card-body>
              <v-form>
                <v-container>
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="project.name"
                        label="Name"
                        name="name"
                        maxlength="50"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-textarea
                        v-model="project.description"
                        label="Description"
                        rows="3"
                        name="description"
                        maxlength="200"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                  <v-row >
                    <v-col>
                      <div class="demo-space-x" @click="handleSave" :disabled="isSaving">
                        <VBtn variant="text"  color="info">Save</VBtn>
                      </div>
                      <div class="demo-space-x" @click="closeCreatePostDialog">
                        <VBtn variant="text" color="error">Close</VBtn>
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card-body>
          </v-card>
      </v-card>
    </v-dialog>
  </v-app>
</template>
