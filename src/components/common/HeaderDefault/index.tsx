import React, { useState } from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  LayoutChangeEvent,
} from 'react-native'
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
  rightButton?: {
    label?: string
    onPress?: () => void
    color?: string
    icon?: {
      iconName: IconNames
      size?: number
      color?: string
    }
  }
}
const HeaderDefault = ({
  title,
  leftButtonPress,
  leftIcon,
  rightButton,
}: Props) => {
  const [leftWidth, setLeftWidth] = useState(30)
  const renderIcon = (icon, sidePress) => (
    <TouchableOpacity
      style={[styles.menuButton, { width: leftWidth }]}
      onPress={sidePress}>
      <Icon
        name={icon?.iconName || 'menu'}
        size={icon?.size}
        color={icon?.color || variables.secondaryTextColor}
      />
    </TouchableOpacity>
  )
  const handleLayout = (event: LayoutChangeEvent) => {
    const width = event.nativeEvent.layout.width
    setLeftWidth(width)
  }
  const renderRightPart = () => {
    if (rightButton?.icon) {
      return renderIcon(rightButton.icon, rightButton.onPress)
    } else if (rightButton?.label) {
      return (
        <Text
          onLayout={handleLayout}
          style={[
            styles.rightLabel,
            rightButton.color && { color: rightButton.color },
          ]}>
          {rightButton.label}
        </Text>
      )
    } else {
      return <View style={styles.fakeView} />
    }
  }
  return (
    <View style={styles.container}>
      {renderIcon(leftIcon, leftButtonPress)}
      <Text style={styles.title}>{title}</Text>
      {renderRightPart()}
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
  rightLabel: {
    ...text.bodyMRegular,
    color: variables.secondaryTextColor,
  },
})

export default HeaderDefault
