import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'
import Icon, { IconNames } from '../Icon'
import { useMainController } from '/hooks/mainController'

interface Props {
  title: string
  description: string
  onPress: string | (() => void)
  icon?: {
    name: IconNames
    size?: number
    color?: string
  }
  timer?: number
  onTimerOut?: () => void
}

const ButtonDefault = ({
  title,
  description,
  onPress,
  icon,
  timer,
  onTimerOut,
}: Props) => {
  const mainController = useMainController()
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
      if (mainController[onPress]) {
        mainController[onPress]()
      }
    } else {
      onPress()
    }
  }
  return (
    <TouchableOpacity
      onPress={handleOnPress}
      style={[styles.container, timer && styles.paddingBottomZero]}>
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
