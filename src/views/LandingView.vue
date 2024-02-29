<script setup lang="ts">

</script>

<template>
    <v-card class="text-xs-center mt-15 pa-5 d-flex flex-column justify-center align-center" elevation="12" style="height: 80vh; gap:60px" >
      <v-flex xs12>
        <h1 style="font-size: 50px;">Welcome to the Application</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <blockquote class="blockquote text-xs-center" style="color:rgb(56, 55, 55); font-size:30px">
          It's a basic Single Page application <br>
          made with Vue calling data from api 
        </blockquote>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 class="text-xs-center" mt-5 style="display:flex ; gap:30px">
        <v-btn color="primary" to="/signup">Sign Up</v-btn>
        <v-btn to="/signin">Sign In</v-btn>
      </v-flex>
    </v-card>
  </template>


  