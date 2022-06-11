import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { useMyLocation } from 'hooks/location'
import { styles } from './styles'
import LabelBar from '/components/LabelBar'
import MainTab from '/components/MainTab'

const Home = () => {
  const { location, askLocationPermissions } = useMyLocation()

  return (
    <View style={styles.container}>
      <LabelBar />
      <MapView
        onMapReady={askLocationPermissions}
        provider={PROVIDER_GOOGLE}
        initialRegion={location}
        showsUserLocation
        style={styles.map}
        loadingEnabled
      />
      <MainTab />
    </View>
  )
}

export default Home
