import React from 'react'
import { Text, View } from 'react-native'
import { styles } from './styles'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const LabelBar = () => {
  const topSafeArea = useSafeAreaInsets().top
  return (
    <View style={[styles.container, { paddingTop: topSafeArea }]}>
      <View style={styles.labelContainer}>
        <View style={[styles.labelIcon, styles.labelConfirmed]} />
        <Text style={styles.labelText}>Confirmado</Text>
      </View>
      <View style={styles.labelContainer}>
        <View style={[styles.labelIcon, styles.labelReindicated]} />
        <Text style={styles.labelText}>Reindicado</Text>
      </View>
      <View style={styles.labelContainer}>
        <View style={[styles.labelIcon, styles.labelIndicated]} />
        <Text style={styles.labelText}>Indicado</Text>
      </View>
    </View>
  )
}

export default LabelBar
