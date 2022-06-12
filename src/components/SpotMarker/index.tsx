import React from 'react'
import { Text, View } from 'react-native'
import { Marker } from 'react-native-maps'
import indicated from 'assets/images/indicated.png'
import reindicated from 'assets/images/reindicated.png'
import confirmed from 'assets/images/confirmed.png'
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
    indicated,
    reindicated,
    confirmed,
  }
  const image = imageObj[type] || indicated
  return (
    <Marker image={image} coordinate={position}>
      <View style={styles.textContainer}>
        <Text style={styles.textTime}>2min</Text>
      </View>
    </Marker>
  )
}

export default SpotMarker
