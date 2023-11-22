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
        path: '/dashboard',
        component: Layout,
        hidden: false,
        children: [
            {
                path: '',
                name: 'Dashboard',
                toPath: '/dashboard',
                meta: { title: '数据分析', icon: 'chart', affix: true },
                component: () => import('@/views/dashboard/index.vue')
            }
        ]
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
        path: '/spider',
        component: Layout,
        hidden: false,
        children: [
            {
                path: '',
                name: 'Spider',
                toPath: '/spider',
                meta: { title: '网络爬虫', icon: 'bug', affix: true },
                component: () => import('@/views/spider/index.vue')
            }
        ]
    },
    {
        path: '/ranks',
        component: Layout,
        hidden: false,
        children: [
            {
                path: '',
                name: 'RankHistory',
                toPath: '/ranks',
                meta: { title: '历史排名', icon: 'bug', affix: true },
                component: () => import('@/views/ranks/index.vue')
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