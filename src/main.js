import './assets/main.css'
import '../src/components/css/common.css'
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import { createPinia } from 'pinia';

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app');
app.use(VCalendar, {});
