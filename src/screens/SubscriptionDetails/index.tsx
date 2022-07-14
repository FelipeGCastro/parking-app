import React from 'react'
import { Text, View } from 'react-native'
import { useStylesContext } from 'hooks/styles'
import usePolyglot from 'hooks/polyglot'
import stylesheets from './styles'
import HeaderDefault from '/components/common/HeaderDefault'
import Stripe from 'stripe'

interface Props {
  navigation: { toggleDrawer: () => void }
  subscription: Stripe.Subscription
}

const SubscriptionDetails = ({ navigation, subscription }: Props) => {
  const [styles] = useStylesContext(stylesheets)
  const t = usePolyglot('subscriptionDetails')
  const rows = [
    { label: '', value: '' },
    { label: 'status', value: subscription.status },
    { label: 'startDate', value: subscription.start_date },
    { label: 'currency', value: subscription.currency },
    { label: 'daysUntilDue', value: subscription.days_until_due },
    { label: 'trialStart', value: subscription.trial_start },
    { label: 'trialEnd', value: subscription.trial_end },
    {
      label: 'subscriptionType',
      value: subscription.items?.data[0]?.price?.type,
    },
    {
      label: 'subscriptionPrice',
      value: (subscription.items?.data[0]?.price?.unit_amount || 0) / 100,
    },
    {
      label: 'subscriptionInterval',
      value: subscription.items?.data[0]?.price?.recurring?.interval,
    },
  ]
  const renderRow = () => {
    return (
      <View style={styles.rowContainer}>
        <Text style={styles.labeText}>Label</Text>
        <View style={styles.valueContainer}>
          <Text style={styles.valueText}>Value</Text>
        </View>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <HeaderDefault title="GOLD" onPress={navigation.toggleDrawer} />
    </View>
  )
}

export default SubscriptionDetails
