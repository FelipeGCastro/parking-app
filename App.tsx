import React from 'react'
import Home from './src/screens/Home'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { MainControllerProvider } from '/hooks/mainController'

export default function App() {
  return (
    <SafeAreaProvider>
      <MainControllerProvider>
        <Home />
      </MainControllerProvider>
    </SafeAreaProvider>
  )
}
