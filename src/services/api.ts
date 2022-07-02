import AsyncStorage from '@react-native-async-storage/async-storage'
import axios, { AxiosError } from 'axios'

import Constants from 'expo-constants'
const { manifest } = Constants

// const base =  process.env.BASE_URL
const base =
  typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
    ? `http://${manifest.debuggerHost.split(`:`).shift().concat(`:3000`)}`
    : process.env.BASE_URL

const api = axios.create({
  baseURL: base,
})

const getToken = async () => {
  const userStorageKey = '@spotyparking:user'
  const user: string | null = await AsyncStorage.getItem(userStorageKey)
  return user ? JSON.parse(user).token : null
}

api.interceptors.request.use(async function (config) {
  const token = await getToken()
  if (token) {
    config.headers!.Authorization = `Bearer ${token}`
  }
  return config
})

export const setTokenInterceptors = (signOut: () => void) => {
  api.interceptors.response.use(
    response => {
      return response
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        signOut()
      }

      return Promise.reject(error)
    },
  )
}

export { api }
