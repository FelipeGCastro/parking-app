import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import stylesheet from './styles'
import HeaderDefault from '/components/common/HeaderDefault'
import SignInCTA from '/components/common/SignInCTA'
import { useAuth } from '/hooks/auth'
import usePolyglot from '/hooks/polyglot'
import { useStylesContext } from '/hooks/styles'
import { api } from '/services/api'
import { variables } from '/styles'

interface IPrice {
  id: string
  currency: string
  nickname?: string
  recurring: {
    interval: 'month' | 'year' | 'week' | 'day'
    interval_count: 1
  }
  unit_amount: 349
}
type GetPrices = { prices: IPrice[] }

const SubscriptionsList = ({ navigation }) => {
  const [prices, setPrices] = useState<IPrice[]>([])
  const [styles] = useStylesContext(stylesheet)
  const [loading, setLoading] = useState(true)
  const [subscriptionSelected, setSubscriptionSelected] = useState('')
  const t = usePolyglot('subscriptionsList')
  const { user } = useAuth()

  const getPrice = async () => {
    try {
      const result = await api.get<GetPrices>('prices')
      setPrices(result.data.prices)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!prices.length) {
      getPrice()
    }
  }, [])

  const handleSelectSubscription = (id: string) => {
    setSubscriptionSelected(prev => (prev === id ? '' : id))
  }

  const handleGoToCheckout = () => {
    navigation.navigate('SubscriptionsCheckout', {
      priceId: subscriptionSelected,
    })
  }

  const renderSubscription = (item: IPrice, index: number) => {
    const selected = item.id === subscriptionSelected
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        key={item.id}
        onPress={() => handleSelectSubscription(item.id)}
        style={[
          styles.subscriptionContainer,
          selected && styles.subscriptionSelected,
        ]}>
        <View style={styles.subscriptionHeader}>
          <Text style={styles.periodText}>MONTHLY</Text>
          <View style={[styles.dotContainer, selected && styles.dotSelected]}>
            <View style={styles.dotInner} />
          </View>
        </View>
        <Text style={styles.priceText}>€3,49/month</Text>
        <View style={styles.trialContainer}>
          <Text style={styles.trialText}>{t('freeTrialText')}</Text>
        </View>
        <Text style={styles.footerText}>
          {t('subscriptionFooter', { price: `€{item.unit_amount / 100}` })}
        </Text>
      </TouchableOpacity>
    )
  }

  if (!user.id) {
    return (
      <View style={styles.container}>
        <HeaderDefault title="GOLD" onPress={navigation.toggleDrawer} />
        <SignInCTA />
        <View></View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color={variables.regularColor} />
      ) : (
        <View style={styles.subscriptionList}>
          <HeaderDefault title="GOLD" onPress={navigation.toggleDrawer} />
          {prices.map(renderSubscription)}
        </View>
      )}
      <TouchableOpacity
        disabled={!subscriptionSelected}
        onPress={handleGoToCheckout}
        style={[
          styles.buttonContainer,
          !subscriptionSelected && styles.buttonDisabled,
        ]}>
        <Text style={styles.buttonText}>{t('goToCheckout')}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SubscriptionsList
