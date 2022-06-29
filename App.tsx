import 'react-native-gesture-handler'
import React from 'react'
import * as Localization from 'expo-localization'
import Toast from 'react-native-toast-message'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { MainControllerProvider } from '/hooks/mainController'
import { TopBarProvider } from '/hooks/topBar'
import { UserLocationProvider } from '/hooks/location'
import { MarkersProvider } from '/hooks/markers'
import { I18n } from 'react-polyglot'
import { phrases as en } from '/translations/en'
import { phrases as pt } from '/translations/en'
import { MainNavigator } from '/navigation/MainNavigator'
import { ModalProvider } from '/hooks/modal'
import { AuthProvider } from '/hooks/auth'

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
        <AuthProvider>
          <ModalProvider>
            <MainControllerProvider>
              <MarkersProvider>
                <UserLocationProvider>
                  <TopBarProvider>
                    <MainNavigator />
                    <Toast />
                  </TopBarProvider>
                </UserLocationProvider>
              </MarkersProvider>
            </MainControllerProvider>
          </ModalProvider>
        </AuthProvider>
      </I18n>
    </SafeAreaProvider>
  )
}
