import axios from 'axios'
import Constants from 'expo-constants'
const { manifest } = Constants

const base =
  typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
    ? `http://${manifest.debuggerHost.split(`:`).shift().concat(`:3000`)}`
    : process.env.BASE_URL

export const api = axios.create({
  // baseURL: base,
  baseURL: 'https://parking-node-backend.herokuapp.com/',
})
