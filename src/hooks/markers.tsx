import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useTranslate } from 'react-polyglot'
import { IButton, useMainController } from './mainController'
import { api } from '/services/api'
import { socket } from '/services/io'
import { convertArrayToObject, isInsideBounds } from '/utils/manipulators'

export type MarkerStatus = 'created' | 'invalidated' | 'validated'

export interface IPosition {
  longitude: number
  latitude: number
}
export interface IMarker {
  id: string
  longitude: number
  latitude: number
  status: MarkerStatus
  createdAt: string
  updatedAt: string
}
export interface IBounds {
  northEast: { latitude: number; longitude: number }
  southWest: { latitude: number; longitude: number }
}
interface IMarkerContext {
  addSpot: () => void
  markers: IMarkers
  handleAddPosition: () => void
  showValidateAndInvalidate: (marker: IMarker) => void
  hideValidateAndInvalidate: () => void
  cancelAddSpot: () => void
  showPositionMarker: boolean
  validateMarker: (id: string) => void
  invalidateMarker: (id: string) => void
  getMarkers: (bounds: IBounds) => Promise<void>
  selectedMarker: undefined | IMarker
  getMarkersLoading: boolean
  markersLoading: boolean
}
const MarkersContext = createContext({} as IMarkerContext)

interface IMarkers {
  [key: string]: IMarker
}

export const MarkersProvider = ({ children }) => {
  const [markers, setMarkers] = useState<IMarkers>({})
  const [showPositionMarker, setShowPositionMarker] = useState(false)
  const [preventDoubleCall, setPreventDoubleCall] = useState(false)
  const [selectedMarker, setSelectedMarker] = useState<undefined | IMarker>()
  const { changeButtons, currentPosition, bounds } = useMainController()
  const [getMarkersLoading, setGetMarkersLoading] = useState(false)
  const [markersLoading, setMarkersLoading] = useState(false)
  const [newSpot, setNewSpot] = useState<undefined | IMarker>()
  const t = useTranslate()

  useEffect(() => {
    if (newSpot) {
      const isRelevant = isInsideBounds(
        { latitude: newSpot.latitude, longitude: newSpot.longitude },
        bounds,
      )
      if (isRelevant) {
        setMarkers(prev => ({ ...prev, [newSpot.id]: newSpot }))
      }
      setNewSpot(undefined)
    }
  }, [newSpot])

  useEffect(() => {
    socket.on('latestSpot', (spot: IMarker) => {
      if (spot.latitude) {
        setNewSpot(spot)
      }
    })

    socket.on('removedSpots', (spots: IMarker[]) => {
      setMarkers(prev => {
        spots.forEach(spotItem => {
          delete prev[spotItem.id]
        })
        return prev
      })
    })

    return () => {
      socket.off('latestSpot')
      socket.off('removedSpots')
    }
  }, [])

  const getMarkers = async (bounds?: IBounds) => {
    setGetMarkersLoading(true)
    socket.emit('getSpots', bounds, response => {
      const markers = convertArrayToObject(response.spots, 'id')
      setMarkers(markers)
      setGetMarkersLoading(false)
    })
  }

  const handleAddPosition = () => {
    setShowPositionMarker(true)
    changeButtons(addSpotButton)
  }

  const updateMarker = async ({
    id,
    status,
  }: {
    id: string
    status: MarkerStatus
  }) => {
    setMarkersLoading(true)
    try {
      if (bounds?.northEast?.latitude) {
        const result = await api.patch('/spots', { id, status })
        const spot = result.data?.spot
        if (spot) {
          setMarkers(prev => ({ ...prev, [spot.id]: spot }))
        }
      }
      setMarkersLoading(false)
    } catch (error) {
      setMarkersLoading(false)
      console.log('ERROR UPDATING MARKER', error)
    }
  }

  const validateMarker = (id: string) => {
    if (!id) {
      id = selectedMarker?.id
    }
    updateMarker({ id, status: 'validated' })
    changeButtons()
    setSelectedMarker(undefined)
  }
  const invalidateMarker = (id: string) => {
    if (!id) {
      id = selectedMarker?.id
    }
    updateMarker({ id, status: 'invalidated' })
    changeButtons()
    setSelectedMarker(undefined)
  }

  const addSpot = useCallback(async () => {
    setMarkersLoading(true)
    if (currentPosition?.latitude) {
      try {
        const result = await api.post('/spots', {
          longitude: currentPosition.longitude,
          latitude: currentPosition.latitude,
        })
        const spot = result.data?.spot
        if (spot) {
          setMarkers(prev => ({ ...prev, [spot.id]: spot }))
        }
        setMarkersLoading(false)
      } catch (error) {
        setMarkersLoading(false)
        console.log(error)
      }
      setShowPositionMarker(false)
      changeButtons()
    } else {
      console.log('Error to add current position')
    }
  }, [currentPosition])

  const hideValidateAndInvalidate = () => {
    if (!preventDoubleCall) {
      setSelectedMarker(undefined)
      changeButtons()
    }
  }

  const showValidateAndInvalidate = (marker: IMarker) => {
    setPreventDoubleCall(true)
    setTimeout(() => {
      setPreventDoubleCall(false)
    }, 750)
    setSelectedMarker(marker)

    changeButtons(validateAndInvalidate)
  }
  const cancelAddSpot = () => {
    setShowPositionMarker(false)
    changeButtons()
  }

  const addSpotButton: IButton[] = [
    {
      title: t('cancel'),
      description: t('changedMyMind'),
      onPress: 'cancelAddSpot',
      icon: {
        name: 'error-outline',
        color: '#C60606',
      },
    },
    {
      title: t('markSpot'),
      description: t('spotFreeHere'),
      onPress: 'addSpot',
      icon: {
        name: 'location',
        color: '#06C615',
      },
    },
  ]

  const validateAndInvalidate: IButton[] = [
    {
      title: t('invalid'),
      description: t('someoneTookIt'),
      onPress: 'invalidateMarker',
      icon: {
        name: 'error-outline',
        size: undefined,
        color: '#C60606',
      },
    },
    {
      title: t('spotFree'),
      description: t('spotFreeHere'),
      onPress: 'validateMarker',
      icon: {
        name: 'check',
        size: undefined,
        color: '#06C615',
      },
    },
  ]

  return (
    <MarkersContext.Provider
      value={{
        addSpot,
        markers,
        handleAddPosition,
        showPositionMarker,
        validateMarker,
        invalidateMarker,
        showValidateAndInvalidate,
        hideValidateAndInvalidate,
        getMarkers,
        selectedMarker,
        cancelAddSpot,
        getMarkersLoading,
        markersLoading,
      }}>
      {children}
    </MarkersContext.Provider>
  )
}

export const useMarkers = () => {
  const context = useContext(MarkersContext)
  return context
}
