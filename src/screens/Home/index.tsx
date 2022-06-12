import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { useMyLocation } from 'hooks/location'
import { styles } from './styles'
import LabelBar from '/components/LabelBar'
import MainTab from '/components/MainTab'
import { useMainController } from '/hooks/mainController'

const Home = () => {
  const { location, askLocationPermissions } = useMyLocation()
  const { showPositionMarker } = useMainController()
  const [currentPosition, setCurrentPosition] =
    useState<typeof location>(location)

  return (
    <View style={styles.container}>
      <MapView
        onMapReady={askLocationPermissions}
        provider={PROVIDER_GOOGLE}
        initialRegion={location}
        showsUserLocation
        onRegionChange={
          showPositionMarker ? region => setCurrentPosition(region) : undefined
        }
        style={styles.map}
        loadingEnabled></MapView>
      <MainTab />
      <LabelBar />
    </View>
  )
}

export default Home
