import { createRouter, createMemoryHistory, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const isServer = typeof window === 'undefined'

const history = isServer ? createMemoryHistory() : createWebHistory(process.env.BASE_URL)

const routes = [
  {
    path: '/:id',
    name: 'Home',
    component: Home,
    props: route => ({
      id: route.params.id
    })
  },
  {
    path: '/about/:id',
    name: 'about',
    component: () => import('../views/About.vue'),
    props: route => ({
      id: route.params.id
    })
  }
]

export default function () {
  return createRouter({ routes, history })
}
