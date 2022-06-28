import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from '/components/common/Icon'

interface Props {
  onPress: () => void
}
const LocationButton = ({ onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Icon name="my-location" />
    </TouchableOpacity>
  )
}
export const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    width: 50,
    height: 50,
    padding: 10,
    borderRadius: 25,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    marginBottom: 16,
  },
})

export default LocationButton
