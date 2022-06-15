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
  handleAddSpot: (currentPosition: IPosition) => void
  addMarker: (marker: IMarker) => void
  markers: IMarker[]
  handleAddPosition: () => void
  showPositionMarker: boolean
}
const MarkersContext = createContext({} as IMarkerContext)

export const MarkersProvider = ({ children }) => {
  const [markers, setMarkers] = useState<IMarker[]>([])
  const [showPositionMarker, setShowPositionMarker] = useState(false)
  const { changeButtons } = useMainController()

  const addMarker = (mark: IMarker) => {
    setMarkers(prev => [...prev, mark])
  }

  const handleAddPosition = () => {
    setShowPositionMarker(true)
    changeButtons(addSpotButton)
  }

  const handleAddSpot = useCallback(async currentPosition => {
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

  const addSpotButton: IButton[] = [
    {
      title: 'Marcar espaço disponivel!',
      description: 'Tem aqui um espaço para estacionar',
      onPress: 'handleAddSpot',
      icon: {
        name: 'location',
        color: '#06C615',
      },
    },
  ]

  return (
    <MarkersContext.Provider
      value={{
        handleAddSpot,
        addMarker,
        markers,
        handleAddPosition,
        showPositionMarker,
      }}>
      {children}
    </MarkersContext.Provider>
  )
}

export const useMarkers = () => {
  const context = useContext(MarkersContext)
  return context
}
