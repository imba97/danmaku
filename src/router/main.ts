import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    name: 'Main',
    path: '/',
    component: () => import('@/views/Main/index.vue')
  },
  {
    name: 'Danmaku',
    path: '/Danmaku',
    component: () => import('@/views/Danmaku/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
