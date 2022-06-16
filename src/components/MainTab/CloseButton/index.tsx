import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from '/components/Icon'

interface Props {
  onPress: () => void
}
const CloseButton = ({ onPress }: Props) => {
  const bottomSafeArea = useSafeAreaInsets().bottom
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, { bottom: bottomSafeArea + 50 }]}>
      <Icon name="close-circle-outline" color="#C60606" />
    </TouchableOpacity>
  )
}
export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 16,
    padding: 10,
    borderRadius: 25,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default CloseButton
