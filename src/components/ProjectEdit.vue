<script setup lang="ts">
import { ref, defineProps, watch } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import type Project from '../Project'

const loading = ref(false)

const project = ref<Project>({
  projectName: '',
  projectDescription: ''
})

const props = defineProps<{
  projectId: number | string
  isVisible: boolean
}>()

const emit = defineEmits(['handleDialog', 'createEditSuccess'])

const getProject = () => {
  axios
    .get(`/api/projects/${props.projectId}`)
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
  const method = props.projectId ? 'patch' : 'post'
  const url = props.projectId ? `/api/projects/${props.projectId}` : '/api/projects'
  axios[method](url, {
    name: project.value.projectName,
    description: project.value.projectDescription
  })
    .then(() => {
      emit('createEditSuccess', true)
      Swal.fire({
        icon: 'success',
        title: 'Project saved successfully!',
        showConfirmButton: false,
        timer: 1500
      })
      project.value.projectName = ''
      project.value.projectDescription = ''
      emit('handleDialog', false)
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

const handleClose = () => {
  project.value = {
    projectName: '',
    projectDescription: ''
  }
  emit('handleDialog', false)
}

watch(
  () => props.isVisible,
  (newValue) => {
    if (newValue && props.projectId) {
      getProject()
    }
  }
)
</script>

<template>
  <VDialog :model-value="isVisible" max-width="600" persistent>
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
        <v-btn @click="handleClose">Close</v-btn>
        <div class="demo-space-x">
          <v-btn color="info" @click="saveProject">Save Changes</v-btn>
        </div>
      </v-card-actions>
    </VCard>
  </VDialog>
</template>
