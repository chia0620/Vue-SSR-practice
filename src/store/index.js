import { createStore } from 'vuex'
import { inject, provide } from 'vue'
import { useMetaDataApi } from '../hooks/api.js'

const StoreSymbol = Symbol('vuex-store')

export function _createStore () {
  return createStore({
    state: () => ({
      metadata: {}
    }),
    mutations: {
      setMetaData: (state, { type, data }) => {
        state.metadata = data
      }
    },
    actions: {
      readMetaData: async ({ state, commit }, { payload }) => {
        const method = 'get'
        const path = '/metadata'
        const data = {
          params: {
            ...payload
          }
        }

        try {
          const response = await useMetaDataApi({ method, path, data })
          const metadata = response.data.data
          console.log(response)
          commit('setMetaData', { data: metadata })
          return response
        } catch (error) {
          console.log(error)
          return Promise.reject(error)
        }
      }
    },
    getters: {
      getMetaData: state => state.metadata
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
