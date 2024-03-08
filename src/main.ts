import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

// import axios
import axios from 'axios'

import { createI18n } from 'vue-i18n'
import en from './language/en-US.json'
import hi from './language/hi-Hindi.json'
import gu from './language/gu-Gujarati.json'

// import toastify 
import Vue3Toasity, { type ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('locale') ?? 'English',
  fallbackLocale: 'zh-TW',
  messages: {
    Hindi: hi,
    English: en,
    Gujarati: gu
  }
})

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    iconfont: 'mdi',
    defaultSet: 'mdi'
  }
})

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(i18n)
app.use( Vue3Toasity,
  {
    autoClose: 3000,
  } as ToastContainerOptions,)
app.mount('#app')

// use axios
app.config.globalProperties.$axios = axios

// golbal base url :
axios.defaults.baseURL = 'https://mock-api.binaryboxtuts.com/'

// request intercetpor
axios.interceptors.request.use(function (config) {
  config.headers['X-Binarybox-Api-Key'] =
    'binarybox_api_key_VzO8M31mfzUAW58MBuDkyVX68IWufWJWW7m5BqqSi3FSXHHwKeHjuXQzOC7QdACzffplQ93npFb6Q3sMQLeImXxkz3IHQDkWy1yt'
  return config
})
