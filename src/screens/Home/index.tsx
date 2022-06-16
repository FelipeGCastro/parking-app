import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { useUserLocation } from 'hooks/location'
import { styles } from './styles'
import MainTab from '/components/MainTab'
import { useMainController } from '/hooks/mainController'
import SpotMarker from '/components/SpotMarker'
import TopBar from '/components/TopBar'
import UserMarker from '/components/UserMarker'
import LocationButton from './LocationButton'
import { useMarkers } from '/hooks/markers'
import MapViewDirections from 'react-native-maps-directions'

const Home = () => {
  const { location, currentLocation, permissionsLoading } = useUserLocation()
  const { addCurrentPosition, positionToGo, destination, currentPosition } =
    useMainController()
  const { markers, hideValidateAndInvalidate, selectedMarker, getMarkers } =
    useMarkers()
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
          { duration: 400 },
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
      getMarkers()
    }
  }
  const handleChangeRegion = (reg, details) => {
    if (details.isGesture) {
      addCurrentPosition(reg)
      setUserLocationIsFocused(false)
      if (selectedMarker) {
        hideValidateAndInvalidate()
      }
    }
  }

  const handleMapReady = () => {
    getMarkers(location)
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
          onMapReady={handleMapReady}
          provider={PROVIDER_GOOGLE}
          initialRegion={initialRegion}
          onRegionChangeComplete={handleOnChangeFocus}
          onRegionChange={handleChangeRegion}
          // onPress={handleMapPress}
          style={styles.map}>
          {currentLocation?.latitude && (
            <UserMarker position={currentLocation} />
          )}
          {markers.map(marker => (
            <SpotMarker key={marker.id} marker={marker} />
          ))}
          {destination?.latitude && (
            <MapViewDirections
              origin={currentLocation}
              destination={destination}
              apikey={process.env.GOOGLE_API_KEY}
              strokeWidth={3}
            />
          )}
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
