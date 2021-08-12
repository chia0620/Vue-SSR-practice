import { createStore } from 'vuex'
import { inject, provide } from 'vue'
import { useApi } from '@/hooks/api.js'

const StoreSymbol = Symbol('vuex-store')

export function _createStore () {
  return createStore({
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
        const path = '/users?page=2'
        // const data = {
        //   params: {
        //     page: 2
        //   }
        // }

        return useApi({ method, path }).then((response) => {
          const data = response.data
          commit('setData', { data })
        })
      }
    },
    getters: {
      getData: state => state.fetchData
    }
  })
}

export function provideStore (store) {
  provide(StoreSymbol, store)
}

export default function useStore () {
  const store = inject(StoreSymbol)
  // if (!store) {
  //   throw Error('no store provided')
  // }
  return store
}
