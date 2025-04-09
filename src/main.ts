import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'

import App from './App.vue'
import router from './router'

import { initializeDB } from '@/libs/providers/indexdb'
import { vueQueryPluginOptions } from '@/libs/providers/query-client'

initializeDB()

const app = createApp(App)

app.use(createPinia())
app.use(VueQueryPlugin, vueQueryPluginOptions)
app.use(router)

app.mount('#app')
