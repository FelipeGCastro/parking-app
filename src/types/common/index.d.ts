type ConstantsType = { [key: string]: any }
type StyleConstants = { constants?: ConstantsType }

type StylesProps =
  | import('react-native').TextStyle
  | import('react-native').ViewStyle
  | (import('react-native').ImageStyle & ConstantsType)

type SpecialKey = { [key: string | 'constants']: StylesProps }

type BreakPointType = 'phonePortrait' | 'tabletPortrait' | 'tabletLandscape'

type StyleSheetTypeHook = SpecialKey
// interface StyleSheetTypeHook extends StyleConstants {
//         [key: string]: StylesProps
// }
interface IStyles {
  common: StyleSheetTypeHook
  phonePortrait?: StyleSheetTypeHook
  tabletPortrait?: StyleSheetTypeHook
  tabletLandscape?: StyleSheetTypeHook
}

type AllVariablesType = typeof import('styles/variables').allVariables

declare module '*.png' {
  const value: any
  export = value
}
