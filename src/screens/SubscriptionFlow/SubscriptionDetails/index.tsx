import React, { useState } from 'react'
import { Alert, ScrollView, Text, View } from 'react-native'
import { useStylesContext } from 'hooks/styles'
import usePolyglot from 'hooks/polyglot'
import stylesheets from './styles'
import HeaderDefault from '/components/common/HeaderDefault'
import Stripe from 'stripe'
import { useEffect } from 'react'
import { PaymentSheetError, useStripe } from '@stripe/stripe-react-native'
import { api } from '/services/api'
import { Platform } from 'react-native'
import ButtonAction from '/components/common/ButtonAction'
import { getRows, StripeSubscription } from './row'
import { loadStripe } from '@stripe/stripe-js/pure'
import Toast from 'react-native-toast-message'
import { variables } from '/styles'
interface Props {
  navigation: { toggleDrawer: () => void }
  subscription: StripeSubscription
  getSubscription: () => void
}
const isAndroid = Platform.OS === 'android'
const SubscriptionDetails = ({
  navigation,
  subscription,
  getSubscription,
}: Props) => {
  const [styles] = useStylesContext(stylesheets)
  const t = usePolyglot('subscriptionDetails')
  const { initPaymentSheet, presentPaymentSheet } = useStripe()
  const [paymentSheetEnabled, setPaymentSheetEnabled] = useState(false)
  const [paymentLoading, setPaymentLoading] = useState(true)
  const [showButton, setShowButton] = useState<
    'requires_action' | 'requires_payment_method' | ''
  >('')
  const [clientSecret, setClientSecret] = useState<string>()

  const rows = getRows(subscription, t)

  const fetchPaymentSheetParams = async (stripeCustomerId: string) => {
    try {
      const response = await api.post('subscription/ephemeralkey', {
        stripeCustomerId,
      })
      const { ephemeralKey } = response.data
      return {
        ephemeralKey,
      }
    } catch (error) {
      setPaymentLoading(false)
      console.log('error', error)
    }
  }

  const initializePaymentSheet = async (
    stripeCustomerId: string,
    client_secret: string,
  ) => {
    const { ephemeralKey } = await fetchPaymentSheetParams(stripeCustomerId)
    const { error } = await initPaymentSheet({
      customerId: stripeCustomerId,
      customerEphemeralKeySecret: ephemeralKey,
      setupIntentClientSecret: client_secret,
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
    setPaymentLoading(false)
  }

  useEffect(() => {
    const setupIntent = subscription.pending_setup_intent as Stripe.SetupIntent
    if (
      setupIntent?.status === 'requires_action' &&
      setupIntent?.client_secret
    ) {
      setShowButton(setupIntent.status)
      setClientSecret(setupIntent.client_secret)
    } else if (
      setupIntent?.status === 'requires_payment_method' &&
      setupIntent?.client_secret &&
      subscription.customer
    ) {
      setShowButton(setupIntent.status)
      setClientSecret(setupIntent.client_secret)
      initializePaymentSheet(
        subscription.customer as string,
        setupIntent.client_secret,
      )
    }
  }, [])

  const openPaymentSheet = async () => {
    if (!clientSecret) {
      return
    }
    const { error } = await presentPaymentSheet()

    if (!error) {
      Alert.alert('Success', 'The payment method was confirmed successfully')
    } else if (error.code === PaymentSheetError.Failed) {
      console.log('error.message:', error.message)
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
  }

  const confirmSetup = async () => {
    if (subscription.default_payment_method?.id) {
      const stripe = await loadStripe('')
      stripe
        .confirmCardSetup(clientSecret, {
          payment_method: subscription.default_payment_method?.id,
        })
        .then(function (result) {
          if (result.error) {
            Alert.alert(
              `PaymentSheet present was canceled with code: ${result.error.code}`,
              result.error.message,
            )
            // Display error.message in your UI.
          } else {
            Toast.show({
              text1: t('signInGoogleSuccess'),
              type: 'success',
              autoHide: true,
              visibilityTime: 1000,
            })
            // The setup has succeeded. Display a success message.
          }
        })
    }
  }

  const handlePressButton = async () => {
    if (showButton === 'requires_action') {
      await confirmSetup()
    } else if (showButton === 'requires_payment_method') {
      await openPaymentSheet()
    }
    getSubscription()
  }
  const renderRow = (item: { label: string; value: any }, index: number) => {
    return (
      <View key={index} style={styles.rowContainer}>
        <Text style={styles.labeText}>{t(item.label)}</Text>
        <View style={styles.valueContainer}>
          <Text style={styles.valueText}>{item.value || '-'}</Text>
        </View>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <View style={styles.firstBlock}>
        <HeaderDefault
          title="GOLD"
          rightButton={{
            label: t('cancel'),
            color: variables.inactiveColor,
            onPress: () => {},
          }}
          leftButtonPress={navigation.toggleDrawer}
        />
        <ScrollView contentContainerStyle={styles.rowsContainer}>
          {rows.map(renderRow)}
        </ScrollView>
      </View>
      <View style={styles.buttonsContainer}>
        {!!showButton && (
          <ButtonAction
            disabled={!paymentSheetEnabled}
            text={t(
              showButton === 'requires_action' ? 'authPayment' : 'addPayment',
            )}
            onPress={handlePressButton}
          />
        )}
      </View>
    </View>
  )
}

export default SubscriptionDetails
