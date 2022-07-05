import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated'
import { text, variables } from '/styles'

const RoundedButton = ({ label, onPress }) => {
  return (
    <Animated.View entering={FadeInDown.duration(1000)} exiting={FadeOutUp} style={{ alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity onPress={onPress}>
        <Text style={{ ...text.bodyLMedium, color: variables.white_one }}>
          {label}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  )
}

export default RoundedButton
