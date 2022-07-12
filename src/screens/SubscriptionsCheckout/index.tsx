import { PaymentSheetError, useStripe } from '@stripe/stripe-react-native'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Text, View } from 'react-native'
import { styles } from './styles'
import ButtonDefault from '/components/common/ButtonDefault'
import { api } from '/services/api'
import { variables } from '/styles'

import { StackScreenProps } from '@react-navigation/stack'

type RootStackParamList = {
  SubscriptionsCheckout: { priceId: string }
}
type Props = StackScreenProps<RootStackParamList, 'SubscriptionsCheckout'>

const SubscriptionsCheckout = ({ route }: Props) => {
  const priceId = route.params?.priceId
  const { initPaymentSheet, presentPaymentSheet } = useStripe()
  const [paymentSheetEnabled, setPaymentSheetEnabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const [clientSecret, setClientSecret] = useState<string>()

  const fetchPaymentSheetParams = async () => {
    try {
      const response = await api.post('subscription/checkout', { priceId })
      const { setupIntent, ephemeralKey, customer } = response.data
      setClientSecret(setupIntent)
      return {
        setupIntent,
        ephemeralKey,
        customer,
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  const initializePaymentSheet = async () => {
    const { setupIntent, ephemeralKey, customer } =
      await fetchPaymentSheetParams()
    const { error } = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      setupIntentClientSecret: setupIntent,
      merchantDisplayName: 'Spoty Parking',
      merchantCountryCode: 'PT',
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      // allowsDelayedPaymentMethods: true,
    })
    if (!error) {
      setPaymentSheetEnabled(true)
    } else if (error.code === PaymentSheetError.Failed) {
      Alert.alert(
        `PaymentSheet init failed with error code: ${error.code}`,
        error.message,
      )
    } else if (error.code === PaymentSheetError.Canceled) {
      Alert.alert(
        `PaymentSheet init was canceled with code: ${error.code}`,
        error.message,
      )
    }
  }

  useEffect(() => {
    initializePaymentSheet()
  }, [])

  const openPaymentSheet = async () => {
    if (!clientSecret) {
      return
    }
    setLoading(true)
    const { error } = await presentPaymentSheet()

    if (!error) {
      Alert.alert('Success', 'The payment was confirmed successfully')
    } else if (error.code === PaymentSheetError.Failed) {
      Alert.alert(
        `PaymentSheet present failed with error code: ${error.code}`,
        error.message,
      )
    } else if (error.code === PaymentSheetError.Canceled) {
      Alert.alert(
        `PaymentSheet present was canceled with code: ${error.code}`,
        error.message,
      )
    }
    setPaymentSheetEnabled(false)
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <ButtonDefault
        disabled={!paymentSheetEnabled}
        icon={{ name: 'check' }}
        title="Checkout"
        onPress={openPaymentSheet}
      />
      {loading && (
        <ActivityIndicator size="large" color={variables.regularColor} />
      )}
    </View>
  )
}

export default SubscriptionsCheckout
