import { text } from '/styles'

import { MapTypes } from '/utils/typeTools'

const styles = (variables: AllVariablesType) =>
  MapTypes({
    common: {
      container: {
        flexGrow: 1,
        backgroundColor: variables.white_one,
        paddingTop: variables.topSafeArea + variables.marginVertical,
        paddingBottom: variables.bottomSafeArea + variables.marginVertical,
        alignItems: 'stretch',
        justifyContent: 'space-between',
        paddingHorizontal: variables.marginHorizontal,
      },
      loadingText: {
        ...text.headingItalic,
        color: variables.primaryDarkColor,
      },
      mainMessage: {
        ...text.bodyLRegular,
        color: variables.primaryDarkColor,
        textAlign: 'center',
      },
      constants: {},
    },
  })

export default styles
