<script setup lang="ts"></script>

<template>
  <VCard
    class="text-xs-center mt-15 pa-5 d-flex flex-column justify-center align-center"
    elevation="12"
    style="height: 80vh; gap: 60px"
  >
    <VFlex xs12>
      <h1 style="font-size: 50px">Welcome to the Application</h1>
    </VFlex>
    <VFlex xs12 sm6 offset-sm3 mt-3>
      <blockquote class="blockquote text-xs-center" style="color: rgb(56, 55, 55); font-size: 30px">
        It's a basic Single Page application <br />
        made with Vue calling data from api
      </blockquote>
    </VFlex>
    <VFlex xs12 sm6 offset-sm3 class="text-xs-center" mt-5 style="display: flex; gap: 30px">
      <VBtn color="primary" to="/signup">Sign Up</VBtn>
      <VBtn to="/signin">Sign In</VBtn>
    </VFlex>
  </VCard>
</template>
