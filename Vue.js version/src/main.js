import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import AboutCountry from './views/AboutCountry.vue'
import NotFound from './components/NotFound.vue'
import App from './App.vue'
import './index.css'

const routes = [
  { path: '/countries', name: 'Home', component: Home, alias: '/' },
  { path: '/countries/:id', name: 'AboutCountry', component: AboutCountry },
  { path: '/:pathMatch(.*)*', component: NotFound }
]
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')
