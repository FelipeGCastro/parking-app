import React, { useEffect, useRef } from 'react'
import { Text, View } from 'react-native'
import { styles } from './styles'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useMarkers } from '/hooks/markers'
import { useTranslate } from 'react-polyglot'

const TopBar = () => {
  const topSafeArea = useSafeAreaInsets().top
  const ref = useRef(null)
  const { selectedMarker } = useMarkers()
  const t = useTranslate()

  const renderInstructions = () => {
    return (
      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionsText}>{t('toCancelMoveIt')}</Text>
      </View>
    )
  }

  return selectedMarker ? (
    <View ref={ref} style={[styles.container, { paddingTop: topSafeArea + 4 }]}>
      <View style={styles.content}>{renderInstructions()}</View>
    </View>
  ) : null
}

export default TopBar
