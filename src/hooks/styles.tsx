import React, {
  useState,
  useMemo,
  useCallback,
  useContext,
  ReactNode,
  useEffect,
} from 'react'
import { StyleSheet } from 'react-native'
import { useDarkMode } from 'react-native-dynamic'
import * as ScreenOrientation from 'expo-screen-orientation'
import { useAppTheme } from 'hooks/settings'
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context'
import { sizeVariables, variables as variablesCommon } from 'styles/variables'

const getOrientation = async () => {
  const orientation = await ScreenOrientation.getOrientationAsync()

  return orientation === ScreenOrientation.Orientation.PORTRAIT_UP ||
    orientation === ScreenOrientation.Orientation.PORTRAIT_DOWN ||
    orientation === ScreenOrientation.Orientation.UNKNOWN
    ? 'portrait'
    : 'landscape'
}

const useVariables = (isDarkMode: boolean, safeAreaInsets: EdgeInsets) => {
  const variables = {
    ...variablesCommon,
    ...sizeVariables(safeAreaInsets),
    // ...(isDarkMode ? darkVariables : lightVariables),
  }

  return variables
}

type IStylesContext<T, P, R> = (
  stylesheets: StylesGenericType<T, P, R>,
  tenantVariables?: any,
) => [P, R, unknown, unknown]
//@ts-ignore
const StylesContext = React.createContext({} as IStylesContext<T, P, R>)

interface IStylesProviderContext {
  children: ReactNode
}

export const StylesProvider = ({ children }: IStylesProviderContext) => {
  const isDeviceDarkMode = useDarkMode()
  const { isDarkMode } = useAppTheme(!!isDeviceDarkMode)

  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>(
    'portrait',
  )
  const safeAreaInsets = useSafeAreaInsets()

  useEffect(() => {
    const getOrientationLocal = async () => {
      const orientationlocal = await getOrientation()
      setOrientation(orientationlocal)
    }
    getOrientationLocal()
  }, [])

  const styleVariables = useVariables(isDarkMode, safeAreaInsets)
  const breakpoint = useMemo(() => {
    return 'phonePortrait'
  }, [orientation])

  const stylesParser = useCallback(
    (stylesheets, tenantVariables) => {
      const styles = stylesheets
        ? stylesheets(styleVariables, tenantVariables)
        : {}
      const mergedStyles = { ...styles.common, ...styles[breakpoint] }
      const { constants, ...stylesheetStyles } = mergedStyles

      return [
        StyleSheet.create(stylesheetStyles),
        constants,
        breakpoint,
        isDarkMode,
      ]
    },
    [styleVariables, breakpoint],
  )

  return (
    //@ts-ignore
    <StylesContext.Provider value={stylesParser}>
      {children}
    </StylesContext.Provider>
  )
}

interface StylesGenericType<T, P, R> {
  (a: T): { common: { constants: R } | P }
}

export const useStylesContext = <T, P, R>(
  stylesheets: StylesGenericType<T, P, R>,
): [P, R, unknown, unknown] => {
  const stylesParser = useContext(StylesContext)

  return stylesParser(stylesheets)
}
