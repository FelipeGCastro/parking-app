import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer'
import { Text, View } from 'react-native'
import Icon from '../Icon'
import { styles } from './styles'

export function DrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.userContainer}>
        <View style={styles.userPhoto}>
          <Icon name="user-alt" size={50} color="#CECECE" />
        </View>
        <View style={styles.userTextContainer}>
          <Text style={styles.userText}>Sign In</Text>
        </View>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  )
}
