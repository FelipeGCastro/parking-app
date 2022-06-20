import React, { useRef } from 'react'
import { Platform, Text, View } from 'react-native'
import { Marker, Callout, MapEvent } from 'react-native-maps'
import Icon from '../Icon'

import { styles } from './styles'
import { useMainController } from '/hooks/mainController'
import { IMarker, useMarkers } from '/hooks/markers'
import { formatDistanceLocal } from '/utils/date'

interface Props {
  marker: IMarker
  setUserFocused: (value: boolean) => void
}

const SpotMarker = ({ marker, setUserFocused }: Props) => {
  const { handleSetPositionToGo, handleDirection } = useMainController()
  const {
    showValidateAndInvalidate,
    hideValidateAndInvalidate,
    selectedMarker,
  } = useMarkers()

  const colorObj = {
    created: '#0673C6',
    invalidated: '#C60606',
    validated: '#06C615',
    deselected: '#d3d3d3',
  }
  const normalColor = colorObj[marker.status] || colorObj.created
  const selected =
    selectedMarker?.id === marker.id ? normalColor : colorObj.deselected
  const color = selectedMarker ? selected : normalColor

  const handleDeselectMarker = () => {
    hideValidateAndInvalidate()
  }

  const handlePressMarker = (
    event: MapEvent<{
      action: 'marker-press'
      id: string
    }>,
  ) => {
    if (Platform.OS === 'ios') {
      handleSetPositionToGo(event.nativeEvent?.coordinate)
    }

    showValidateAndInvalidate(marker)
  }

  const handleCalloutPress = () => {
    handleDirection(marker)
    setUserFocused(true)
  }
  const renderOptions = () => (
    <Callout
      onPress={handleCalloutPress}
      tooltip
      style={{ width: 220, height: 85 }}>
      <View style={[styles.containerOptions]}>
        <View style={styles.buttonWrapper}>
          <View style={styles.buttonValid}>
            <Icon name="check" color="#06C615" />
            <Text style={styles.buttonText}>Ir aqui!</Text>
          </View>
        </View>
        <View style={styles.detail}></View>
      </View>
    </Callout>
  )

  return (
    <Marker
      style={styles.container}
      onPress={handlePressMarker}
      onDeselect={handleDeselectMarker}
      coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
      tracksViewChanges={false}
      // onCalloutPress={handleCalloutPress}
    >
      <View style={styles.content}>
        <View style={[styles.markerContainer, { backgroundColor: color }]}>
          <Text style={styles.markerLetter}>P</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textTime}>
            {formatDistanceLocal(marker.updatedAt)}
          </Text>
        </View>
      </View>
      {renderOptions()}
    </Marker>
  )
}

export default SpotMarker
