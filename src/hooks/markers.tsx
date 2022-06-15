import { createContext, useCallback, useContext, useState } from 'react'
import { IButton, useMainController } from './mainController'
import { api } from '/services/api'

export type MarkerStatus = 'created' | 'invalided' | 'valided'

interface IPosition {
  longitude: number
  latitude: number
}
interface IMarker {
  longitude: number
  latitude: number
  status: MarkerStatus
}
interface IMarkerContext {
  addSpot: () => void
  addMarker: (marker: IMarker) => void
  markers: IMarker[]
  handleAddPosition: () => void
  showValidateAndInvalidate: () => void
  showPositionMarker: boolean
  validateMarker: (id: number) => void
  invalidateMarker: (id: number) => void
}
const MarkersContext = createContext({} as IMarkerContext)

export const MarkersProvider = ({ children }) => {
  const [markers, setMarkers] = useState<IMarker[]>([])
  const [showPositionMarker, setShowPositionMarker] = useState(false)
  const { changeButtons, currentPosition } = useMainController()

  const addMarker = (mark: IMarker) => {
    setMarkers(prev => [...prev, mark])
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
    id: number
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

  const validateMarker = (id: number) => {
    updateMarker({ id, status: 'valided', position: currentPosition })
  }
  const invalidateMarker = (id: number) => {
    updateMarker({ id, status: 'invalided', position: currentPosition })
  }

  const addSpot = useCallback(async () => {
    if (currentPosition?.latitude) {
      try {
        const result = await api.post('/spots', {
          longitude: currentPosition.longitude,
          latitude: currentPosition.latitude,
        })
        console.log('result markers:', result.data)
        addMarker({ status: 'created', ...currentPosition })

        console.log('result', result.data)
      } catch (error) {
        console.log(error)
      }
      setShowPositionMarker(false)
      changeButtons()
    } else {
      console.log('Error to add current position')
    }
  }, [])

  const showValidateAndInvalidate = () => {
    changeButtons(validateAndInvalidate)
  }

  const addSpotButton: IButton[] = [
    {
      title: 'Marcar espaço disponivel!',
      description: 'Tem aqui um espaço para estacionar',
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
      onPress: '',
      icon: {
        name: 'error-outline',
        size: undefined,
        color: '#C60606',
      },
    },
    {
      title: 'Espaço Vago!',
      description: 'Espaço Livre Aqui!',
      onPress: '',
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
        addMarker,
        markers,
        handleAddPosition,
        showPositionMarker,
        validateMarker,
        invalidateMarker,
        showValidateAndInvalidate,
      }}>
      {children}
    </MarkersContext.Provider>
  )
}

export const useMarkers = () => {
  const context = useContext(MarkersContext)
  return context
}
