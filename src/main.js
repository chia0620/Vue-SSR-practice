import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'
import { sync } from 'vuex-router-sync'
import axios from 'axios'
import VueAxios from 'vue-axios'

export function createApp () {
  const router = createRouter()
  const store = createStore()

  sync(store, router)

  Vue.use(VueAxios, axios)
  Vue.config.devtools = true
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  return { app, router, store }
}
