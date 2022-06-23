import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer'
import { View } from 'react-native'
import Icon from '../Icon'
import { styles } from './styles'

export function DrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.userContainer}>
        <View style={styles.userPhoto}>
          <Icon name="user-alt" size={50} color="#707070" />
        </View>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  )
}
