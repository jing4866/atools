import '@/assets/styles/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import 'element-plus/dist/index.css';
import '@/assets/styles/custom.css';
import { createPinia } from 'pinia';


// 全局状态管理中间件
const pinia = createPinia()

//解决指定警告问题： Added non-passive event listener to a scroll-blocking <某些> 事件. Consider marking event handler as 'passive' to make the page more responsive.
// 当使用echarts的datazoom时，会导致echarts报错
// import 'default-passive-events'

// 创建一个 Vue 应用
const app = createApp(App)

// 使用全局状态管理中间件
app.use(pinia);
// 使用路由管理中间件
app.use(router);
// 使用 UI 库
app.use(ElementPlus, {
    locale: zhCn,
});

app.mount('#app');
