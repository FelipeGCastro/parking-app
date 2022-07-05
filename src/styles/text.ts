import { StyleSheet } from 'react-native'

const fonts = {
  textLightItalic: 'Roboto_300Light_Italic',
  textRegular: 'Roboto_400Regular',
  textBold: 'Roboto_700Bold',
}
export const text = StyleSheet.create({
  heading1: {
    fontFamily: fonts.textBold,
    fontSize: 35,
  },
  headingItalic: {
    fontFamily: fonts.textLightItalic,
    fontSize: 35,
  },
  heading2Italic: {
    fontFamily: fonts.textLightItalic,
    fontSize: 25,
  },
  heading2: {
    fontFamily: fonts.textBold,
    fontSize: 26,
  },
  bodyXLItalic: {
    fontFamily: fonts.textLightItalic,
    fontSize: 22,
  },
  bodyXLMedium: {
    fontFamily: fonts.textBold,
    fontSize: 22,
  },
  bodyXLRegular: {
    fontFamily: fonts.textRegular,
    fontSize: 22,
  },
  bodyLMedium: {
    fontFamily: fonts.textBold,
    fontSize: 18,
  },
  bodyLRegular: {
    fontFamily: fonts.textRegular,
    fontSize: 18,
  },
  bodyMMedium: {
    fontFamily: fonts.textBold,
    fontSize: 16,
  },
  bodyMRegular: {
    fontFamily: fonts.textRegular,
    fontSize: 16,
  },
  bodySMedium: {
    fontFamily: fonts.textBold,
    fontSize: 14,
  },
  bodySRegular: {
    fontFamily: fonts.textRegular,
    fontSize: 14,
  },
  bodyXSMedium: {
    fontFamily: fonts.textBold,
    fontSize: 12,
  },
  bodyXSRegular: {
    fontFamily: fonts.textRegular,
    fontSize: 12,
  },
  bodyMItalic: {
    fontFamily: fonts.textLightItalic,
    fontSize: 16,
  },
  bodySItalic: {
    fontFamily: fonts.textLightItalic,
    fontSize: 14,
  },
  bodyXSItalic: {
    fontFamily: fonts.textLightItalic,
    fontSize: 12,
  },
})
