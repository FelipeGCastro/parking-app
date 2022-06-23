import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { DrawerContent } from '/components/Drawer'
import Home from '/screens/Home'
const Drawer = createDrawerNavigator()

export const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={DrawerContent}
        screenOptions={{ headerShown: false, drawerType: 'front' }}
        initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}
