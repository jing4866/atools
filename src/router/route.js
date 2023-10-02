// 路由
import Layout from '@/views/layout/index.vue';

export const route = [
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
                meta: { title: '数据分析', icon: 'chart', affix: true },
                component: () => import('@/views/trend/index.vue')
            }
        ]
    },
    {
        path: '/tools',
        component: Layout,
        meta: {
            title: '工具',
            name: 'Tools'
        },
        hidden: false,
        children: [
            {
                path: 'keyword',
                name: 'KeyWord',
                toPath: '/tools/keyword',
                meta: { title: '关键词比较', icon: 'chart', affix: true },
                component: () => import('@/views/tools/KeyWordView.vue')
            },
            {
                path: 'keyroot',
                name: 'KeyRoot',
                toPath: '/tools/keyroot',
                meta: { title: '词根删选', icon: 'chart', affix: true },
                component: () => import('@/views/tools/KeyRootView.vue')
            }
        ]
    },
    {
        path: '/error',
        name: 'ErrorPage',
        hidden: true,
        component: () => import('@/views//ErrorPage.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        hidden: true,
        component: () => import('@/views//NotFound.vue')
    }
]