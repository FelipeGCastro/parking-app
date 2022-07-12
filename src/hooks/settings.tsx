import AsyncStorage from '@react-native-async-storage/async-storage'
import { useCallback, useEffect, useState } from 'react'

export const useAppTheme = isDeviceDarkMode => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const useDarkMode = true

  const getAppTheme = useCallback(async () => {
    const settingsOptions = await AsyncStorage.getItem('SETTINGS_OPTIONS')
    const appTheme = JSON.parse(settingsOptions)?.useDarkMode

    setIsDarkMode(appTheme === undefined ? !!isDeviceDarkMode : appTheme)
  }, [isDeviceDarkMode])

  useEffect(() => {
    getAppTheme()
  }, [useDarkMode, getAppTheme])

  return {
    isDarkMode,
  }
}
