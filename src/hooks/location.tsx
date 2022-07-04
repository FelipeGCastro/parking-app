import { createContext, useContext, useEffect, useState } from 'react'
import * as Location from 'expo-location'
import { useTranslate } from 'react-polyglot'
import { useAuth } from './auth'
import { socket } from '/services/io'

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
  const { user } = useAuth()
  const t = useTranslate()

  const handleUpdatePosition: Location.LocationCallback = ({ coords }) => {
    const userLocation = {
      latitude: coords.latitude,
      longitude: coords.longitude,
    }
    setCurrentLocation(userLocation)
  }

  useEffect(() => {
    if (user.isAdmin && currentLocation?.latitude) {
      socket.emit('collaboratorLocation', currentLocation, user.id)
    }
  }, [currentLocation, user])

  useEffect(() => {
    let locationSubscription: Location.LocationSubscription
    const handleLocationThings = async () => {
      setPermissionsLoading(true)
      await requestPermissions()
      setPermissionsLoading(false)
      locationSubscription = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.BestForNavigation },
        handleUpdatePosition,
      )
    }
    handleLocationThings()

    return () => {
      if (user.isAdmin) {
        socket.emit('removeCollaborator', user.id)
      }
      locationSubscription?.remove()
    }
  }, [])

  const requestPermissions = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      setErrorMsg(t('permissionDenied'))
      console.log('Permission to access location was denied')
      return
    }

    let location = await Location.getCurrentPositionAsync({})
    const dataLocation = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    }
    setLocation(dataLocation)
    setCurrentLocation(dataLocation)
  }

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
