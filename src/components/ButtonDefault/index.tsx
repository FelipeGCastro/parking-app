import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'
import Icon, { IconNames } from '../Icon'

interface Props {
  title: string
  description: string
  onPress: () => void
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
  const [time, setTime] = useState(timer * 5)
  useEffect(() => {
    let startTimer
    if (timer) {
      startTimer = setInterval(() => {
        setTime(prev => {
          if (prev === 1) {
            clearInterval(startTimer)
            onTimerOut && onTimerOut()
          }
          return prev - 1
        })
      }, 200)
    }
    return () => {
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
  return (
    <TouchableOpacity
      onPress={onPress}
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
