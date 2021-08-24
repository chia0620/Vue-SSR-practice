import { createRouter, createMemoryHistory, createWebHistory } from 'vue-router'
// import MyUser from './components/MyUser.vue'

const isServer = typeof window === 'undefined'

const history = isServer ? createMemoryHistory('/home') : createWebHistory('/home')

const routes = [
  {
    path: '/',
    name: 'home',
    // component: Home
    component: () => import('../views/Home.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/About.vue')
  }
]

export default function () {
  return createRouter({ routes, history })
}
