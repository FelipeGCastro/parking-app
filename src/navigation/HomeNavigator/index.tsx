import { createDrawerNavigator } from '@react-navigation/drawer'
import { useTranslate } from 'react-polyglot'
import { DrawerContent } from '/components/common/Drawer'
import Home from '/screens/Home'
import Settings from '/screens/Settings'
import TermsAndCondition from '/screens/TermsAndCondition'
const Drawer = createDrawerNavigator()

export const HomeNavigator = () => {
  const t = useTranslate()
  return (
      <Drawer.Navigator
        drawerContent={props => <DrawerContent {...props} />}
        screenOptions={{ drawerType: 'front' }}
        initialRouteName="Home">
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
      </Drawer.Navigator>
  )
}
