import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/login.vue')
  },
  {
    path: '/student',
    name: 'student',
    component: () => import(/* webpackChunkName: "about" */ '../views/student.vue')
  },
  {
    path: '/webadmin',
    name: 'webadmin',
    component: () => import(/* webpackChunkName: "about" */ '../views/webadmin.vue')
  },
  {
    path: '/doradmin',
    name: 'doradmin',
    component: () => import(/* webpackChunkName: "about" */ '../views/doradmin.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
