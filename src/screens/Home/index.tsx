import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ActivityIndicator, Platform, View } from 'react-native'
import MapView, { Circle, PROVIDER_GOOGLE, Region } from 'react-native-maps'
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

const googleApiKey = process.env.GOOGLE_API_DIRECTIONS

const Home = () => {
  const { location, currentLocation, permissionsLoading } = useUserLocation()
  const { addCurrentPosition, positionToGo, direction, addBounds } =
    useMainController()
  const {
    markers,
    hideValidateAndInvalidate,
    selectedMarker,
    getMarkers,
    showPositionMarker,
  } = useMarkers()
  const [userLocationIsFocused, setUserLocationIsFocused] = useState(true)
  const mapRef = useRef<MapView>(null)

  const zoom = direction?.destination ? 0.35 : showPositionMarker ? 0.25 : 1
  const defaultDelta = {
    longitudeDelta: 0.00522 * zoom,
    latitudeDelta: 0.00021 * zoom,
  }

  useEffect(() => {
    if (userLocationIsFocused || showPositionMarker) {
      mapRef?.current?.animateToRegion({ ...currentLocation, ...defaultDelta })

      fetchMarkers()
    }
  }, [userLocationIsFocused, showPositionMarker])

  const fetchMarkers = useCallback(async () => {
    if (!mapRef?.current) {
      return
    }
    const bounds = await mapRef?.current?.getMapBoundaries()
    if (bounds?.northEast?.latitude) {
      getMarkers(bounds)
    }
  }, [mapRef, getMarkers])

  useEffect(() => {
    let valid = true
    function refresh() {
      if (valid) {
        fetchMarkers()
      }
      setTimeout(refresh, 1000 * 5)
      // ...
    }

    // initial call, or just call refresh directly
    setTimeout(refresh, 1000 * 5)
    return () => {
      valid = false
    }
  }, [])
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
    longitudeDelta: 0.00922 * zoom,
    latitudeDelta: 0.00421 * zoom,
  }

  const handleOnChangeFocus = async (reg: Region) => {
    fetchMarkers()
    const bounds = await mapRef?.current?.getMapBoundaries()
    if (bounds?.northEast?.latitude) {
      addBounds(bounds)
    }
    addCurrentPosition(reg)
  }

  const handleChangeRegion = (reg, details) => {
    // if (details.isGesture) {
    if (userLocationIsFocused) {
      setUserLocationIsFocused(false)
    }
    if (selectedMarker) {
      hideValidateAndInvalidate()
    }
    // }
  }

  const handleMapReady = () => {
    fetchMarkers()
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
          toolbarEnabled={false}
          style={styles.map}>
          {currentLocation?.latitude && (
            <UserMarker position={currentLocation} />
          )}
          {!!selectedMarker && (
            <Circle
              center={currentLocation}
              fillColor={'rgba(255,40,0,0.1)'}
              strokeColor={'rgba(255,40,0,0.2)'}
              radius={100}
            />
          )}
          {markers.map(marker => (
            <SpotMarker
              key={marker.id}
              marker={marker}
              selectedMarker={selectedMarker}
              setUserFocused={setUserLocationIsFocused}
            />
          ))}
          {direction?.destination && !!currentLocation?.latitude && (
            <MapViewDirections
              origin={currentLocation}
              destination={direction.destination}
              apikey={googleApiKey}
              strokeWidth={3}
            />
          )}
        </MapView>
      )}
      {!userLocationIsFocused && (
        <LocationButton onPress={() => setUserLocationIsFocused(true)} />
      )}
      <MainTab setUserFocused={setUserLocationIsFocused} />
      <TopBar />
    </View>
  )
}

export default Home
