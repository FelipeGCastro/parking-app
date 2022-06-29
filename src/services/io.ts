import { io } from 'socket.io-client'
import Constants from 'expo-constants'
const { manifest } = Constants

const base = process.env.BASE_URL
// const base =
//   typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
//     ? `http://${manifest.debuggerHost.split(`:`).shift().concat(`:3000`)}`
//     : process.env.BASE_URL

;('https://parking-node-backend.herokuapp.com/')

export const socket = io(base)

socket.on('connect', () => {
  console.log('SOCKET CONNECT')
})
socket.on('disconnect', () => {
  console.log('DISCONNECT')
})
