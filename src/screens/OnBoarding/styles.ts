import { StyleSheet } from 'react-native'
import { text, variables } from '/styles'

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: variables.marginVertical * 1.5,
    paddingHorizontal: variables.marginHorizontal * 1.5,
    justifyContent: 'space-between',
  },
  headerInfo: {},
  headerOne: {
    ...text.heading1,
    color: variables.white_one,
  },
  headerTwo: {
    ...text.headingItalic,
    color: variables.white_one,
    marginBottom: variables.marginVertical * 1.5,
  },
  optionsContainer: {},
  headerTopic: {
    alignSelf: 'flex-end',
    ...text.heading2Italic,
    color: variables.white_one,
    marginBottom: variables.marginVertical,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  imageContainer: {
    width: 130,
    height: 130,
  },
  mapImage: {
    width: 130,
    height: 130,
  },
  markerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pin: { marginBottom: 17 * 1.5 },
  descriptionContainer: {
    marginHorizontal: variables.marginHorizontal,
    flexShrink: 1,
  },
  alignRight: {
    alignItems: 'flex-end',
  },
  description: {
    ...text.bodyLMedium,
    color: variables.white_one,
  },
  descriptionExtra: {
    ...text.bodyXSRegular,
    color: variables.white_one,
  },
  title: {
    ...text.heading2,
    color: variables.white_one,
    marginBottom: variables.marginVertical / 4,
  },
  price: {
    ...text.bodyXLItalic,
    color: variables.white_one,
    marginBottom: variables.marginVertical / 2,
  },
  descriptionSub: {
    ...text.bodySRegular,
    color: variables.white_one,
    flexShrink: 1,
  },
})
