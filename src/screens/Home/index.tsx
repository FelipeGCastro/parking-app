import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, TouchableOpacity, View } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { useUserLocation } from 'hooks/location'
import { styles } from './styles'
import MainTab from '/components/MainTab'
import { useMainController } from '/hooks/mainController'
import SpotMarker from '/components/SpotMarker'
import TopBar from '/components/TopBar'
import UserMarker from '/components/UserMarker'
import Icon from '/components/Icon'
import LocationButton from './LocationButton'

const Home = () => {
  const { location, currentLocation, permissionsLoading } = useUserLocation()
  const { markers, addCurrentPosition, positionToGo } = useMainController()
  const [userLocationIsFocused, setUserLocationIsFocused] = useState(true)
  const mapRef = useRef<MapView>(null)

  const defaultDelta = {
    longitudeDelta: 0.00922,
    latitudeDelta: 0.00421,
  }

  useEffect(() => {
    if (userLocationIsFocused) {
      mapRef?.current?.animateToRegion({ ...currentLocation, ...defaultDelta })
    }
  }, [userLocationIsFocused])

  useEffect(() => {
    if (positionToGo?.latitude && mapRef?.current) {
      const handleCamera = async () => {
        const camera = await mapRef.current.getCamera()
        mapRef?.current?.animateCamera(
          {
            ...camera,
            center: { ...positionToGo },
          },
          { duration: 750 },
        )
      }
      handleCamera()
    }
  }, [positionToGo])

  const initialRegion = {
    ...location,
    longitudeDelta: 0.00922,
    latitudeDelta: 0.00421,
  }

  const handleOnChangeFocus = (reg, details) => {
    if (details.isGesture) {
      addCurrentPosition(reg)
      setUserLocationIsFocused(false)
    }
  }

  return (
    <View style={styles.container}>
      {permissionsLoading || !location?.latitude ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={'#313131'} />
        </View>
      ) : (
        <MapView
          ref={mapRef}
          // onMapReady={askLocationPermissions}
          provider={PROVIDER_GOOGLE}
          initialRegion={initialRegion}
          onRegionChangeComplete={handleOnChangeFocus}
          style={styles.map}>
          {currentLocation?.latitude && (
            <UserMarker position={currentLocation} />
          )}
          {markers.map((item, index) => (
            <SpotMarker key={index} type={item.type} position={item.position} />
          ))}
        </MapView>
      )}
      {!userLocationIsFocused && (
        <LocationButton onPress={() => setUserLocationIsFocused(true)} />
      )}
      <MainTab />
      <TopBar />
    </View>
  )
}

export default Home
