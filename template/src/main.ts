import { createApp } from 'vue';
import App from './App.vue';
import router from './route';
import { createPinia } from 'pinia';

import '@/styles/index.scss'; //TW
import 'element-plus/dist/index.css'; //EL
import '@purge-icons/generated'; //icon

const app = createApp(App);
app.use(router).use(createPinia());
app.mount('#app');
