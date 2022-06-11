import { useEffect, useState } from 'react'
import * as Location from 'expo-location'

interface ILocation {
  latitude: number
  longitude: number
  latitudeDelta: number
  longitudeDelta: number
}

export const useMyLocation = () => {
  const [location, setLocation] = useState<ILocation>(null)
  const [errorMsg, setErrorMsg] = useState(null)

  const askLocationPermissions = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied')
      return
    }

    let location = await Location.getCurrentPositionAsync({})
    setLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      longitudeDelta: 0.000421,
      latitudeDelta: 0.000922,
    })
  }

  return {
    location,
    errorMsg,
    askLocationPermissions,
  }
}
