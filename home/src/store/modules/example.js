import { useBoothApi } from '@/hooks/api.js'

const state = () => ({
  fetchData: {}
})
const mutations = {
  setData: (state, { data }) => {
    state.fetchData = data
  }
}
const actions = {
  fetchInitialData: async ({ commit }, { payload }) => {
    const method = 'get'
    const path = '/basic_setting'
    const data = {
      params: {
        booth_id: '60d78d3f93e8f50aefe970b3'
      }
    }

    return useBoothApi({ method, path, data }).then((response) => {
      const basicSetting = response.data.data
      commit('setData', { data: basicSetting })
    })
  },
  readData: async ({ commit }, { payload }) => {
    const method = 'get'
    const path = '/basic_setting'
    const data = {
      params: {
        booth_id: '60d78d3f93e8f50aefe970b3'
      }
    }

    try {
      const response = await useBoothApi({ method, path, data })
      const basicSetting = response.data.data
      commit('setData', { data: basicSetting })
      return response
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
const getters = {
  getData: state => state.fetchData
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
