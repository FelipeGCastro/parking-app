import React from 'react'
import { View } from 'react-native'
import { Marker } from 'react-native-maps'
import Icon from '../Icon'

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
      <Icon name='car-side' size={30} />
    </Marker>
  )
}

export default UserMarker
