import { Stripe } from 'stripe'
import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import stylesheet from './styles'
import HeaderDefault from '/components/common/HeaderDefault'
import SignInCTA from '/components/common/SignInCTA'
import { useAuth } from '/hooks/auth'
import usePolyglot from '/hooks/polyglot'
import { useStylesContext } from '/hooks/styles'
import { api } from '/services/api'
import { variables } from '/styles'
import SubscriptionsList from '../SubscriptionsList'
import SubscriptionDetails from '../SubscriptionDetails'

const Subscriptions = ({ navigation }) => {
  const [styles] = useStylesContext(stylesheet)
  const [loading, setLoading] = useState(true)
  const [subscription, setSubscription] = useState({} as Stripe.Subscription)
  const [hasSubscription, setHasSubscription] = useState(true)
  const t = usePolyglot('subscriptions')
  const { user } = useAuth()

  const getSubscription = useCallback(async () => {
    try {
      console.log('getSubscription')
      const response = await api.get<{ subscription: Stripe.Subscription }>(
        'subscription',
      )
      console.log('response')
      const subs = response.data?.subscription
      if (
        !!subs &&
        (subs.status === 'active' ||
          subs.status === 'incomplete' ||
          subs.status === 'trialing')
      ) {
        setSubscription(response.data.subscription)
      } else {
        setHasSubscription(false)
      }
      setLoading(false)
    } catch (error) {
      console.log('ERROR:', error)
    }
  }, [])

  useEffect(() => {
    if (user.id && !subscription.id) {
      getSubscription()
    }
  }, [])

  if (!user.id) {
    return (
      <View style={styles.container}>
        <HeaderDefault title="GOLD" onPress={navigation.toggleDrawer} />
        <SignInCTA />
        <View></View>
      </View>
    )
  }

  const renderScreen = () => {
    return hasSubscription ? (
      <SubscriptionDetails
        subscription={subscription}
        navigation={navigation}
      />
    ) : (
      <SubscriptionsList navigation={navigation} />
    )
  }

  return loading ? (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={variables.regularColor} />
    </View>
  ) : (
    renderScreen()
  )
}

export default Subscriptions
