import { createContext, useContext, useEffect, useState } from 'react'
import * as Google from 'expo-auth-session/providers/google'
import { api, setTokenInterceptors } from '/services/api'
import AsyncStorage from '@react-native-async-storage/async-storage'
interface User {
  id: number
  name: string
  email: string
  avatarUrl: string | undefined
  token: string
}
interface IAuthContext {
  user: User
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
  getMe: () => Promise<void>
  userStorageloading: boolean
}
const AuthContext = createContext({} as IAuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User>({} as User)
  const [userStorageloading, setUserStorageLoading] = useState(true)
  const userStorageKey = '@spotyparking:user'

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: process.env.GOOGLE_ID_ANDROID,
    iosClientId: process.env.GOOGLE_ID_IOS,
    expoClientId: process.env.GOOGLE_ID_EXPO,
    scopes: ['email', 'profile'],
    clientSecret: process.env.GOOGLE_SECRET_KEY,
    shouldAutoExchangeCode: true,
  })

  useEffect(() => {
    const fetchUserFromApi = async () => {
      const { authentication } = response as {
        authentication: { accessToken: string }
      }
      if (authentication?.accessToken) {
        try {
          const result = await api.post('authenticate', {
            token: authentication?.accessToken,
          })
          const { user: userInfo, token } = result.data
          console.log('userInfo', userInfo)
          const userLogged = {
            id: userInfo.id,
            email: userInfo.email,
            name: userInfo.name,
            avatarUrl: userInfo.avatarUrl,
            token: token,
          }
          setUser(userLogged)
          await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged))
        } catch (error) {
          console.log(error)
        }
      }
    }
    if (response?.type === 'success' && !user.email) {
      fetchUserFromApi()
    }
  }, [response])

  useEffect(() => {
    let validator = true
    setTokenInterceptors(signOut)
    async function loadUserStorageDate() {
      if (validator) {
        const userStoraged = await AsyncStorage.getItem(userStorageKey)
        if (userStoraged && validator) {
          const userLogged = JSON.parse(userStoraged) as User
          setUser(userLogged)
        }
        if (validator) setUserStorageLoading(false)
      }
    }
    loadUserStorageDate()

    return () => {
      validator = false
    }
  }, [])

  async function signInWithGoogle() {
    try {
      promptAsync()
    } catch (error) {
      console.log(JSON.stringify(error, null, 2))
      throw new Error(error as string)
    }
  }

  async function signOut() {
    setUser({} as User)
    await AsyncStorage.clear()
  }

  async function getMe() {
    try {
      const result = await api.get('getme')
      setUser(result.data)
    } catch (error) {
      console.log('GET ME', error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
        userStorageloading,
        signOut,
        getMe,
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  return context
}
