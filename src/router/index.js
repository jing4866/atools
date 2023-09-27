import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/layout/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      hidden: true,
      component: () => import('@/views/login/index.vue')
    },
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      hidden: false,
      children: [{
        path: 'home',
        name: 'Home',
        toPath: '/home',
        meta: { title: '首页', icon: 'chart', affix: true },
        component: () => import('@/views/home/index.vue')
      }]
    },
    {
      path: '/trend',
      component: Layout,
      hidden: false,
      children: [
        {
          path: '',
          name: 'Trend',
          toPath: '/trend',
          meta: { title: '趋势分析', icon: 'chart', affix: true },
          component: () => import('@/views/trend/index.vue')
        }
      ]
    },
    {
      path:'/tools',
      component: Layout,
      meta: {
        title: '工具',
        name: 'Tools'
      },
      hidden: false,
      children:[
        {
          path:'keyword',
          name: 'KeyWord',
          toPath: '/tools/keyword',
          meta: { title: '关键词比较', icon: 'chart', affix: true },
          component: () => import('@/views/tools/KeyWordView.vue')
        },
        {
          path:'keyroot',
          name: 'KeyRoot',
          toPath: '/tools/keyroot',
          meta: { title: '词根删选', icon: 'chart', affix: true },  
          component: () => import('@/views/tools/KeyRootView.vue')   
        }
      ]
    }

    // {
    //   path: '/keyword',
    //   component: Layout,
    //   children: [
    //     {
    //       path: '/',
    //       component: () => () => import('@/views/KeyWordView.vue'),
    //       name: 'KeyWord',
    //       meta: { title: '关键词', icon: 'chart', affix: true }
    //     }
    //   ]
    // },
    // {
    //   path: '/keyroot',
    //   name: 'KeyRoot',
    //   component: () => import('@/views/KeyRootView.vue')
    // }
  ]
})

export default router
