import Stripe from 'stripe'
import { formatTimestamp } from '/utils/date'

export interface StripeSubscription extends Stripe.Subscription {
  default_payment_method: Stripe.PaymentMethod
}

export const getRows = (
  subscription: StripeSubscription,
  t: (value: string) => void,
) => [
  { label: 'status', value: t(subscription.status || 'empty') },
  {
    label: 'currentPeriodStart',
    value: formatTimestamp(subscription.current_period_start),
  },
  {
    label: 'currentPeriodEnd',
    value: formatTimestamp(subscription.current_period_end),
  },
  { label: 'cancelAtPeriodEnd', value: subscription.cancel_at_period_end },
  {
    label: 'startDate',
    value: formatTimestamp(subscription.start_date),
  },
  { label: 'currency', value: subscription.currency },
  { label: 'daysUntilDue', value: subscription.days_until_due },
  { label: 'trialStart', value: formatTimestamp(subscription.trial_start) },
  { label: 'trialEnd', value: formatTimestamp(subscription.trial_end) },
  {
    label: 'subscriptionType',
    value: t(subscription.items?.data[0]?.price?.type || 'empty'),
  },
  {
    label: 'subscriptionPrice',
    value: `€${(subscription.items?.data[0]?.price?.unit_amount || 0) / 100}`,
  },
  {
    label: 'subscriptionInterval',
    value: t(
      subscription.items?.data[0]?.price?.recurring?.interval || 'empty',
    ),
  },
  {
    label: 'collectionMethod',
    value: t(subscription.collection_method || 'empty'),
  },
  {
    label: 'paymentMethod',
    value: subscription.default_payment_method?.card?.last4
      ? `****${subscription.default_payment_method?.card?.last4}`
      : 'empty',
  },
]
