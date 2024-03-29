import 'react-native-gesture-handler'
import React, { useCallback, useEffect, useState } from 'react'
import * as Localization from 'expo-localization'
import Toast from 'react-native-toast-message'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { MainControllerProvider } from '/hooks/mainController'
import { TopBarProvider } from '/hooks/topBar'
import { UserLocationProvider } from '/hooks/location'
import { MarkersProvider } from '/hooks/markers'
import { I18n } from 'react-polyglot'
import { phrases as en } from '/translations/en'
import { phrases as pt } from '/translations/pt'
import { MainNavigator } from '/navigation/MainNavigator'
import { ModalProvider } from '/hooks/modal'
import { AuthProvider } from '/hooks/auth'
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'
import {
  Roboto_300Light_Italic,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import Stripe from '/hooks/stripe'
import { StylesProvider } from '/hooks/styles'
import { useStripe } from '@stripe/stripe-react-native'
import * as Linking from 'expo-linking'

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false)
  const { handleURLCallback } = useStripe()

  const handleDeepLink = useCallback(
    async (url: string | null) => {
      if (url && url.includes('safepay')) {
        await handleURLCallback(url)
        // Add extra handling here as you see fit
      }
    },
    [handleURLCallback],
  )

  useEffect(() => {
    const getUrlAsync = async () => {
      const initialUrl = await Linking.getInitialURL()
      handleDeepLink(initialUrl)
    }

    getUrlAsync()

    const deepLinkListener = Linking.addEventListener(
      'url',
      (event: { url: string }) => {
        handleDeepLink(event.url)
      },
    )

    return () => deepLinkListener.remove()
  }, [handleDeepLink])

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync()
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          Roboto_300Light_Italic,
          Roboto_400Regular,
          Roboto_700Bold,
        })
      } catch (e) {
        console.warn(e)
      } finally {
        // Tell the application to render
        setAppIsReady(true)
      }
    }

    prepare()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync()
    }
  }, [appIsReady])

  if (!appIsReady) {
    return null
  }
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
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <StylesProvider>
        <I18n locale="en" messages={messages}>
          <Stripe>
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
          </Stripe>
        </I18n>
      </StylesProvider>
    </SafeAreaProvider>
  )
}
