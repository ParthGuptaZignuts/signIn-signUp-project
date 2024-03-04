<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import ProjectDetails from './ProjectDetails.vue'
import ProjectEdit from './ProjectEdit.vue'

interface Project {
  id: number
  name: string
  description: string
}

const projects = ref<Project[]>([])
const search = ref<string>('')

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

onMounted(() => {
  fetchProjectList()
})

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

const filteredProjects = computed(() => {
  return projects.value.filter((project) => {
    return (
      project.name.toLowerCase().includes(search.value.toLowerCase()) ||
      project.description.toLowerCase().includes(search.value.toLowerCase())
    )
  })
})

const truncateText = (text: string) => {
  if(text.length >= 25){
    let result = text.substring(0, 25)
    result = result + '...'
    return result
  }
  return text;
}

const truncateDes = (text: string) => {
  if(text.length >= 60){
    let ans = text.substring(0, 60)
    ans = ans + '...'
    return ans
  }
  return text;
}
</script>

<template>
  <v-card title="Dashboard" flat>
    <v-text-field
      v-model="search"
      label="Search"
      prepend-inner-icon="mdi-magnify"
      variant="outlined"
      hide-details
      single-line
    ></v-text-field>

    <v-data-table :headers="headers" :items="filteredProjects" :search="search">
      <template v-slot:item="{ item }">
        <tr>
          <td>
            <div class="demo-space-x">
              <span>{{ truncateText(item.name) }}</span>
              <VTooltip open-on-focus location="top" activator="parent">
                {{ item.name }}
              </VTooltip> 
            </div>
          </td>

          <td>
            <div class="demo-space-x">
              <span>{{ truncateDes(item.description) }}</span>
              <VTooltip open-on-focus location="top" activator="parent">
                {{ item.description }}
              </VTooltip> 
            </div>
          </td>

          <td>
            <v-row class="flex-column flex-sm-row ma-0">
              <v-col cols="3">
                <ProjectDetails :project="item" />
              </v-col>
              <v-col cols="3">
                <ProjectEdit :exprojectId="item.id" value="Edit" />
              </v-col>
              <v-col cols="3">
                <v-btn color="red" @click="handleDelete(item.id)">Delete</v-btn>
              </v-col>
            </v-row>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>
