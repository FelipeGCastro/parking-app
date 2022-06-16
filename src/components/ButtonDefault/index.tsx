import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'
import Icon, { IconNames } from '../Icon'
import { IButton, useMainController } from '/hooks/mainController'
import { useMarkers } from '/hooks/markers'
import { useUserLocation } from '/hooks/location'
import { findNearest } from 'geolib'

interface Props extends IButton {
  disabled?: boolean
}

const ButtonDefault = ({
  title,
  description,
  onPress,
  icon,
  timer,
  onTimerOut,
  disabled,
}: Props) => {
  const mainController = useMainController()
  const useMarkersObj = useMarkers()
  const { currentLocation, location } = useUserLocation()
  const [time, setTime] = useState(timer * 5)
  useEffect(() => {
    let valid = true
    let startTimer
    if (timer) {
      startTimer = setInterval(() => {
        if (valid) {
          setTime(prev => {
            if (prev === 1) {
              clearInterval(startTimer)
              onTimerOut && onTimerOut()
            }
            return prev - 1
          })
        }
      }, 200)
    }
    return () => {
      valid = false
      clearInterval(startTimer)
    }
  }, [])

  const renderTimer = () => (
    <View style={styles.timerContainer}>
      <View
        style={[
          styles.timerValue,
          {
            width: `${(time / (timer * 5)) * 100}%`,
          },
        ]}
      />
    </View>
  )

  const handleOnPress = () => {
    if (typeof onPress === 'string') {
      if (onPress === 'handleDirection') {
        const userPos = currentLocation.latitude ? currentLocation : location
        if (userPos?.latitude && useMarkersObj.markers?.length > 0) {
          const nearest = findNearest(userPos, useMarkersObj.markers)
          mainController[onPress](
            nearest as { latitude: number; longitude: number },
          )
        }
      } else if (useMarkersObj[onPress]) {
        useMarkersObj[onPress]()
      } else if (mainController[onPress]) {
        mainController[onPress]()
      }
    } else {
      onPress()
    }
  }
  return (
    <TouchableOpacity
      onPress={handleOnPress}
      disabled={disabled}
      style={[
        styles.container,
        timer && styles.paddingBottomZero,
        disabled && styles.disabled,
      ]}>
      <View style={styles.contentContainer}>
        {icon.name && (
          <Icon
            style={styles.icon}
            name={icon.name}
            size={icon.size}
            color={icon.color}
          />
        )}
        <View style={styles.textContainer}>
          <Text style={styles.textTitle}>{title}</Text>
          <Text style={styles.textDescription}>{description}</Text>
        </View>
      </View>
      {timer && renderTimer()}
    </TouchableOpacity>
  )
}

export default ButtonDefault
