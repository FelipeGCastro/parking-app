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
  markers: IMarker[]
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

export const MarkersProvider = ({ children }) => {
  const [markers, setMarkers] = useState<IMarker[]>([])
  const [showPositionMarker, setShowPositionMarker] = useState(false)
  const [preventDoubleCall, setPreventDoubleCall] = useState(false)
  const [selectedMarker, setSelectedMarker] = useState<undefined | IMarker>()
  const { changeButtons, currentPosition, bounds } = useMainController()
  const [markersLoading, setMarkersLoading] = useState(false)
  const t = useTranslate()

  const getMarkers = async (bounds?: IBounds) => {
    setMarkersLoading(true)
    socket.emit('getSpots', bounds, response => {
      setMarkers(response.spots)
      setMarkersLoading(false)
    })
    // try {
    //   if (bounds?.northEast) {
    //     const result = await api.get('/spots', {
    //       params: {
    //         bounds,
    //       },
    //     })
    //     setMarkers(result.data)
    //   } else {
    //     return
    //   }
    // } catch (error) {
    //   console.log('ERROR GETTING SPOTS')
    // }
  }

  const handleAddPosition = () => {
    setShowPositionMarker(true)
    changeButtons(addSpotButton)
  }

  const updateMarker = async ({
    id,
    status,
    bounds,
  }: {
    id: string
    status: MarkerStatus
    bounds: IBounds
  }) => {
    try {
      if (bounds?.northEast?.latitude) {
        const result = await api.patch('/spots', { id, status, bounds })
        setMarkers(result.data)
      }
    } catch (error) {
      console.log('ERROR UPDATING MARKER')
    }
  }

  const validateMarker = (id: string) => {
    if (!id) {
      id = selectedMarker?.id
    }
    updateMarker({ id, status: 'validated', bounds })
    changeButtons()
    setSelectedMarker(undefined)
  }
  const invalidateMarker = (id: string) => {
    if (!id) {
      id = selectedMarker?.id
    }
    updateMarker({ id, status: 'invalidated', bounds })
    changeButtons()
    setSelectedMarker(undefined)
  }

  const addSpot = useCallback(async () => {
    if (currentPosition?.latitude && bounds?.northEast?.latitude) {
      try {
        const result = await api.post('/spots', {
          longitude: currentPosition.longitude,
          latitude: currentPosition.latitude,
          bounds,
        })
        setMarkers(result.data)
      } catch (error) {
        console.log(error)
      }
      setShowPositionMarker(false)
      changeButtons()
    } else {
      console.log('Error to add current position')
    }
  }, [currentPosition, bounds])

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
