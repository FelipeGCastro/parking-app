import React from 'react'
import { StyleProp, TextStyle, View } from 'react-native'

import { MaterialIcons } from '@expo/vector-icons'

const iconNames = {
  ['time-to-leave']: MaterialIcons,
} as const

export type IconNames = keyof typeof iconNames
interface Props {
  name: IconNames
  size?: number
  color?: string
  style?: StyleProp<TextStyle>
}

const Icon = ({ name, size = 30, color = '#313131', style }: Props) => {
  const IconComponent = iconNames[name]
  return <IconComponent style={style} name={name} size={size} color={color} />
}

export default Icon
