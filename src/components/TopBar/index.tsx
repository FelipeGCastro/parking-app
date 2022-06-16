import React, { useEffect, useRef } from 'react'
import { Text, View } from 'react-native'
import { styles } from './styles'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Transitioning, Transition } from 'react-native-reanimated'
import { useTopBar } from '/hooks/topBar'
import { useMarkers } from '/hooks/markers'
const transition = <Transition.Change interpolation="easeInOut" />

const TopBar = () => {
  const topSafeArea = useSafeAreaInsets().top
  const ref = useRef(null)
  const { selectedMarker } = useMarkers()
  const { isOpen } = useTopBar()

  useEffect(() => {
    if (isOpen) {
      ref?.current?.animateNextTransition()
    }
  }, [isOpen])

  const renderInstructions = () => {
    return <Text style={styles.labelText}>Para cancelar, mova no mapa!</Text>
  }
  const renderLabels = () => (
    <>
      <View style={styles.labelContainer}>
        <View style={[styles.labelIcon, styles.labelConfirmed]} />
        <Text style={styles.labelText}>Validado</Text>
      </View>

      <View style={styles.labelContainer}>
        <View style={[styles.labelIcon, styles.labelIndicated]} />
        <Text style={styles.labelText}>Criado</Text>
      </View>
      <View style={styles.labelContainer}>
        <View style={[styles.labelIcon, styles.labelReindicated]} />
        <Text style={styles.labelText}>Invalidado</Text>
      </View>
    </>
  )
  console.log('showPositionMarker', selectedMarker)
  return (
    <Transitioning.View
      ref={ref}
      transition={transition}
      style={[styles.container, { paddingTop: topSafeArea }]}>
      <View style={styles.content}>
        {selectedMarker ? renderInstructions() : renderLabels()}
      </View>
    </Transitioning.View>
  )
}

export default TopBar
