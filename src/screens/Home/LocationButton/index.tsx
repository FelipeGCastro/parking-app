import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from '/components/Icon'

interface Props {
  onPress: () => void
}
const LocationButton = ({ onPress }: Props) => {
  const bottomSafeArea = useSafeAreaInsets().bottom
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, { bottom: bottomSafeArea + 120 }]}>
      <Icon name="my-location" />
    </TouchableOpacity>
  )
}
export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 10,
    padding: 10,
    borderRadius: 25,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default LocationButton
