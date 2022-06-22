import axios from 'axios'
import getAppSettings from './getAppSettings'

export const { apiURL } = getAppSettings()

export const api = axios.create({
  baseURL: apiURL,
  // timeout: 0,
})

api.interceptors.request.use(
  (request) => {
    console.log('Starting Request', JSON.stringify(request, null, 2))
    return request
  },
  (error) => {
    // Do something with response error
    console.error(error.response)
    return Promise.reject(error)
  },
)
