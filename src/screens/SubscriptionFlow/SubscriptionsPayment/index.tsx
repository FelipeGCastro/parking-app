import { PaymentSheetError, useStripe } from '@stripe/stripe-react-native'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Platform, View } from 'react-native'
import stylesheet from './styles'
import { api } from '/services/api'
import { variables } from '/styles'

import { DrawerScreenProps } from '@react-navigation/drawer'
import usePolyglot from '/hooks/polyglot'
import ButtonAction from '/components/common/ButtonAction'
import { Text } from 'react-native'
import { useStylesContext } from '/hooks/styles'
import HeaderDefault from '/components/common/HeaderDefault'

type RootStackParamList = {
  SubscriptionPayment: { priceId: string }
}
type Props = DrawerScreenProps<RootStackParamList, 'SubscriptionPayment'>
const isAndroid = Platform.OS === 'android'
const SubscriptionPayment = ({ navigation, route }: Props) => {
  const priceId = route.params?.priceId
  const [styles] = useStylesContext(stylesheet)
  const { initPaymentSheet, presentPaymentSheet } = useStripe()
  const [paymentSheetEnabled, setPaymentSheetEnabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const [clientSecret, setClientSecret] = useState<string>()
  const t = usePolyglot('subscriptionPayment')
  const [fetched, setFetched] = useState(false)

  const fetchPaymentSheetParams = async () => {
    try {
      const response = await api.post('subscription/checkout', { priceId })
      const { setupIntent, ephemeralKey, customer } = response.data
      setClientSecret(setupIntent)
      setFetched(true)
      return {
        setupIntent,
        ephemeralKey,
        customer,
      }
    } catch (error) {
      setFetched(true)
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
      returnURL: isAndroid
        ? 'com.spotyparking://stripe-redirect'
        : 'com.luizcastro.spotyparking://stripe-redirect',
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
    if (!fetched) {
      initializePaymentSheet()
    }
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
    <View
      style={[
        styles.container,
        loading && { justifyContent: 'center', alignItems: 'center' },
      ]}>
      {loading ? (
        <View>
          <ActivityIndicator size="large" color={variables.regularColor} />
          <Text style={styles.loadingText}>{t('subscribing...')}</Text>
        </View>
      ) : (
        <>
          <HeaderDefault
            title="GOLD"
            leftButtonPress={navigation.toggleDrawer}
          />
          <Text style={styles.mainMessage}>
            {t(paymentSheetEnabled ? 'success' : 'error')}
          </Text>
          <ButtonAction
            disabled={!paymentSheetEnabled}
            text={t('addPayment')}
            onPress={openPaymentSheet}
          />
        </>
      )}
    </View>
  )
}

export default SubscriptionPayment
