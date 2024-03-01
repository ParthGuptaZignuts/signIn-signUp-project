<!-- <template>
  <v-card title="Nutrition" flat>
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

    <v-data-table
      :headers="headers"
      :items="filteredDesserts"
      :search="search"
    ></v-data-table>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const search = ref('');
const headers = [
  {
    align: 'start',
    key: 'name',
    sortable: false,
    title: 'Dessert (100g serving)',
  },
  { key: 'calories', title: 'Calories' },
  { key: 'fat', title: 'Fat (g)' },
  { key: 'carbs', title: 'Carbs (g)' },
  { key: 'protein', title: 'Protein (g)' },
  { key: 'iron', title: 'Iron (%)' },
];

const desserts = ref([
  // ... your dessert data
]);

const filteredDesserts = computed(() => {
  const searchTerm = search.value.toLowerCase();
  return desserts.value.filter((dessert) =>
    dessert.name.toLowerCase().includes(searchTerm)
  );
});
</script> -->
<!-- 
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

interface Project {
  id: number;
  // Add other properties as needed
}

const projects = ref<Project[]>([]);

const fetchProjectList = () => {
  axios.get<Project[]>('/api/projects')
    .then(response => {
      projects.value = response.data;
      return response;
    })
    .catch(error => {
      return error;
    });
};

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
      axios.delete(`/api/projects/${id}`)
        .then(response => {
          Swal.fire({
            icon: 'success',
            title: 'Project deleted successfully!',
            showConfirmButton: false,
            timer: 1500
          });
          fetchProjectList();
          return response;
        })
        .catch(error => {
          Swal.fire({
            icon: 'error',
            title: 'An Error Occurred!',
            showConfirmButton: false,
            timer: 1500
          });
          return error;
        });
    }
  });
};

onMounted(() => {
  fetchProjectList();
});
</script>


<template>
  <LayoutDiv>
    <div class="container">
      <div class="card">
        <div class="card-body">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th width="240px">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="project in projects" :key="project.id">
                <td>{{ project.name }}</td>
                <td>{{ project.description }}</td>
                <td>
                  <router-link :to="`/show/${project.id}`" class="btn btn-outline-info mx-1">Show</router-link>
                  <router-link :to="`/edit/${project.id}`" class="btn btn-outline-success mx-1">Edit</router-link>
                  <button @click="handleDelete(project.id)" class="btn btn-outline-danger mx-1">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </LayoutDiv>
</template> -->


<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

interface Project {
  id: number;
  // Add other properties as needed
}

const projects = ref<Project[]>([]);
const search = ref('');

const fetchProjectList = () => {
  axios.get<Project[]>('/api/projects')
    .then(response => {
      projects.value = response.data;
    })
    .catch(error => {
      console.error(error);
    });
};

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
      axios.delete(`/api/projects/${id}`)
        .then(response => {
          Swal.fire({
            icon: 'success',
            title: 'Project deleted successfully!',
            showConfirmButton: false,
            timer: 1500
          });
          fetchProjectList();
        })
        .catch(error => {
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'An Error Occurred!',
            showConfirmButton: false,
            timer: 1500
          });
        });
    }
  });
};

onMounted(() => {
  fetchProjectList();
});

const headers = [
  
];

const filteredDesserts = computed(() => {
  // Assuming you have a computed property for filtering
  return projects.value.filter(project => {
    // Implement your filtering logic based on the search term
    return project.name.toLowerCase().includes(search.value.toLowerCase());
  });
});
</script>

<template>
  <v-card title="Dashbard" flat>
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

    <v-data-table
      :headers="headers"
      :items="filteredDesserts"
      :search="search"
    ></v-data-table>
  </v-card>
</template>


