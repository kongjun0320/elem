import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

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
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/profile')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/in') {
    next()
  } else {
    if (store.state.user) {
      next()
    } else {
      next('/in')
    }
  }
})

export default router
