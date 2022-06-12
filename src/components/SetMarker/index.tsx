import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Image } from 'react-native'
import Pin from 'assets/images/pin.png'

export const SetMarker = () => {
  return <Image source={Pin} resizeMode="contain" style={styles.container} />
}

const styles = StyleSheet.create({
  container: {
    zIndex: 3,
    width: 24,
    position: 'absolute',
    marginTop: -45,
    marginLeft: -11,
    left: '50%',
    top: '50%',
  },
})
