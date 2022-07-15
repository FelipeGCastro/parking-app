import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { useStylesContext } from 'hooks/styles'
import stylesheets from './styles'

interface Props {
  text: string
  onPress: () => void
  disabled?: boolean
}

const ButtonAction = ({ text, onPress, disabled }: Props) => {
  const [styles] = useStylesContext(stylesheets)
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.buttonContainer, disabled && styles.buttonDisabled]}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  )
}

export default ButtonAction
