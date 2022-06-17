import { IconNames } from 'components/Icon'
import { findNearest } from 'geolib'
import { createContext, useContext, useEffect, useState } from 'react'

export interface IButton {
  title: string
  description: string
  onPress:
    | 'handleAddPosition'
    | 'cancelAddSpot'
    | 'invalidateMarker'
    | 'validateMarker'
    | 'addSpot'
    | 'handleDirection'
    | ''
    | (() => void)
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
  status: 'created' | 'invalided' | 'valided'
}
interface IPosition {
  longitude: number
  latitude: number
}
interface IRegion {
  longitude: number
  latitude: number
  longitudeDelta: number
  latitudeDelta: number
}
interface MainContext {
  buttons: IButton[]
  leftText: string
  addCurrentPosition: (position: IRegion) => void
  currentPosition: IRegion
  positionToGo: IPosition
  handleSetPositionToGo: (pos: IPosition) => void
  changeButtons: (buttons?: IButton[]) => void
  destination: IPosition
  handleDirection: (destination: IPosition) => void
  resetDestination: () => void
}

const MainControllerContext = createContext({} as MainContext)

export const MainControllerProvider = ({ children }) => {
  const [buttons, setButtons] = useState([])
  const [leftText, setLeftText] = useState('')
  const [positionToGo, setPositionToGo] = useState<IPosition>({} as IPosition)
  const [currentPosition, setCurrentPosition] = useState<IRegion>({} as IRegion)
  const [destination, setDestination] = useState({} as IPosition)

  useEffect(() => {
    setButtons(initialButtons)
  }, [])

  const handleTimerOut = () => {
    setLeftText('')
    setButtons(initialButtons)
  }

  const changeButtons = (buttons: IButton[]) => {
    if (!buttons) {
      setButtons(initialButtons)
      return
    }
    setButtons(buttons)
  }

  const addCurrentPosition = (pos: IRegion) => {
    setCurrentPosition(pos)
  }

  const handleSetPositionToGo = (pos: IPosition) => {
    setPositionToGo(pos)
  }

  const handleDirection = (destination: IPosition) => {
    if (destination?.latitude) {
      setDestination(destination)
    }
  }
  const resetDestination = () => {
    setDestination({} as IPosition)
  }

  const initialButtons: IButton[] = [
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
      title: 'Direção Auto.',
      description: 'Direção p/ mais próximo',
      onPress: 'handleDirection',
      icon: {
        name: 'location',
        size: undefined,
        color: undefined,
      },
    },
  ]
  const checkSpotButtons: IButton[] = [
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

  const otherSpotButton: IButton[] = [
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

  return (
    <MainControllerContext.Provider
      value={{
        buttons,
        leftText,
        addCurrentPosition,
        currentPosition,
        positionToGo,
        handleSetPositionToGo,
        changeButtons,
        handleDirection,
        destination,
        resetDestination,
      }}>
      {children}
    </MainControllerContext.Provider>
  )
}

export const useMainController = () => {
  const context = useContext(MainControllerContext)
  return context
}
