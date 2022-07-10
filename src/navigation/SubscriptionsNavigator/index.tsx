import { createStackNavigator } from '@react-navigation/stack'
import Subscriptions from '/screens/Subscriptions'
import SubscriptionsCheckout from '/screens/SubscriptionsCheckout'

const Stack = createStackNavigator()

export const SubscriptionsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Subscriptions" component={Subscriptions} />
      <Stack.Screen
        name="SubscriptionsCheckout"
        component={SubscriptionsCheckout}
      />
    </Stack.Navigator>
  )
}
