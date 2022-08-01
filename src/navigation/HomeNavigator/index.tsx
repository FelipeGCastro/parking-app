import { createDrawerNavigator } from '@react-navigation/drawer'
import { useTranslate } from 'react-polyglot'
import { SubscriptionsNavigator } from '../SubscriptionsNavigator'
import { DrawerContent } from '/components/common/Drawer'
import Home from '/screens/Home'
import { OnBoarding } from '/screens/OnBoarding'
import Settings from '/screens/Settings'
import TermsAndCondition from '/screens/TermsAndCondition'
const Drawer = createDrawerNavigator()

export const HomeNavigator = () => {
  const t = useTranslate()
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{ drawerType: 'front' }}
      initialRouteName="MapScreen">
      <Drawer.Screen
        name="MapScreen"
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
      <Drawer.Screen
        name="Instructions"
        options={{
          headerShown: false,
          title: t('screens.instructions'),
        }}
        component={OnBoarding}
      />
      {process.env.ENV === 'development' && (
        <Drawer.Screen
          name="SubscriptionsNav"
          options={{
            headerShown: false,
            title: t('screens.subscriptions'),
          }}
          component={SubscriptionsNavigator}
        />
      )}
    </Drawer.Navigator>
  )
}
