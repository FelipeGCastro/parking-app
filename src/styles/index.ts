import { Dimensions } from 'react-native'

const variablesFunction = () => {
  const screenSize = Dimensions.get('screen')
  const screenWidth = screenSize.width
  const screenHeight = screenSize.height

  return {
    screenWidth,
    screenHeight,
  }
}

export const variables = variablesFunction()
