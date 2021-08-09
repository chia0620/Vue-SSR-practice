import axios from 'axios'
import store from '@/store'

const api = axios.create({
  baseURL: process.env.VUE_APP_API
})

api.interceptors.request.use(
  request => {
    console.log(request)
    request.headers['Access-Token'] = store.getters.getAccessToken
    request.headers.Account = store.getters.getAccount
    if (request.method !== 'get') store.commit('setIsLoading', true)
    return request
  },
  error => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  response => {
    console.log(response)
    store.commit('setIsLoading', false)
    return response
  },
  async error => {
    Promise.reject(error)
    store.commit('setIsLoading', false)
    return Promise.reject(error)
  }
)

const useApi = ({ method, path, data }) => api[method](`${path}`, data)

export {
  useApi
}
