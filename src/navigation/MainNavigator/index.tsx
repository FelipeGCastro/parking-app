import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { HomeNavigator } from '../HomeNavigator'
import { OnBoardingNavigator } from '../OnboardingNavigator'

const Stack = createStackNavigator()

export const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeNavigator} />
        <Stack.Screen name="OnBoarding" component={OnBoardingNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
