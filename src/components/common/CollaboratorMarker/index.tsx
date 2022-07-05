import React from 'react'
import { StyleSheet } from 'react-native'
import { Marker } from 'react-native-maps'
import Icon from '../Icon'

interface Props {
  position: {
    longitude: number
    latitude: number
  }
}

const CollaboratorMarker = ({ position }: Props) => {
  return (
    <Marker style={styles.container} coordinate={position}>
      <Icon name="male" size={30} />
    </Marker>
  )
}

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
})

export default CollaboratorMarker
