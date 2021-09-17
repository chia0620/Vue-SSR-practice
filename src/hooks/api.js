import axios from 'axios'
// import useStore from '@/store/index'
// import store from '@/store'

// const store = useStore()

const api = axios.create({
  baseURL: ''
  // baseURL: process.env.VUE_APP_API
})

api.interceptors.request.use(
  request => {
    // console.log(request)
    // request.withCredentials = true
    // if (request.method !== 'get') store.commit('setIsLoading', true)
    return request
  },
  error => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  response => {
    // console.log(response)
    // store.commit('setIsLoading', false)
    return response
  },
  async error => {
    // const { response } = error
    // if (response.status === 401) {
    // router.push('/')
    // }
    // Promise.reject(error)
    // store.commit('setIsLoading', false)
    return Promise.reject(error)
  }
)

const useMetaDataApi = ({ method, path, data }) => api[method](`/metadata/vb${path}`, data)

export {
  useMetaDataApi
}
