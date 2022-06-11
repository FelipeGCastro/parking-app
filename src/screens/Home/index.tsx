import React, { useEffect, useState } from "react";
import { View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { useMyLocation } from "hooks/location";
import { styles } from "./styles";

const Home = () => {
  const { location, askLocationPermissions } = useMyLocation();
  console.log("location", location);
  return (
    <View style={styles.container}>
      <MapView
        onMapReady={askLocationPermissions}
        provider={PROVIDER_GOOGLE}
        initialRegion={location}
        showsUserLocation
        style={styles.map}
        loadingEnabled
      />
    </View>
  );
};

export default Home;
