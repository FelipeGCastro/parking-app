import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'
import { MaterialIcons } from '@expo/vector-icons'

interface Props {
  title: string
  description: string
  onPress: string
  icon: string
}

const ButtonDefault = ({ title, description, onPress, icon }: Props) => {
  return (
    <TouchableOpacity style={styles.container}>
      <MaterialIcons name="time-to-leave" size={24} color="black" />
      <View style={styles.textContainer}>
        <Text style={styles.textTitle}>Estou saindo</Text>
        <Text style={styles.textDescription}>Espaço ficará vazio</Text>
      </View>
    </TouchableOpacity>
  )
}

export default ButtonDefault
