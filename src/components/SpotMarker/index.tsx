import React, { useEffect, useRef, useState } from 'react'
import { Platform, Text, View } from 'react-native'
import { Marker, Callout, CalloutSubview, MapEvent } from 'react-native-maps'
import Icon from '../Icon'

import { styles } from './styles'
import { useMainController } from '/hooks/mainController'

import { Transition, Transitioning } from 'react-native-reanimated'

const transition = <Transition.Change interpolation="easeInOut" />

interface Props {
  type: string
  position: {
    longitude: number
    latitude: number
  }
}

const SpotMarker = ({ type, position }: Props) => {
  const [showOptions, setShowOptions] = useState(false)
  const [showOptionsDelayed, setShowOptionsDelayed] = useState(false)
  const { handleValidateAndInvalidate, handleSetPositionToGo } =
    useMainController()

  const ref = useRef(null)

  const imageObj = {
    indicated: '#0673C6',
    reindicated: '#C6A606',
    confirmed: '#06C615',
  }
  const color = imageObj[type] || imageObj.indicated

  const handlePressMarker = (
    event: MapEvent<{
      action: 'marker-press'
      id: string
    }>,
  ) => {
    if (Platform.OS === 'android') {
      handleValidateAndInvalidate()
    } else {
      setShowOptions(true)
      handleSetPositionToGo(event.nativeEvent?.coordinate)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setShowOptionsDelayed(showOptions)
      ref?.current?.animateNextTransition()
    }, 1000)
  }, [showOptions])

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
              onPress={() => console.log('Invalidar Pressed')}
              style={styles.buttonInvalid}>
              <Icon name="error-outline" color="#C60606" />
              <Text style={styles.buttonText}>Invalidar</Text>
            </CalloutSubview>
            <CalloutSubview
              onPress={() => console.log('Validar Pressed')}
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
      coordinate={position}>
      {showOptions && renderOptions()}
      <View style={styles.content}>
        <View style={[styles.markerContainer, { backgroundColor: color }]}>
          <Text style={styles.markerLetter}>P</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textTime}>2m</Text>
        </View>
      </View>
    </Marker>
  )
}

export default SpotMarker
