import { text } from '/styles'
import { MapTypes } from '/utils/typeTools'

const styles = (variables: AllVariablesType) =>
  MapTypes({
    common: {
      container: {
        flexGrow: 1,
        backgroundColor: variables.white_two,
        alignItems: 'stretch',
        justifyContent: 'space-between',
        paddingHorizontal: variables.marginHorizontal,
        paddingBottom: variables.bottomSafeArea + variables.marginVertical / 2,
        paddingTop: variables.topSafeArea,
      },
      rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      labeText: {
        ...text.bodyLRegular,
        color: variables.primaryDarkColor,
      },
      valueContainer: {
        backgroundColor: variables.white_one,
        alignItems: 'center',
        justifyContent: 'center',
      },
      valueText: {
        ...text.bodySMedium,
        color: variables.primaryTextColor,
      },
      constants: {},
    },
  })

export default styles
