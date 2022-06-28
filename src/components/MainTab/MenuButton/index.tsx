import React from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from '/components/Icon'
import { useMarkers } from '/hooks/markers'

interface Props {
  onPress: () => void
}
const MenuButton = ({ onPress }: Props) => {
  const { markersLoading, getMarkersLoading } = useMarkers()
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, { top: 0 + useSafeAreaInsets().top }]}>
      {markersLoading || getMarkersLoading ? (
        <ActivityIndicator size="large" color={'#0673C6'} />
      ) : (
        <Icon name="menu" />
      )}
    </TouchableOpacity>
  )
}
export const styles = StyleSheet.create({
  container: {
    right: 16,
    top: 16,
    position: 'absolute',
    alignSelf: 'flex-end',
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default MenuButton
