import { Dimensions, Platform } from 'react-native'
import { EdgeInsets } from 'react-native-safe-area-context'
const screenSize = Dimensions.get('screen')

export const variables = {
  screenWidth: screenSize.width,
  screenHeight: screenSize.height,
  white_one: '#FFFFFF',
  white_two: '#F2F2F2',
  primaryTextColor: '#707070',
  secondaryTextColor: '#5F5F5F',
  primaryStrongTextColor: '#1A1A1A',
  primaryDarkColor: '#1A1A1A',
  softDarkerGray: '#B2B2B2',
  softGray: '#CECECE',
  mediumGray: '#313131',
  activeColor: '#06C615',
  regularColor: '#0673C6',
  inactiveColor: '#C60606',
  screenGradientOne: ['#06C692', '#0673C6'],

  marginHorizontal: 16,
  marginVertical: 16,
  radiusSmall: 6,
  radiusMedium: 12,
  radiusBig: 16,
  radiusReallyBig: 24,
}

export const sizeVariables = (safeAreaInsets: EdgeInsets) => {
  const screenSize = Dimensions.get('screen')
  const screenWidth = screenSize.width
  const screenHeight = screenSize.height

  const scale = Platform.OS === 'android' ? screenSize.scale : 1

  const topSafeArea = safeAreaInsets.top / scale
  const rightSafeArea = safeAreaInsets.right / scale
  const bottomSafeArea = safeAreaInsets.bottom / scale
  const leftSafeArea = safeAreaInsets.left / scale
  const safeAreaHeight = topSafeArea + bottomSafeArea
  const bottomBarHeight = 50
  const topHeaderHeight = 56

  const contentHeight = screenHeight - safeAreaHeight
  const contentWidth = screenWidth - (rightSafeArea + leftSafeArea)

  return {
    topSafeArea,
    rightSafeArea,
    bottomSafeArea,
    leftSafeArea,
    bottomBarHeight,
    topHeaderHeight,
    contentHeight,
    contentWidth,
    screenSize,
    screenWidth,
    screenHeight,
  }
}

export const allVariables = {
  ...variables,
  ...sizeVariables({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  }),
  // ...lightVariables,
  // ...darkVariables,
}
