<!-- <script setup lang="ts">
import { ref, defineProps } from 'vue';

const props = defineProps(['project']);
const dialog = ref(false);
</script>

<template>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>Project Details</v-card-title>
        <v-card-text>
          <div>Name: {{ props.project.name }}</div>
          <div>Description: {{ props.project.description }}</div>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
   -->

   <template>
    <div>
      <h2 class="text-center mt-5 mb-3">Show Project</h2>
      <div class="card">
        <div class="card-header">
          <router-link class="btn btn-outline-info float-right" to="/dashboard">View All Projects</router-link>
        </div>
        <div class="card-body">
          <b class="text-muted">Name:</b>
          <p>{{ project.name }}</p>
          <b class="text-muted">Description:</b>
          <p>{{ project.description }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import axios from 'axios';
  import { ref, onMounted, defineProps } from 'vue';
  import Swal from 'sweetalert2';
  
  interface Project {
    id: number;
    name: string;
    description: string;
  }
  
  const props = defineProps(['route']);
  
  const project = ref<Project>({
    id: 0,
    name: '',
    description: '',
  });
  
  const fetchProjectInfo = () => {
    const id = props.route.params.id;
  
    axios
      .get<Project>(`/api/projects/${id}`)
      .then((response) => {
        const projectInfo = response.data;
        project.value.id = projectInfo.id;
        project.value.name = projectInfo.name;
        project.value.description = projectInfo.description;
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'An Error Occurred!',
          showConfirmButton: false,
          timer: 1500,
        });
        console.error(error);
      });
  };
  
  onMounted(() => {
    fetchProjectInfo();
  });
  </script>
  

  