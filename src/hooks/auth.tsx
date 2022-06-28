import { createContext, useContext, useState } from 'react'
import { useTranslate } from 'react-polyglot'

interface IUser {
  latitude: number
  longitude: number
}
interface IAuthContext {}
const AuthContext = createContext({} as IAuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<IUser>(null)
  const t = useTranslate()

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  return context
}
