import Vue from 'vue'
import Vuex from 'vuex'
import { useApi } from '@/hooks/api.js'
// import example from '../store/modules/example'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: () => ({
    fetchData: ''
  }),
  mutations: {
    setData: (state, { data }) => {
      state.fetchData = data
    }
  },
  actions: {
    fetchInitialData: async ({ commit }) => {
      const method = 'get'
      const path = '/user_get_staff_info'
      const data = {
        params: {
          _id: '5ff7f1ef65743732cb700000',
          staff_num: 1
        }
      }

      return useApi({ method, path, data }).then((response) => {
        const message = response.data.message
        commit('setData', { data: message })
      })
    }

  },
  getters: {
    getData: state => state.fetchData
  }
  // modules: {
  //   example
  // }
})

export default store

export function createStore () {
  return store
}
