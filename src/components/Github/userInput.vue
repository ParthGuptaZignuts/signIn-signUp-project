<script setup>
import { ref } from 'vue'
// imports
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'

// variable
const { t, locale } = useI18n()

// watcher
watch(locale, (newlocale) => {
  localStorage.setItem('locale', newlocale)
})

const username = ref('')
const emit = defineEmits(['usernameSubmitted'])

const onSubmit = () => {
  if (username.value) {
    emit('usernameSubmitted', username.value)
    username.value = ''
  }
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <input
      type="text"
      v-model="username"
      placeholder="Enter a github username here"
      required="true"
    />
    <button type="submit">{{t('SUBMIT')}}</button>
  </form>
</template>

<style scoped>
button {
  border: 2px solid #4caf50;
  color: white;
  background-color: #4caf50;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 4px;
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #45a049;
}

input {
  width: 300px;
  padding: 10px 10px;
  margin: 8px;
  display: inline-block;
  border: 1px solid #45a049;
  border-radius: 4px;
  box-sizing: border-box;
}
</style>
