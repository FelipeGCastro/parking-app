import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { useMyLocation } from 'hooks/location'
import { styles } from './styles'
import MainTab from '/components/MainTab'
import { useMainController } from '/hooks/mainController'
import SpotMarker from '/components/SpotMarker'
import TopBar from '/components/TopBar'

const Home = () => {
  const { location, askLocationPermissions } = useMyLocation()
  const { markers, addCurrentPosition } = useMainController()

  useEffect(() => {
    addCurrentPosition(location)
  }, [])
  return (
    <View style={styles.container}>
      <MapView
        onMapReady={askLocationPermissions}
        provider={PROVIDER_GOOGLE}
        initialRegion={location}
        showsUserLocation
        onRegionChange={addCurrentPosition}
        style={styles.map}
        loadingEnabled>
        {markers.map((item, index) => (
          <SpotMarker key={index} type={item.type} position={item.position} />
        ))}
      </MapView>
      <MainTab />
      <TopBar />
    </View>
  )
}

export default Home
