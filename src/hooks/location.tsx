import { createContext, useContext, useEffect, useState } from 'react'
import * as Location from 'expo-location'
import { useMarkers } from './markers'

interface ILocation {
  latitude: number
  longitude: number
}
interface IUserLocationContext {
  location: ILocation
  currentLocation: ILocation
  errorMsg: string
  permissionsLoading: boolean
}
const UserLocationContext = createContext({} as IUserLocationContext)

export const UserLocationProvider = ({ children }) => {
  const [location, setLocation] = useState<ILocation>(null)
  const [currentLocation, setCurrentLocation] = useState<ILocation>(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [permissionsLoading, setPermissionsLoading] = useState(true)
  const { getMarkers } = useMarkers()

  const handleUpdatePosition: Location.LocationCallback = ({ coords }) => {
    setCurrentLocation({
      latitude: coords.latitude,
      longitude: coords.longitude,
    })
  }

  useEffect(() => {
    let locationSubscription: Location.LocationSubscription
    const handleLocationThings = async () => {
      setPermissionsLoading(true)
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied')
        console.log('Permission to access location was denied')
        setPermissionsLoading(false)
        return
      }

      let location = await Location.getCurrentPositionAsync({})
      const dataLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }
      setLocation(dataLocation)
      getMarkers(dataLocation)
      setPermissionsLoading(false)
      locationSubscription = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.BestForNavigation },
        handleUpdatePosition,
      )
    }
    handleLocationThings()

    return () => {
      locationSubscription?.remove()
    }
  }, [])

  return (
    <UserLocationContext.Provider
      value={{
        location,
        errorMsg,
        permissionsLoading,
        currentLocation,
      }}>
      {children}
    </UserLocationContext.Provider>
  )
}

export const useUserLocation = () => {
  const context = useContext(UserLocationContext)
  return context
}
