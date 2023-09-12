import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
// import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/dist/index.css'
import './assets/custom.css'

const app = createApp(App)

app.use(router)
app.use(ElementPlus)

app.mount('#app')
