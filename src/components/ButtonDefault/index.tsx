import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'
import Icon, { IconNames } from '../Icon'

interface Props {
  title: string
  description: string
  onPress: () => void
  icon?: {
    name: IconNames
    size: number
    color: string
  }
}

const ButtonDefault = ({ title, description, onPress, icon }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
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
    </TouchableOpacity>
  )
}

export default ButtonDefault
