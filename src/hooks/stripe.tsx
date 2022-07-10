import React, { useEffect, useState } from 'react'
import { StripeProvider } from '@stripe/stripe-react-native'
import { api } from '/services/api'

// import { Container } from './styles';

const Stripe = ({ children }) => {
  const [publishableKey, setPublishableKey] = useState('')

  const fetchPublishableKey = async () => {
    try {
      const result = await api.get('stripekey') // fetch key from your server here
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
      merchantIdentifier="merchant.identifier">
      {children}
    </StripeProvider>
  )
}

export default Stripe
