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
  const [markersLoading, setMarkersLoading] = useState(false)
  const t = useTranslate()

  useEffect(() => {
    socket.on('latestSpot', handleUpdateSpots)
    socket.on('removedSpots', handleRemoveSpots)

    return () => {
      socket.off('latestSpot')
      socket.off('removedSpots')
    }
  }, [])
  const handleUpdateSpots = useCallback(
    (spot: IMarker) => {
      console.log('spot.latitude', spot.latitude)
      if (spot.latitude) {
        // const isRelevant = isInsideBounds(
        //   { latitude: spot.latitude, longitude: spot.longitude },
        //   bounds,
        // )
        // if (isRelevant) {
        setMarkers(prev => ({ ...prev, [spot.id]: spot }))
        // }
      }
    },
    [bounds],
  )
  const handleRemoveSpots = useCallback(
    (spots: IMarker[]) => {
      const markersCopy = { ...markers }
      spots.forEach(spot => {
        delete markersCopy[spot.id]
      })
      setMarkers(markersCopy)
    },
    [markers],
  )
  const getMarkers = async (bounds?: IBounds) => {
    setMarkersLoading(true)
    socket.emit('getSpots', bounds, response => {
      const markers = convertArrayToObject(response.spots, 'id')
      setMarkers(markers)
      setMarkersLoading(false)
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
    try {
      if (bounds?.northEast?.latitude) {
        await api.patch('/spots', { id, status })
      }
    } catch (error) {
      console.log('ERROR UPDATING MARKER')
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
    if (currentPosition?.latitude) {
      try {
        await api.post('/spots', {
          longitude: currentPosition.longitude,
          latitude: currentPosition.latitude,
        })
      } catch (error) {
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
