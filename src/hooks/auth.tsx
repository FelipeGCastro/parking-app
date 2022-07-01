import { createContext, useContext, useEffect, useState } from 'react'
import * as Google from 'expo-auth-session/providers/google'
import { api, setTokenInterceptors } from '/services/api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-toast-message'
import { useTranslate } from 'react-polyglot'
import { Platform } from 'react-native'
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
  const t = useTranslate()
  const android = { androidClientId: process.env.GOOGLE_ID_ANDROID }
  const expo = { expoClientId: process.env.GOOGLE_ID_EXPO, clientSecret: process.env.GOOGLE_SECRET_KEY }
  const ios = { iosClientId: process.env.GOOGLE_ID_IOS  }
  const rightOS = Platform.OS === 'android' ? android : ios
  const client = process.env.ENV === 'development' ? expo : rightOS

  const [request, response, promptAsync] = Google.useAuthRequest({
    scopes: ['email', 'profile'],
    shouldAutoExchangeCode: true,
    ...client
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
          Toast.show({
            text1: t('signInGoogleSuccess'),
            type: 'success',
            autoHide: true,
            visibilityTime: 1000,
          })
          const { user: userInfo, token } = result.data
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
          const err = error?.message || error
          Toast.show({
            text1: err,
            type: 'error',
            autoHide: true,
            visibilityTime: 2000,
          })
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
      await promptAsync()
    } catch (error) {
      console.log(JSON.stringify(error, null, 2))
      const err = error?.message || error
      Toast.show({
        text1: err,
        type: 'error',
        autoHide: true,
        visibilityTime: 2000,
      })
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
