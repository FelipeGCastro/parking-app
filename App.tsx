import React from 'react'
import Home from './src/screens/Home'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { MainControllerProvider } from '/hooks/mainController'
import { TopBarProvider } from '/hooks/topBar'
import { UserLocationProvider } from '/hooks/location'

export default function App() {
  return (
    <SafeAreaProvider>
      <MainControllerProvider>
        <UserLocationProvider>
          <TopBarProvider>
            <Home />
          </TopBarProvider>
        </UserLocationProvider>
      </MainControllerProvider>
    </SafeAreaProvider>
  )
}
