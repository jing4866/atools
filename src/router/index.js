import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/login/index.vue')
    },
    {
      path: '/trend',
      name: 'Trend',
      component: () => import('../views/TrendView.vue')
    },
    {
      path: '/keyword',
      name: 'KeyWord',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/KeyWordView.vue')
    },
    {
      path: '/keyroot',
      name: 'KeyRoot',
      component: () => import('../views/KeyRootView.vue')
    }
  ]
})

export default router
