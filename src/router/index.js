import { createRouter, createWebHistory } from 'vue-router';
import { route } from './route.js';

const baseUrl = import.meta.env.BASE_URL;

const router = createRouter({
    history: createWebHistory(baseUrl),
    routes: route
})

export default router
