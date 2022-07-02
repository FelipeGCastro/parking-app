import { IconNames } from 'components/common/Icon'
import { createContext, useCallback, useContext, useState } from 'react'
import { useButtons } from './buttons'
import { IBounds } from './markers'

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
interface IDirection {
  destination: IPosition
}
interface MainContext {
  buttons: IButton[]
  leftText: string
  addCurrentPosition: (position: IRegion) => void
  currentPosition: IRegion
  positionToGo: IPosition
  handleSetPositionToGo: (pos: IPosition) => void
  changeButtons: (key?: string) => void
  direction: IDirection
  handleDirection: (destination: IPosition) => void
  resetDestination: () => void
  bounds: IBounds
  addBounds: (bounds: IBounds) => void
}

const MainControllerContext = createContext({} as MainContext)

export const MainControllerProvider = ({ children }) => {
  const [positionToGo, setPositionToGo] = useState<IPosition>({} as IPosition)
  const [currentPosition, setCurrentPosition] = useState<IRegion>({} as IRegion)
  const [direction, setDirection] = useState({} as IDirection)
  const [bounds, setBounds] = useState({} as IBounds)
  const { leftText, changeButtons, buttons } = useButtons()

  const addBounds = useCallback((bounds: IBounds) => {
    setBounds(bounds)
  }, [])

  const addCurrentPosition = useCallback((pos: IRegion) => {
    setCurrentPosition(pos)
  }, [])

  const handleSetPositionToGo = useCallback((pos: IPosition) => {
    setPositionToGo(pos)
  }, [])

  const handleDirection = useCallback((destination: IPosition) => {
    if (destination?.latitude) {
      setDirection({ destination })
    }
  }, [])

  const resetDestination = useCallback(() => {
    setDirection({} as IDirection)
  }, [])

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
        direction,
        resetDestination,
        bounds,
        addBounds,
      }}>
      {children}
    </MainControllerContext.Provider>
  )
}

export const useMainController = () => {
  const context = useContext(MainControllerContext)
  return context
}
