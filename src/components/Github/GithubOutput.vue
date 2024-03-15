<script setup>
const props = defineProps(['userProfile', 'error'])
</script>

<template>
  <div v-if="userProfile" class="user-profile">
    <img :src="userProfile.avatar_url" :alt="userProfile.login" />

    <div class="user-details">
      <p><strong>Name:</strong> {{ userProfile.login }}</p>
      <p><strong>Followers:</strong> {{ userProfile.followers }}</p>
      <p><strong>Following:</strong> {{ userProfile.following }}</p>
      <p><strong>Public Repos:</strong> {{ userProfile.public_repos }}</p>
    </div>
  </div>

  <div v-if="error" class="error-message">
    <p>{{ error }}</p>
  </div>
</template>

<style scoped>
.user-profile {
  margin-top: 20px;
}

h2 {
  font-size: 20px;
  margin-bottom: 10px;
  color: #333;
}

img {
  width: 150px;
  border-radius: 50%;
  margin-bottom: 20px;
}

.user-details {
  text-align: center;
}

p {
  font-size: 16px;
  margin-bottom: 10px;
}

.error-message {
  color: #e74c3c;
  margin-top: 20px;
}
</style>
