import React from 'react'
import { Text, View } from 'react-native'
import { Marker } from 'react-native-maps'

import { styles } from './styles'
import { useTopBar } from '/hooks/topBar'

interface Props {
  type: string
  position: {
    longitude: number
    latitude: number
  }
}

const SpotMarker = ({ type, position }: Props) => {
  const { handleOpenMarkerOptions } = useTopBar()
  const imageObj = {
    indicated: '#0673C6',
    reindicated: '#C6A606',
    confirmed: '#06C615',
  }
  const color = imageObj[type] || imageObj.indicated

  const handlePressMarker = () => {
    handleOpenMarkerOptions(1)
  }

  return (
    <Marker
      style={styles.container}
      onPress={handlePressMarker}
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
