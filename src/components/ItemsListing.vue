<script setup lang="ts">
// imports
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import ProjectDetails from './ProjectDetails.vue'
import ProjectEdit from './ProjectEdit.vue'
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'

// interface
interface Project {
  id: number
  name: string
  description: string
}

// variables
const { t, locale } = useI18n()
const projects = ref<Project[]>([])
const search = ref<string>('')
const headers = [
  {
    title: 'Name',
    align: 'start',
    sortable: false,
    value: 'name'
  },
  {
    title: 'Description',
    align: 'start',
    sortable: false,
    value: 'description'
  },
  {
    title: 'Actions',
    align: 'start',
    sortable: false,
    value: 'actions'
  }
]
const viewDialog = ref(false)
const projectDetails = ref({})
const createEditDialog = ref(false)
const pId = ref<string>('')

// methods
const fetchProjectList = () => {
  axios
    .get<Project[]>('/api/projects')
    .then((response) => {
      projects.value = response.data
    })
    .catch((error) => {
      console.error(error)
    })
}

const handleDelete = (id: number) => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .delete(`/api/projects/${id}`)
        .then((response) => {
          Swal.fire({
            icon: 'success',
            title: 'Project deleted successfully!',
            showConfirmButton: false,
            timer: 1500
          })
          fetchProjectList()
        })
        .catch((error) => {
          console.error(error)
          Swal.fire({
            icon: 'error',
            title: 'An Error Occurred!',
            showConfirmButton: false,
            timer: 1500
          })
        })
    }
  })
}

const filteredProjects = computed(() => {
  return projects.value
    .filter((project) => {
      return (
        project.name.toLowerCase().includes(search.value.toLowerCase()) ||
        project.description.toLowerCase().includes(search.value.toLowerCase())
      )
    })
    .reverse()
})

const truncateText = (text: string) => {
  if (text.length >= 25) {
    let result = text.substring(0, 25)
    result = result + '...'
    return result
  }
  return text
}

const truncateDes = (text: string) => {
  if (text.length >= 60) {
    let ans = text.substring(0, 60)
    ans = ans + '...'
    return ans
  }
  return text
}

const editItemBackup = (id: number) => {
  createEditDialog.value = true
  pId.value = id
}

const viewItemBackup = (item: object) => {
  viewDialog.value = true
  projectDetails.value = item
}

const handleViewDialog = (event: boolean) => {
  viewDialog.value = event
}

const handleEditDialog = (event: boolean) => {
  createEditDialog.value = event
}

const create = () => {
  createEditDialog.value = true
  pId.value = null
}

const downloadData = () => {
  const csvContent =
    'data:text/csv;charset=utf-8,' +
    'Name,Description\n' +
    filteredProjects.value.map((project) => `${project.name},${project.description}`).join('\n')
  const encodedUri = encodeURI(csvContent)
  const link = document.createElement('a')
  link.setAttribute('href', encodedUri)
  link.setAttribute('download', 'project_data.csv')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

onMounted(() => {
  fetchProjectList()
})

// watcher
watch(locale, (newlocale) => {
  localStorage.setItem('locale', newlocale)
})
</script>

<template>
  <div>
    <VBtn color="success" class="mt-5" @click="create" @createEditSuccess="fetchProjectList"
      >Create</VBtn
    >
    <VIcon icon="mdi mdi-file-download" class="float-end mt-5" size="35" @click="downloadData" />
    <VCard :title="t('Dashboard')" flat>
      <VTextField
        v-model="search"
        :label="t('Search')"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        single-line
      ></VTextField>

      <VDataTable :headers="headers" :items="filteredProjects" :search="search">
        <template v-slot:item="{ item }">
          <tr>
            <td>
              <div class="demo-space-x">
                <span>{{ truncateText(item.name) }}</span>
                <VTooltip
                  open-on-focus
                  location="top"
                  activator="parent"
                  v-if="item.name.length >= 24"
                >
                  {{ item.name }}
                </VTooltip>
              </div>
            </td>

            <td>
              <div class="demo-space-x">
                <span>{{ truncateDes(item.description) }}</span>
                <VTooltip
                  open-on-focus
                  location="top"
                  activator="parent"
                  v-if="item.description.length >= 59"
                >
                  {{ item.description }}
                </VTooltip>
              </div>
            </td>

            <td>
              <VRow class="flex-column flex-md-row ma-0">
                <VCol cols="3">
                  <VIcon icon="mdi-eye" @click="viewItemBackup(item)" />
                </VCol>
                <VCol cols="3">
                  <VIcon icon="mdi-pencil" @click="editItemBackup(item.id)" />
                </VCol>
                <VCol cols="3">
                  <VIcon icon="mdi mdi-delete-empty" @click="handleDelete(item.id)" />
                </VCol>
              </VRow>
            </td>
          </tr>
        </template>
      </VDataTable>
    </VCard>
    <ProjectDetails
      :is-visible="viewDialog"
      :project="projectDetails"
      @handleDialog="handleViewDialog"
    />
    <ProjectEdit
      :is-visible="createEditDialog"
      :projectId="pId"
      @handleDialog="handleEditDialog"
      @createEditSuccess="fetchProjectList"
    />
  </div>
</template>
