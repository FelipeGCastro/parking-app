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
        paddingBottom: variables.bottomSafeArea + variables.marginVertical,
        paddingTop: variables.topSafeArea + variables.marginVertical,
      },
      firstBlock: {},
      rowsContainer: {
        paddingTop: variables.marginVertical,
      },
      buttonsContainer: {},
      rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: variables.marginVertical / 2,
        borderBottomWidth: 0.5,
        borderBottomColor: variables.softGray,
      },
      labeText: {
        ...text.bodyMRegular,
        color: variables.primaryDarkColor,
      },
      valueContainer: {
        backgroundColor: variables.white_one,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: variables.marginVertical / 4,
        paddingHorizontal: variables.marginVertical / 2,
        borderRadius: variables.radiusSmall,
      },
      valueText: {
        ...text.bodySMedium,
        color: variables.primaryTextColor,
      },
      constants: {},
    },
  })

export default styles
