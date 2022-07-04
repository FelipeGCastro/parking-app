import React from 'react'
import { StyleProp, TextStyle } from 'react-native'

import {
  MaterialIcons,
  Entypo,
  FontAwesome5,
  MaterialCommunityIcons,
  AntDesign,
  Feather,
  Ionicons
} from '@expo/vector-icons'

const iconNames = {
  ['time-to-leave']: MaterialIcons,
  ['error-outline']: MaterialIcons,
  location: Entypo,
  check: FontAwesome5,
  ['user-alt']: FontAwesome5,
  ['car-side']: FontAwesome5,
  ['emoji-people']: MaterialIcons,
  ['my-location']: MaterialIcons,
  menu: MaterialIcons,
  ['close-circle-outline']: MaterialCommunityIcons,
  google: AntDesign,
  apple1: AntDesign,
  power: Feather,
  male: FontAwesome5,
  ['ios-rocket-sharp']: Ionicons
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
