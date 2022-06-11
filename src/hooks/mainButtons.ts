import { IconNames } from 'components/Icon'
import { useEffect, useState } from 'react'

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

export const useMainButtons = () => {
  const [buttons, setButtons] = useState([])
  const [leftText, setLeftText] = useState('Está vendo alguma vaga por perto?')
  useEffect(() => {
    setButtons(otherSpotButton)
  }, [])

  const handleTimerOut = () => {
    setLeftText('')
    setButtons(initialButtons)
  }

  const initialButtons: Button[] = [
    {
      title: 'Estou saindo',
      description: 'Espaço ficará vazio',
      onPress: () => ({}),
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
  return {
    buttons,
    leftText,
  }
}
