import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer'
import { Alert, Image, Text, View } from 'react-native'
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

  const handleSignOut = () => {
    Alert.alert(
      t('signOutTitle'),
      t('signOutDescription'),
      [
        {          
          text: t('noSignOut'),
          onPress: () => {},
          style: 'cancel'
    },
        {
          text: t('yesSignOut'),
          onPress: signOut,
          style: 'default'
        }
      ]
    )
  }

  const renderUser = () => (
    <View style={styles.userWrapper}>
      <View  style={styles.emptyView}/>
      <View style={styles.userInfoContainer}>
        <View style={styles.userPhoto}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: user.avatarUrl }} />
          </View>
        </View>
        <View style={styles.userTextContainer}>
          <Text style={styles.userText}>{user.name}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={handleSignOut}  style={styles.signOutButton} >
        <Icon name='power' size={25} color='#fff' />
      </TouchableOpacity>
    </View>
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
    </DrawerContentScrollView>
  )
}
