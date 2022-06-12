import React from 'react'
import { Text, View } from 'react-native'
import { Marker } from 'react-native-maps'

import { styles } from './styles'

interface Props {
  type: string
  position: {
    longitude: number
    latitude: number
  }
}

const SpotMarker = ({ type, position }: Props) => {
  const imageObj = {
    indicated: '#0673C6',
    reindicated: '#C6A606',
    confirmed: '#06C615',
  }
  const color = imageObj[type] || imageObj.indicated
  return (
    <Marker
      style={styles.container}
      onPress={() => console.log('algo')}
      coordinate={position}>
      <View style={[styles.markerContainer, { backgroundColor: color }]}>
        <Text style={styles.markerLetter}>P</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textTime}>2m</Text>
      </View>
    </Marker>
  )
}

export default SpotMarker
