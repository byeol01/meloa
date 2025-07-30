import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Sunny from '../components/Sunny.vue';
import Cloudy from '../components/Cloudy.vue';
import Snowy from '../components/Snowy.vue';
import Rainy from '../components/Rainy.vue';
import Event from '../components/Event.vue';


const routes = [
  { path: '/', component: Home },
  { path: '/Sunny', component: Sunny },
  { path: '/Cloudy', component: Cloudy },
  { path: '/Snowy', component: Snowy },
  { path: '/Rainy', component: Rainy },
  { path: '/Event', component: Event },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
