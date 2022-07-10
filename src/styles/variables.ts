import { Dimensions } from 'react-native'

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
