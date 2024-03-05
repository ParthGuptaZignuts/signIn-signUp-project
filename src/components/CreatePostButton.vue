<script setup lang="ts">
import { ref } from 'vue'
import axios, { AxiosError } from 'axios'
import Swal from 'sweetalert2'
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'

interface Project {
  name: string
  description: string
}

const isCreatePostDialogOpen = ref<boolean>(false)

const openCreatePostDialog = () => {
  isCreatePostDialogOpen.value = true
}

const closeCreatePostDialog = () => {
  isCreatePostDialogOpen.value = false
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


const { t, locale } = useI18n()
watch(locale, (newlocale) => {
  localStorage.setItem('locale', newlocale)
})
</script>

<template>
  <div class="demo-space-x mt-5">
    <VBtn color="primary" @click="openCreatePostDialog">{{ t('Create Post') }}</VBtn>
  </div>
  <v-dialog v-model="isCreatePostDialogOpen" persistent max-width="500">
    <v-card>
      <h2 class="text-center mt-5 mb-3"> {{ t('Create New Project') }}</h2>
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
              <v-row>
                <v-col>
                  <div class="demo-space-x" @click="handleSave" :disabled="isSaving">
                    <VBtn variant="text" color="info">{{ t('Save') }}</VBtn>
                  </div>
                  <div class="demo-space-x" @click="closeCreatePostDialog">
                    <VBtn variant="text" color="error">{{ t('Close') }}</VBtn>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-body>
      </v-card>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
