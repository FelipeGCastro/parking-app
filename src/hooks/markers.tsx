import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { IButton, useMainController } from './mainController'
import { api } from '/services/api'

export type MarkerStatus = 'created' | 'invalided' | 'valided'

interface IPosition {
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
interface IMarkerContext {
  addSpot: () => void
  markers: IMarker[]
  handleAddPosition: () => void
  showValidateAndInvalidate: (id: string) => void
  hideValidateAndInvalidate: () => void
  cancelAddSpot: () => void
  showPositionMarker: boolean
  validateMarker: (id: string) => void
  invalidateMarker: (id: string) => void
  getMarkers: (location?: IPosition) => Promise<void>
  selectedMarker: undefined | string
}
const MarkersContext = createContext({} as IMarkerContext)

export const MarkersProvider = ({ children }) => {
  const [markers, setMarkers] = useState<IMarker[]>([])
  const [showPositionMarker, setShowPositionMarker] = useState(false)
  const [preventDoubleCall, setPreventDoubleCall] = useState(false)
  const [selectedMarker, setSelectedMarker] = useState<undefined | string>()
  const { changeButtons, currentPosition } = useMainController()

  useEffect(() => {
    let valid = true
    function refresh() {
      if (valid) {
        getMarkers()
      }
      setTimeout(refresh, 1000 * 30)
      // ...
    }

    // initial call, or just call refresh directly
    setTimeout(refresh, 1000 * 30)
    return () => {
      valid = false
    }
  }, [])

  const getMarkers = async (location?: IPosition) => {
    try {
      const pos = location?.latitude ? location : currentPosition
      if (pos?.latitude) {
        const result = await api.get('/spots', {
          params: {
            latitude: pos.latitude,
            longitude: pos.longitude,
          },
        })
        setMarkers(result.data)
      }
    } catch (error) {
      console.log('ERROR GETTING SPOTS')
    }
  }

  const handleAddPosition = () => {
    setShowPositionMarker(true)
    changeButtons(addSpotButton)
  }

  const updateMarker = async ({
    id,
    status,
    position,
  }: {
    id: string
    status: MarkerStatus
    position: IPosition
  }) => {
    try {
      const result = await api.patch('/spots', { id, status, position })
      setMarkers(result.data)
    } catch (error) {
      console.log('ERROR UPDATING MARKER')
    }
  }

  const validateMarker = (id: string) => {
    if (!id) {
      id = selectedMarker
    }
    updateMarker({ id, status: 'valided', position: currentPosition })
  }
  const invalidateMarker = (id: string) => {
    if (!id) {
      id = selectedMarker
    }
    updateMarker({ id, status: 'invalided', position: currentPosition })
  }

  const addSpot = useCallback(async () => {
    if (currentPosition?.latitude) {
      try {
        const result = await api.post('/spots', {
          longitude: currentPosition.longitude,
          latitude: currentPosition.latitude,
          position: currentPosition,
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
  }, [currentPosition])

  const hideValidateAndInvalidate = () => {
    if (!preventDoubleCall) {
      setSelectedMarker(undefined)
      changeButtons()
    }
  }

  const showValidateAndInvalidate = (id: string) => {
    setPreventDoubleCall(true)
    setTimeout(() => {
      setPreventDoubleCall(false)
    }, 750)
    setSelectedMarker(id)

    changeButtons(validateAndInvalidate)
  }
  const cancelAddSpot = () => {
    setShowPositionMarker(false)
    changeButtons()
  }

  const addSpotButton: IButton[] = [
    {
      title: 'Cancelar!',
      description: 'Não quero mais!',
      onPress: 'cancelAddSpot',
      icon: {
        name: 'error-outline',
        color: '#C60606',
      },
    },
    {
      title: 'Marcar espaço!',
      description: 'Tem aqui um espaço!',
      onPress: 'addSpot',
      icon: {
        name: 'location',
        color: '#06C615',
      },
    },
  ]

  const validateAndInvalidate: IButton[] = [
    {
      title: 'Invalidar',
      description: 'Alguém já estacionou!',
      onPress: 'invalidateMarker',
      icon: {
        name: 'error-outline',
        size: undefined,
        color: '#C60606',
      },
    },
    {
      title: 'Espaço Vago!',
      description: 'Espaço Livre Aqui!',
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
      }}>
      {children}
    </MarkersContext.Provider>
  )
}

export const useMarkers = () => {
  const context = useContext(MarkersContext)
  return context
}
