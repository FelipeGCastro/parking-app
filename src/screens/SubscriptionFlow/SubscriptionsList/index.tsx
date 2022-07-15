import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import Stripe from 'stripe'
import stylesheet from './styles'
import ButtonAction from '/components/common/ButtonAction'
import HeaderDefault from '/components/common/HeaderDefault'
import usePolyglot from '/hooks/polyglot'
import { useStylesContext } from '/hooks/styles'
import { api } from '/services/api'
import { variables } from '/styles'

type GetPrices = { prices: Stripe.Price[] }

const SubscriptionsList = ({ navigation }) => {
  const [prices, setPrices] = useState<Stripe.Price[]>([])
  const [styles] = useStylesContext(stylesheet)
  const [loading, setLoading] = useState(true)
  const [subscriptionSelected, setSubscriptionSelected] = useState('')
  const t = usePolyglot('subscriptionsList')

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
    const price = prices.find(item => item.id === subscriptionSelected)
    navigation.navigate('SubscriptionCheckout', {
      price,
    })
  }

  const renderSubscription = (item: Stripe.Price, index: number) => {
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
        <Text style={styles.priceText}>
          {`€${item.unit_amount / 100}`}/{item.recurring.interval}
        </Text>
        <View style={styles.trialContainer}>
          <Text style={styles.trialText}>{t('freeTrialText')}</Text>
        </View>
        <Text style={styles.footerText}>
          {t('subscriptionFooter', { price: `€${item.unit_amount / 100}` })}
        </Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color={variables.regularColor} />
      ) : (
        <View style={styles.subscriptionList}>
          <HeaderDefault
            title="GOLD"
            leftButtonPress={navigation.toggleDrawer}
          />
          {prices.map(renderSubscription)}
        </View>
      )}
      <ButtonAction
        disabled={!subscriptionSelected}
        onPress={handleGoToCheckout}
        text={t('goToCheckout')}
      />
    </View>
  )
}

export default SubscriptionsList
