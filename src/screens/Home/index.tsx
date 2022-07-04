import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import MapView, { Circle, Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps'
import { useUserLocation } from 'hooks/location'
import { styles } from './styles'
import MainTab from '/components/common/MainTab'
import { useMainController } from '/hooks/mainController'
import SpotMarker from '/components/common/SpotMarker'
import TopBar from '/components/common/TopBar'
import UserMarker from '/components/common/UserMarker'
import { useMarkers } from '/hooks/markers'
import MapViewDirections from 'react-native-maps-directions'
import MenuButton from '/components/common/MainTab/MenuButton'

const googleApiKey = process.env.GOOGLE_API_DIRECTIONS

const Home = ({ navigation }) => {
  const { location, currentLocation, permissionsLoading } = useUserLocation()
  const { addCurrentPosition, positionToGo, direction, addBounds } =
    useMainController()
  const {
    markers,
    hideValidateAndInvalidate,
    selectedMarker,
    getMarkers,
    showPositionMarker,
    collaborators
  } = useMarkers()
  const [userLocationIsFocused, setUserLocationIsFocused] = useState(true)
  const mapRef = useRef<MapView>(null)
  const maxDistance = 250
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
  }, [showPositionMarker, userLocationIsFocused])

  useEffect(() => {
    if (userLocationIsFocused) {
      mapRef?.current?.animateToRegion({ ...currentLocation, ...defaultDelta })
    }
  }, [currentLocation])

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

  const handleOnChangeFocus = async (reg: Region, { isGesture } ) => {
    fetchMarkers()
    const bounds = await mapRef?.current?.getMapBoundaries()
    if (bounds?.northEast?.latitude) {
      addBounds(bounds)
    }
    addCurrentPosition(reg)
    if (userLocationIsFocused && isGesture) {
      setUserLocationIsFocused(false)
    }
    if (selectedMarker) {
      hideValidateAndInvalidate()
    }
  }

  // const handleChangeRegion = (reg, details) => {
  //   if (userLocationIsFocused) {
  //     setUserLocationIsFocused(false)
  //   }
  //   if (selectedMarker) {
  //     hideValidateAndInvalidate()
  //   }
  // }

  const handleMapReady = async () => {
    const bounds = await mapRef?.current?.getMapBoundaries()
    if (bounds?.northEast?.latitude) {
      addBounds(bounds)
    }
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
          // onRegionChange={handleChangeRegion}
          // onPress={handleMapPress}
          toolbarEnabled={false}
          
          style={styles.map}>
          {currentLocation?.latitude && (
            <UserMarker position={currentLocation} />
          )}
          {!!selectedMarker && (
            <Circle
              center={currentLocation}
              fillColor={'rgba(0,0,0,0.1)'}
              strokeColor={'rgba(0,0,0,0.2)'}
              radius={maxDistance}
            />
          )}
          {Object.keys(collaborators).map((key) => (
            <Marker key={collaborators[key].id} coordinate={collaborators[key]} />
          ))}
          {Object.keys(markers).map(key => (
            <SpotMarker
              key={markers[key].id}
              marker={markers[key]}
              selectedMarker={selectedMarker}
              setUserFocused={setUserLocationIsFocused}
            />
          ))}
          {direction?.destination && !!currentLocation?.latitude && (
            <MapViewDirections
              origin={currentLocation}
              destination={direction.destination}
              apikey={googleApiKey}
              strokeWidth={4}
            />
          )}
        </MapView>
      )}

      <MenuButton onPress={() => navigation.toggleDrawer()} />
      <MainTab
        userLocationIsFocused={userLocationIsFocused}
        setUserLocationIsFocused={setUserLocationIsFocused}
        setUserFocused={setUserLocationIsFocused}
        maxDistance={maxDistance}
      />
      <TopBar />
    </View>
  )
}

export default Home
