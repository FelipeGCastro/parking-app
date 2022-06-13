import React, { useEffect, useState } from 'react'
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

const Home = () => {
  const {
    location,
    askLocationPermissions,
    currentLocation,
    permissionsLoading,
  } = useUserLocation()
  const { markers, addCurrentPosition, currentPosition } = useMainController()
  const [userLocationIsFocused, setUserLocationIsFocused] = useState(true)

  const defaultDelta = {
    longitudeDelta: 0.00922,
    latitudeDelta: 0.00421,
  }
  useEffect(() => {
    askLocationPermissions()
    addCurrentPosition({ ...location, ...defaultDelta })
  }, [])

  const userLocation = currentLocation?.latitude ? currentLocation : location
  const userRegion = { ...userLocation, ...defaultDelta }
  const region = userLocationIsFocused ? userRegion : currentPosition

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

  console.log('details.isGesture')
  return (
    <View style={styles.container}>
      {permissionsLoading || !location?.latitude ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={'#313131'} />
        </View>
      ) : (
        <MapView
          // onMapReady={askLocationPermissions}
          provider={PROVIDER_GOOGLE}
          initialRegion={initialRegion}
          region={region}
          onRegionChangeComplete={handleOnChangeFocus}
          style={styles.map}
          loadingEnabled>
          {currentLocation?.latitude && (
            <UserMarker position={currentLocation} />
          )}
          {markers.map((item, index) => (
            <SpotMarker key={index} type={item.type} position={item.position} />
          ))}
        </MapView>
      )}
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 140,
          right: 10,
        }}
        onPress={() => setUserLocationIsFocused(true)}>
        <Icon name="location" />
      </TouchableOpacity>
      <MainTab />
      <TopBar />
    </View>
  )
}

export default Home
