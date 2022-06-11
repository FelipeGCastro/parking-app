import React, { useEffect, useRef, useState } from 'react'
import { Text, View } from 'react-native'
import { Transitioning, Transition } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ButtonDefault from '../ButtonDefault'
import { styles } from './styles'
import { useMainButtons } from '/hooks/mainButtons'

const transition = <Transition.Change interpolation="easeInOut" />

const MainTab = () => {
  const [collapsed, setCollapsed] = useState(false)
  const ref = useRef(null)
  const { buttons, leftText } = useMainButtons()
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
        {!!leftText && <Text style={styles.leftText}>{leftText}</Text>}
        {buttons.map(item => (
          <ButtonDefault
            key={item.title}
            onPress={() => ({})}
            icon={item.icon}
            title={item.title}
            description={item.description}
            timer={item.timer}
            onTimerOut={item.onTimerOut}
          />
        ))}
      </View>
    </Transitioning.View>
  )
}

export default MainTab
