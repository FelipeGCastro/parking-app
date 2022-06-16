import React, { useEffect, useRef, useState } from 'react'
import { Platform, Text, View } from 'react-native'
import { Marker, Callout, CalloutSubview, MapEvent } from 'react-native-maps'
import Icon from '../Icon'

import { styles } from './styles'
import { useMainController } from '/hooks/mainController'

import { Transition, Transitioning } from 'react-native-reanimated'
import { IMarker, useMarkers } from '/hooks/markers'
import { formatDistanceLocal } from '/utils/date'

const transition = <Transition.Change interpolation="easeInOut" />

interface Props {
  marker: IMarker
}

const SpotMarker = ({ marker }: Props) => {
  const [showOptions, setShowOptions] = useState(false)
  const [showOptionsDelayed, setShowOptionsDelayed] = useState(false)
  const { handleSetPositionToGo } = useMainController()
  const {
    invalidateMarker,
    validateMarker,
    showValidateAndInvalidate,
    hideValidateAndInvalidate,
    selectedMarker,
  } = useMarkers()

  const ref = useRef(null)

  const colorObj = {
    created: '#0673C6',
    invalided: '#C60606',
    valided: '#06C615',
    deselected: '#d3d3d3',
  }
  const normalColor = colorObj[marker.status] || colorObj.created
  const selected =
    selectedMarker === marker.id ? normalColor : colorObj.deselected
  const color = selectedMarker ? selected : normalColor

  const handleDeselectMarker = () => {
    console.log('handleDeselectMarker')
    hideValidateAndInvalidate()
  }

  const handlePressMarker = (
    event: MapEvent<{
      action: 'marker-press'
      id: string
    }>,
  ) => {
    // if (Platform.OS === 'android') {
    //   showValidateAndInvalidate(marker.id)
    // } else {
    //   setShowOptions(true)
    //   handleSetPositionToGo(event.nativeEvent?.coordinate)
    // }
    console.log('handlePressMarker')
    if (Platform.OS === 'ios') {
      handleSetPositionToGo(event.nativeEvent?.coordinate)
    }
    showValidateAndInvalidate(marker.id)
  }

  useEffect(() => {
    setTimeout(() => {
      setShowOptionsDelayed(showOptions)
      ref?.current?.animateNextTransition()
    }, 1000)
  }, [showOptions])

  const handleInvalidatePress = () => {
    setShowOptions(false)
    invalidateMarker(marker.id)
  }
  const handleValidatePress = () => {
    setShowOptions(false)
    validateMarker(marker.id)
  }

  const renderOptions = () => (
    <Callout tooltip style={{ width: 220, height: 85 }}>
      <Transitioning.View
        style={{ flexGrow: 1 }}
        ref={ref}
        transition={transition}>
        <View
          style={[
            styles.containerOptions,
            { height: showOptionsDelayed ? 'auto' : 0 },
          ]}>
          <View style={styles.buttonWrapper}>
            <CalloutSubview
              onPress={handleInvalidatePress}
              style={styles.buttonInvalid}>
              <Icon name="error-outline" color="#C60606" />
              <Text style={styles.buttonText}>Invalidar</Text>
            </CalloutSubview>
            <CalloutSubview
              onPress={handleValidatePress}
              style={styles.buttonValid}>
              <Icon name="check" color="#06C615" />
              <Text style={styles.buttonText}>Validar</Text>
            </CalloutSubview>
          </View>
          <View style={styles.detail}></View>
        </View>
      </Transitioning.View>
    </Callout>
  )

  return (
    <Marker
      style={styles.container}
      onPress={handlePressMarker}
      onDeselect={handleDeselectMarker}
      coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}>
      {showOptions && renderOptions()}
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
    </Marker>
  )
}

export default SpotMarker
