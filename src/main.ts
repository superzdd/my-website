import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router/auto'
import Vue3TouchEvents from 'vue3-touch-events'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
})
app.use(router)
app.use(Vue3TouchEvents)
app.mount('#app')
