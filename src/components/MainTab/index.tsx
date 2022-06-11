import React, { useEffect, useRef, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Transitioning, Transition } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ButtonDefault from '../ButtonDefault'
import { styles } from './styles'

const transition = <Transition.Change interpolation="easeInOut" />

const MainTab = () => {
  const [collapsed, setCollapsed] = useState(false)
  const ref = useRef(null)
  const bottomSafeArea = useSafeAreaInsets().bottom

  useEffect(() => {
    ref?.current?.animateNextTransition()
    setCollapsed(false)
  }, [])

  return (
    <Transitioning.View
      ref={ref}
      transition={transition}
      style={[styles.container, { paddingBottom: bottomSafeArea + 35 }]}>
      <View style={[styles.content, collapsed && styles.collapsedContainer]}>
        <ButtonDefault />
      </View>
    </Transitioning.View>
  )
}

export default MainTab
