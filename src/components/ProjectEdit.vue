<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import type Project from '../Project'

const loading = ref(false)
const dialog = ref(false)
const projectId = ref<number>()
const project = ref<Project>({
  projectName: '',
  projectDescription: ''
})

const { value, exprojectId } = defineProps<{ value: string; exprojectId?: number }>()

const getProject = () => {
  if (exprojectId) {
    projectId.value = exprojectId
    axios
      .get(`/api/projects/${projectId.value}`)
      .then((response) => {
        let projectData = response.data
        project.value.projectName = projectData.name
        project.value.projectDescription = projectData.description
        return response
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'An Error Occurred!',
          showConfirmButton: false,
          timer: 1500
        })
        return error
      })
  }
}

const saveProject = () => {
  if (!project.value.projectName || !project.value.projectDescription) {
    Swal.fire({
      icon: 'error',
      title: 'Please fill in all required fields!',
      showConfirmButton: false,
      timer: 1500
    })
    return
  }
  loading.value = true
  const method = projectId.value ? 'patch' : 'post'
  const url = projectId.value ? `/api/projects/${projectId.value}` : '/api/projects'
  axios[method](url, {
    name: project.value.projectName,
    description: project.value.projectDescription
  })
    .then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Project saved successfully!',
        showConfirmButton: false,
        timer: 1500
      })
      project.value.projectName = ''
      project.value.projectDescription = ''
      dialog.value = false
    })
    .catch((error) => {
      Swal.fire({
        icon: 'error',
        title: 'An Error Occurred!',
        showConfirmButton: false,
        timer: 1500
      })
      return error
    })
    .finally(() => {
      loading.value = false
    })
}

onMounted(() => {
  getProject()
})
</script>

<template>
  <div class="text-center d-inline">
    <VDialog v-model="dialog" max-width="600">
      <template #activator="{ props: activatorProps }">
        <v-btn color="blue" :text="value" v-bind="activatorProps"></v-btn>
      </template>
      <VCard prepend-icon="mdi-pencil" :title="`${projectId ? 'Edit' : 'Create'} Project`">
        <VCardText>
          <VRow dense>
            <VCol cols="12">
              <VTextField v-model="project.projectName" label="Project Name" required></VTextField>
            </VCol>
            <VCol cols="12">
              <VTextField
                v-model="project.projectDescription"
                label="Project Description"
                required
              ></VTextField>
            </VCol>
          </VRow>
        </VCardText>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn  @click="dialog = false">Close</v-btn>
          <div class="demo-space-x"> 
              <v-btn color="info"  @click="saveProject">Save Changes</v-btn>
          </div>
        </v-card-actions>
      </VCard>
    </VDialog>
  </div>
</template>
