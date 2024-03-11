import './assets/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';

// import axios
import axios from './axiosInterceptor'; // Import the axios instance from the separate file

import { createI18n } from 'vue-i18n';
import en from './language/en-US.json';
import hi from './language/hi-Hindi.json';
import gu from './language/gu-Gujarati.json';

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
    Gujarati: gu,
  },
});

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    iconfont: 'mdi',
    defaultSet: 'mdi',
  },
});

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(vuetify);
app.use(i18n);
app.use(Vue3Toasity, {
  autoClose: 3000,
} as ToastContainerOptions);
app.mount('#app');

// use axios
app.config.globalProperties.$axios = axios;
