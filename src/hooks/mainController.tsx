import { IconNames } from 'components/Icon'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

interface Button {
  title: string
  description: string
  onPress: string
  timer?: number
  onTimerOut?: () => void
  icon: {
    name: IconNames
    size?: number
    color?: string
  }
}

interface IMarker {
  position: {
    longitude: number
    latitude: number
  }
  type: string
}
interface IPosition {
  longitude: number
  latitude: number
  longitudeDelta: number
  latitudeDelta: number
}
interface MainContext {
  buttons: Button[]
  leftText: string
  showPositionMarker: boolean
  addMarker: (marker: IMarker) => void
  markers: IMarker[]
  addCurrentPosition: (position: IPosition) => void
  currentPosition: IPosition
  handleAddPosition: () => void
  handleAddSpot: () => void
}

const MainControllerContext = createContext({} as MainContext)

export const MainControllerProvider = ({ children }) => {
  const [buttons, setButtons] = useState([])
  const [leftText, setLeftText] = useState('')
  const [showPositionMarker, setShowPositionMarker] = useState(false)
  const [markers, setMarkers] = useState<IMarker[]>([])
  const [currentPosition, setCurrentPosition] = useState<IPosition>(
    {} as IPosition,
  )

  const addMarker = (mark: IMarker) => {
    setMarkers(prev => [...prev, mark])
  }

  useEffect(() => {
    setButtons(initialButtons)
  }, [])

  const handleTimerOut = () => {
    setLeftText('')
    setButtons(initialButtons)
  }

  const handleAddPosition = () => {
    setShowPositionMarker(true)
    setButtons(addSpotButton)
  }

  const handleAddSpot = useCallback(() => {
    if (currentPosition?.latitude) {
      addMarker({ type: '', position: currentPosition })
      setShowPositionMarker(false)
      setButtons(initialButtons)
    } else {
      console.log('Error to add current position')
    }
  }, [currentPosition])

  const addCurrentPosition = (pos: IPosition) => {
    setCurrentPosition(pos)
  }

  const initialButtons: Button[] = [
    {
      title: 'Estou saindo',
      description: 'Espaço ficará vazio',
      onPress: 'handleAddPosition',
      icon: {
        name: 'time-to-leave',
        size: undefined,
        color: undefined,
      },
    },
    {
      title: 'Ir Mais Próximo',
      description: 'Direções automáticas',
      onPress: '',
      icon: {
        name: 'location',
        size: undefined,
        color: undefined,
      },
    },
  ]
  const checkSpotButtons: Button[] = [
    {
      title: 'Oh não, já não há!',
      description: 'Alguém já estacionou!',
      onPress: '',
      icon: {
        name: 'error-outline',
        size: undefined,
        color: '#C60606',
      },
    },
    {
      title: 'Fixe, deu certo!',
      description: 'Obrigado!',
      onPress: '',
      icon: {
        name: 'check',
        size: undefined,
        color: '#06C615',
      },
    },
  ]
  const otherSpotButton: Button[] = [
    {
      title: 'Sim, estou a ver!',
      description: 'Bem perto',
      onPress: '',
      onTimerOut: handleTimerOut,
      timer: 15,
      icon: {
        name: 'check',
        color: '#06C615',
      },
    },
  ]
  const addSpotButton: Button[] = [
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
    <MainControllerContext.Provider
      value={{
        buttons,
        leftText,
        showPositionMarker,
        addMarker,
        markers,
        addCurrentPosition,
        currentPosition,
        handleAddPosition,
        handleAddSpot,
      }}>
      {children}
    </MainControllerContext.Provider>
  )
}

export const useMainController = () => {
  const context = useContext(MainControllerContext)
  return context
}
