import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import Icon, { IconNames } from '../Icon'
import { text, variables } from '/styles'

interface Props {
  title?: string
  leftButtonPress: () => void
  leftIcon?: {
    iconName: IconNames
    size?: number
    color?: string
  }
}
const HeaderDefault = ({ title, leftButtonPress, leftIcon }: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuButton} onPress={leftButtonPress}>
        <Icon
          name={leftIcon?.iconName || 'menu'}
          size={leftIcon?.size}
          color={leftIcon?.color || variables.secondaryTextColor}
        />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.fakeView} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: variables.marginHorizontal,
  },
  menuButton: {},
  title: {
    ...text.heading2,
    color: variables.secondaryTextColor,
  },
  fakeView: {
    width: 30,
  },
})

export default HeaderDefault
