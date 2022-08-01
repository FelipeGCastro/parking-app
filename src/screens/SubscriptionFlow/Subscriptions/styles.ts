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
        paddingTop: variables.topSafeArea + variables.marginVertical,
      },
      subscriptionList: {
        marginTop: variables.marginVertical,
      },
      subscriptionTitle: {
        ...text.heading2,
        alignSelf: 'center',
        marginBottom: variables.marginVertical,
        color: variables.primaryTextColor,
      },
      subscriptionContainer: {
        alignItems: 'stretch',
        borderWidth: 1,
        backgroundColor: variables.white_one,
        borderColor: variables.white_two,
        padding: variables.marginVertical,
        borderRadius: variables.radiusMedium,
      },
      subscriptionSelected: {
        borderColor: variables.mediumGray,
      },
      subscriptionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: variables.marginVertical / 1.5,
      },
      periodText: {
        ...text.bodyXLRegular,
        color: variables.softDarkerGray,
      },
      dotContainer: {
        width: 25,
        height: 25,
        borderRadius: variables.radiusBig,
        borderWidth: 2,
        borderColor: variables.softGray,
        alignItems: 'center',
        justifyContent: 'center',
      },
      dotSelected: {
        backgroundColor: variables.mediumGray,
        borderColor: variables.mediumGray,
      },
      dotInner: {
        width: 10,
        height: 10,
        borderRadius: variables.radiusSmall,
        backgroundColor: variables.white_one,
      },
      priceText: {
        ...text.bodyXLRegular,
        color: variables.primaryStrongTextColor,
        marginBottom: variables.marginVertical / 1.5,
      },
      trialContainer: {
        alignSelf: 'flex-start',
        borderRadius: variables.radiusSmall,
        paddingHorizontal: variables.marginHorizontal / 2,
        paddingVertical: variables.marginHorizontal / 4,
        backgroundColor: variables.white_two,
        marginBottom: variables.marginVertical / 1.5,
      },
      trialText: {
        ...text.bodyMRegular,
        color: variables.activeColor,
      },
      footerText: {
        ...text.bodySRegular,
        color: variables.secondaryTextColor,
      },
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
    },
  })

export default styles
