// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/routes.js';
import store from './store/store.js';
import './style.css'

createApp(App).use(router).use(store).mount('#app');
