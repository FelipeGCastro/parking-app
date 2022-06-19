import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Text, View } from 'react-native'

import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ButtonDefault from '../ButtonDefault'
import { SetMarker } from '../SetMarker'
import CloseButton from './CloseButton'
import { styles } from './styles'
import { useUserLocation } from '/hooks/location'
import { IButton, useMainController } from '/hooks/mainController'
import { useMarkers } from '/hooks/markers'

interface Props {
  setUserFocused: (value: boolean) => void
}
const MainTab = ({ setUserFocused }: Props) => {
  const [collapsed, setCollapsed] = useState(true)
  const { buttons, leftText, destination, resetDestination } =
    useMainController()
  const { permissionsLoading, location } = useUserLocation()
  const { showPositionMarker, markers, selectedMarker } = useMarkers()
  const bottomSafeArea = useSafeAreaInsets().bottom

  useEffect(() => {
    if (!permissionsLoading && !!location?.latitude) {
      setCollapsed(false)
    }
  }, [permissionsLoading, location])

  useEffect(() => {
    if (destination.latitude) {
      // ref?.current?.animateNextTransition()
      setCollapsed(true)
    } else {
      setCollapsed(false)
    }
  }, [destination])

  const renderButtons = (item: IButton) => {
    let disabled
    if (item.onPress === 'handleDirection') {
      disabled = !(markers.length > 0)
    }
    if (item.onPress === 'invalidateMarker') {
      disabled = selectedMarker?.status === 'invalidated'
    }
    return (
      <ButtonDefault
        key={item.title}
        onPress={item.onPress}
        icon={item.icon}
        title={item.title}
        description={item.description}
        timer={item.timer}
        onTimerOut={item.onTimerOut}
        disabled={disabled}
        setUserFocused={setUserFocused}
      />
    )
  }

  return (
    <>
      {showPositionMarker && <SetMarker />}
      {destination && collapsed && <CloseButton onPress={resetDestination} />}
      <View
        style={[
          styles.container,
          { paddingBottom: bottomSafeArea },
          collapsed && styles.collapsedContainer,
        ]}>
        <View style={[styles.content, collapsed && styles.collapsedContainer]}>
          {!!leftText && <Text style={styles.leftText}>{leftText}</Text>}
          {!collapsed && buttons.map(renderButtons)}
        </View>
      </View>
    </>
  )
}

export default MainTab
