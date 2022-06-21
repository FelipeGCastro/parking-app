import { io } from 'socket.io-client'
import Constants from 'expo-constants'
const { manifest } = Constants

const base = 'https://parking-node-backend.herokuapp.com/'
// typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
//   ? `http://${manifest.debuggerHost.split(`:`).shift().concat(`:3000`)}`
//   : process.env.BASE_URL

export const socket = io(base)
