import React from 'react'
import { StyleProp, TextStyle, View } from 'react-native'

import { MaterialIcons, Entypo, FontAwesome5 } from '@expo/vector-icons'

const iconNames = {
  ['time-to-leave']: MaterialIcons,
  ['error-outline']: MaterialIcons,
  location: Entypo,
  check: FontAwesome5,
  ['my-location']: MaterialIcons,
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

  return (
    <IconComponent
      style={style}
      name={name as 'link'} // only set as link to avoid ts error
      size={size}
      color={color}
    />
  )
}

export default Icon
