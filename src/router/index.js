import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/home')
  },
  {
    path: '/in',
    name: 'signIn',
    component: () => import('../views/signIn')
  }
]

const router = new VueRouter({
  routes
})

export default router
