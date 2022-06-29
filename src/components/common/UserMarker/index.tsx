import React from 'react'
import { View } from 'react-native'
import { Marker } from 'react-native-maps'

import { styles } from './styles'

interface Props {
  position: {
    longitude: number
    latitude: number
  }
}

const UserMarker = ({ position }: Props) => {
  return (
    <Marker style={styles.container} coordinate={position}>
      <View style={styles.upPart}>
        <View style={styles.glassPart}></View>
        <View style={styles.lightContainer}>
          <View style={styles.light}></View>
          <View style={styles.light}></View>
        </View>
      </View>
      <View style={styles.wheelsContainer}>
        <View style={styles.wheels}></View>
        <View style={styles.wheels}></View>
      </View>
    </Marker>
  )
}

export default UserMarker
