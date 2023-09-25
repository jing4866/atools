import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/dist/index.css'
import './assets/custom.css'

//解决指定警告问题： Added non-passive event listener to a scroll-blocking <某些> 事件. Consider marking event handler as 'passive' to make the page more responsive.
// 当使用echarts的datazoom时，会导致echarts报错
// import 'default-passive-events'

const app = createApp(App)

app.use(router);

app.use(ElementPlus, {
    locale: zhCn,
});

app.mount('#app')
