import React from 'react'
import * as Localization from 'expo-localization'
import Home from './src/screens/Home'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { MainControllerProvider } from '/hooks/mainController'
import { TopBarProvider } from '/hooks/topBar'
import { UserLocationProvider } from '/hooks/location'
import { MarkersProvider } from '/hooks/markers'
import { I18n } from 'react-polyglot'
import { phrases as en } from '/translations/en'
import { phrases as pt } from '/translations/en'

export default function App() {
  const translations = {
    en,
    pt,
    'en-PT': en,
    'pt-PT': pt,
    'pt-BR': en,
  }
  const locale = Localization.locale

  const messages = translations[locale] || translations.en

  return (
    <SafeAreaProvider>
      <I18n locale="en" messages={messages}>
        <MainControllerProvider>
          <MarkersProvider>
            <UserLocationProvider>
              <TopBarProvider>
                <Home />
              </TopBarProvider>
            </UserLocationProvider>
          </MarkersProvider>
        </MainControllerProvider>
      </I18n>
    </SafeAreaProvider>
  )
}
