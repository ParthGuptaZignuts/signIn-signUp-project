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
