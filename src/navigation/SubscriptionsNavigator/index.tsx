import { createStackNavigator } from '@react-navigation/stack'
import Subscriptions from '/screens/SubscriptionFlow/Subscriptions'
import SubscriptionCheckout from '/screens/SubscriptionFlow/SubscriptionCheckout'
import SubscriptionPayment from '/screens/SubscriptionFlow/SubscriptionsPayment'

const Stack = createStackNavigator()

export const SubscriptionsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Subscriptions" component={Subscriptions} />
      <Stack.Screen
        name="SubscriptionCheckout"
        component={SubscriptionCheckout}
      />
      <Stack.Screen
        name="SubscriptionPayment"
        options={{
          gestureEnabled: false,
        }}
        component={SubscriptionPayment}
      />
    </Stack.Navigator>
  )
}
