import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from '/components/common/Icon'

interface Props {
  onPress: () => void
}
const CloseButton = ({ onPress }: Props) => {
  const bottomSafeArea = useSafeAreaInsets().bottom
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Icon name="close-circle-outline" color="#C60606" />
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
    marginBottom: 24,
  },
})

export default CloseButton
