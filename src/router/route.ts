import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomePage from '../pages/HomePage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  }
] as RouteRecordRaw[]

const router = createRouter({
  routes: routes,
  history: createWebHistory()
})

export default router
