import { text } from '/styles'
import { MapTypes } from '/utils/typeTools'

const styles = (variables: AllVariablesType) =>
  MapTypes({
    common: {
      buttonDisabled: {
        opacity: 0.3,
      },
      buttonContainer: {
        paddingVertical: variables.marginVertical,
        paddingHorizontal: variables.marginHorizontal,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: variables.mediumGray,
        borderRadius: variables.radiusSmall,
      },
      buttonText: {
        ...text.bodyMRegular,
        color: variables.white_one,
      },
      constants: {},
    },
  })

export default styles
