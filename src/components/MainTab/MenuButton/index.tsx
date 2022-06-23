import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from '/components/Icon'

interface Props {
  onPress: () => void
}
const MenuButton = ({ onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Icon name="menu" />
    </TouchableOpacity>
  )
}
export const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    height: 50,
    width: 50,
    padding: 10,
    borderRadius: 25,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    marginBottom: 16,
  },
})

export default MenuButton
