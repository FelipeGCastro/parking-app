import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Text, View } from 'react-native'

import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTranslate } from 'react-polyglot'
import ButtonDefault from '../ButtonDefault'
import { SetMarker } from '../SetMarker'
import CloseButton from './CloseButton'
import MenuButton from './MenuButton'
import { styles } from './styles'
import { useUserLocation } from '/hooks/location'
import { IButton, useMainController } from '/hooks/mainController'
import { useMarkers } from '/hooks/markers'
import LocationButton from '/screens/Home/LocationButton'
import { validateDistance } from '/utils/geo'
import { useNavigation } from '@react-navigation/native'

interface Props {
  setUserFocused: (value: boolean) => void
  userLocationIsFocused: boolean
  setUserLocationIsFocused: (value: boolean) => void
}
const maxDistance = 100
const MainTab = ({
  setUserFocused,
  userLocationIsFocused,
  setUserLocationIsFocused,
}: Props) => {
  const [collapsed, setCollapsed] = useState(true)
  const { buttons, leftText, direction, resetDestination } = useMainController()
  const { permissionsLoading, location, currentLocation } = useUserLocation()
  const { showPositionMarker, markers, selectedMarker } = useMarkers()
  const bottomSafeArea = useSafeAreaInsets().bottom
  const [alert, setAlert] = useState('')
  const t = useTranslate()
  const navigation = useNavigation<any>()

  useEffect(() => {
    if (!permissionsLoading && !!location?.latitude) {
      setCollapsed(false)
    }
  }, [permissionsLoading, location])

  useEffect(() => {
    if (direction?.destination) {
      // ref?.current?.animateNextTransition()
      setCollapsed(true)
    } else {
      setCollapsed(false)
    }
  }, [direction])

  useEffect(() => {
    const firstValidation = buttons[0]?.onPress === 'invalidateMarker'
    if (firstValidation && selectedMarker?.latitude) {
      setAlert(
        validateDistance(selectedMarker, currentLocation, maxDistance)
          ? ''
          : t('minLocation', { distance: maxDistance }),
      )
    } else {
      setAlert('')
    }
  }, [selectedMarker, currentLocation])

  const renderButtons = (item: IButton) => {
    let disabled

    if (item.onPress === 'handleDirection') {
      disabled = !(markers.length > 0)
    }
    if (item.onPress === 'invalidateMarker') {
      disabled = selectedMarker?.status === 'invalidated' || alert
    }
    if (item.onPress === 'validateMarker') {
      disabled = selectedMarker?.status === 'validated' || alert
    }
    return (
      <View key={item.title} style={styles.buttonContainer}>
        <ButtonDefault
          onPress={item.onPress}
          icon={item.icon}
          title={item.title}
          description={item.description}
          timer={item.timer}
          onTimerOut={item.onTimerOut}
          disabled={disabled}
          setUserFocused={setUserFocused}
        />
      </View>
    )
  }

  return (
    <View style={styles.containerWrapper}>
      {showPositionMarker && <SetMarker />}
      <MenuButton onPress={() => navigation.toggleDrawer()} />
      {!userLocationIsFocused && (
        <LocationButton onPress={() => setUserLocationIsFocused(true)} />
      )}
      {direction?.destination && collapsed && (
        <CloseButton onPress={resetDestination} />
      )}
      <View
        style={[
          styles.container,
          { paddingBottom: bottomSafeArea },
          collapsed && styles.collapsedContainer,
        ]}>
        {!!alert && <Text style={styles.alertText}>{alert}</Text>}
        <View
          style={[
            styles.content,
            !!alert && { paddingTop: 0 },
            collapsed && styles.collapsedContainer,
          ]}>
          {!!leftText && <Text style={styles.leftText}>{leftText}</Text>}
          {!collapsed && buttons.map(renderButtons)}
        </View>
      </View>
    </View>
  )
}

export default MainTab
