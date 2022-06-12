import React, { useRef } from 'react'
import { Text, View } from 'react-native'
import { styles } from './styles'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Transitioning, Transition } from 'react-native-reanimated'
const transition = <Transition.Change interpolation="easeInOut" />

const TopBar = () => {
  const topSafeArea = useSafeAreaInsets().top
  const ref = useRef(null)
  return (
    <Transitioning.View
      ref={ref}
      transition={transition}
      style={[styles.container, { paddingTop: topSafeArea }]}>
      <View style={styles.content}>
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
    </Transitioning.View>
  )
}

export default TopBar
