import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import AboutCountry from './views/AboutCountry.vue'
import App from './App.vue'
import './index.css'

const routes = [
  { path: '/countries/:id', name: 'AboutCountry', component: AboutCountry },
  { path: '/', name: 'Home', component: Home }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')
