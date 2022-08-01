import React, { useEffect, useState } from 'react'
import { StripeProvider } from '@stripe/stripe-react-native'
import { api } from '/services/api'
import { Platform } from 'react-native'

// import { Container } from './styles';
const isAndroid = Platform.OS === 'android'
const Stripe = ({ children }) => {
  const [publishableKey, setPublishableKey] = useState('')

  const fetchPublishableKey = async () => {
    try {
      const result = await api.get('stripe/key') // fetch key from your server here
      setPublishableKey(result.data.key)
    } catch (error) {
      console.log('error:', error.message)
    }
  }

  useEffect(() => {
    fetchPublishableKey()
  }, [])

  return (
    <StripeProvider
      publishableKey={publishableKey}
      urlScheme={
        isAndroid ? 'com.spotyparking://' : 'com.luizcastro.spotyparking://'
      }
      merchantIdentifier="merchant.com.spotyparking">
      {children}
    </StripeProvider>
  )
}

export default Stripe
