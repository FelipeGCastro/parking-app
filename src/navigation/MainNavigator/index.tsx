import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { useTranslate } from 'react-polyglot'
import { DrawerContent } from '/components/common/Drawer'
import Home from '/screens/Home'
import Settings from '/screens/Settings'
import TermsAndCondition from '/screens/TermsAndCondition'
const Drawer = createDrawerNavigator()

export const MainNavigator = () => {
  const t = useTranslate()
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={DrawerContent}
        screenOptions={{ drawerType: 'front' }}
        initialRouteName="Home">
        <Drawer.Screen
          name="Home"
          options={{
            headerShown: false,
            headerTitle: t('screens.home'),
            title: t('screens.home'),
          }}
          component={Home}
        />
        <Drawer.Screen
          name="TermsAndCondition"
          options={{
            headerTitle: t('screens.termsAndCondition'),
            title: t('screens.termsAndCondition'),
          }}
          component={TermsAndCondition}
        />
        <Drawer.Screen
          name="Settings"
          options={{
            headerTitle: t('screens.settings'),
            title: t('screens.settings'),
          }}
          component={Settings}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}
