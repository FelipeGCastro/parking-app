import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer'
import { Image, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useTranslate } from 'react-polyglot'
import Icon from '../Icon'
import { styles } from './styles'
import { useAuth } from '/hooks/auth'
import { useModal } from '/hooks/modal'

export function DrawerContent(props: DrawerContentComponentProps) {
  const { openModal } = useModal()
  const { user, signOut } = useAuth()
  const t = useTranslate()
  const handleOnPressSignIn = () => {
    props.navigation.toggleDrawer()
    openModal({
      modalName: 'SignIn',
    })
  }
  const renderUser = () => (
    <>
      <View style={styles.userPhoto}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: user.avatarUrl }} />
        </View>
      </View>
      <View style={styles.userTextContainer}>
        <Text style={styles.userText}>{user.name}</Text>
      </View>
    </>
  )
  const renderSignIn = () => (
    <>
      <View style={styles.userPhoto}>
        <Icon name="user-alt" size={50} color="#CECECE" />
      </View>
      <TouchableOpacity
        onPress={handleOnPressSignIn}
        style={styles.userTextContainer}>
        <Text style={styles.userText}>{t('signIn')}</Text>
      </TouchableOpacity>
    </>
  )
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.userContainer}>
        {user.name ? renderUser() : renderSignIn()}
      </View>
      <DrawerItemList {...props} />
      <DrawerItem onPress={signOut} label={'Sign Out'} />
    </DrawerContentScrollView>
  )
}
