import axios from 'axios'
import getAppSettings from './getAppSettings'

export const { apiURL } = getAppSettings()

export const api = axios.create({
  baseURL: apiURL,
  // timeout: 0,
})

api.interceptors.request.use(
  (request) => {
    return request
  },
  (error) => {
    // Do something with response error
    console.error('ERROR RECEIVED', error.response)
    return Promise.reject(error)
  },
)
