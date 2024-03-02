<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'

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
    text: 'Name',
    align: 'start',
    sortable: false,
    value: 'name'
  },
  {
    text: 'Description',
    align: 'start',
    sortable: false,
    value: 'description'
  },
  {
    text: 'Actions',
    align: 'start',
    sortable: false,
    value: 'actions'
  }
]

const filteredDesserts = computed(() => {
  return projects.value.filter((project) => {
    return (
      project.name.toLowerCase().includes(search.value.toLowerCase()) ||
      project.description.toLowerCase().includes(search.value.toLowerCase())
    )
  })
})
</script>

<template>
  <v-card title="Dashboard" flat>
    <template v-slot:text>
      <v-text-field
        v-model="search"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        single-line
      ></v-text-field>
    </template>

    <v-data-table :headers="headers" :items="filteredDesserts" :search="search">
      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.name }}</td>
          <td>{{ item.description }}</td>
          <td>
            <v-row>
              <v-col cols="3">
                <v-btn color="green">View</v-btn>
              </v-col>
              <v-col cols="3">
                <v-btn color="blue">Edit</v-btn>
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
