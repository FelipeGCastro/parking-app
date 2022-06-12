import { IconNames } from 'components/Icon'
import { createContext, useContext, useEffect, useState } from 'react'

interface Button {
  title: string
  description: string
  onPress: () => void
  timer?: number
  onTimerOut?: () => void
  icon: {
    name: IconNames
    size?: number
    color?: string
  }
}

interface MainContext {
  buttons: Button[]
  leftText: string
  showPositionMarker: boolean
}

const MainControllerContext = createContext({} as MainContext)

export const MainControllerProvider = ({ children }) => {
  const [buttons, setButtons] = useState([])
  const [leftText, setLeftText] = useState('')
  const [showPositionMarker, setShowPositionMarker] = useState(false)
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

  const initialButtons: Button[] = [
    {
      title: 'Estou saindo',
      description: 'Espaço ficará vazio',
      onPress: handleAddPosition,
      icon: {
        name: 'time-to-leave',
        size: undefined,
        color: undefined,
      },
    },
    {
      title: 'Ir Mais Próximo',
      description: 'Direções automáticas',
      onPress: () => ({}),
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
      onPress: () => ({}),
      icon: {
        name: 'error-outline',
        size: undefined,
        color: '#C60606',
      },
    },
    {
      title: 'Fixe, deu certo!',
      description: 'Obrigado!',
      onPress: () => ({}),
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
      onPress: () => ({}),
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
      onPress: () => ({}),
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
      }}>
      {children}
    </MainControllerContext.Provider>
  )
}

export const useMainController = () => {
  const context = useContext(MainControllerContext)
  return context
}
