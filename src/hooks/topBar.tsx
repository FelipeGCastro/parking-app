import { createContext, useContext, useState } from 'react'

interface ITopBarContext {
  isOpen: boolean
  handleOpenMarkerOptions: (id: number) => void
}

const TopBarContext = createContext({} as ITopBarContext)

export const TopBarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [markerOptions, setMarkerOptions] = useState(false)

  const handleOpenMarkerOptions = (id: number = 1) => {
    setMarkerOptions(true)
    setIsOpen(true)
  }
  return (
    <TopBarContext.Provider value={{ isOpen, handleOpenMarkerOptions }}>
      {children}
    </TopBarContext.Provider>
  )
}

export const useTopBar = () => {
  const context = useContext(TopBarContext)
  return context
}
