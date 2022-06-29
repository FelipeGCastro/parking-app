import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useTranslate } from 'react-polyglot'
import Icon from '../Icon'
import { styles } from './styles'
import { useModal } from '/hooks/modal'

export function DrawerContent(props: DrawerContentComponentProps) {
  const { openModal } = useModal()
  const t = useTranslate()
  const handleOnPressSignIn = () => {
    props.navigation.toggleDrawer()
    openModal({
      modalName: 'SignIn',
    })
  }
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.userContainer}>
        <View style={styles.userPhoto}>
          <Icon name="user-alt" size={50} color="#CECECE" />
        </View>
        <TouchableOpacity
          onPress={handleOnPressSignIn}
          style={styles.userTextContainer}>
          <Text style={styles.userText}>{t('signIn')}</Text>
        </TouchableOpacity>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  )
}
