import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useEffect, useMemo, useState } from 'react'
import { HomeNavigator } from '../HomeNavigator'
import { OnBoardingNavigator } from '../OnboardingNavigator'

const Stack = createStackNavigator()

export const MainNavigator = () => {
  const [sawInstructions, setSawInstructions] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const checkSawInstructions = async () => {
      const saw = await AsyncStorage.getItem('@spotyparking:instructions')
      if (saw) {
        setSawInstructions(true)
      }
      setLoaded(true)
    }
    checkSawInstructions()
  }, [])

  const initialRouteName = sawInstructions ? 'Home' : 'OnBoarding'
  return loaded ? (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="OnBoarding" component={OnBoardingNavigator} />
        <Stack.Screen name="Home" component={HomeNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  ) : null
}
