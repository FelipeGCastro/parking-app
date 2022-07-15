import { text } from '/styles'
import { MapTypes } from '/utils/typeTools'

const styles = (variables: AllVariablesType) =>
  MapTypes({
    common: {
      container: {
        flexGrow: 1,
        backgroundColor: variables.white_two,
        paddingTop: variables.topSafeArea + variables.marginVertical / 2,
        paddingBottom: variables.bottomSafeArea,
        justifyContent: 'space-between',
        paddingHorizontal: variables.marginHorizontal,
      },
      contentContainer: {},
      headerContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
      },
      logoContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
      },
      logo: {
        width: 45,
        height: 45,
        marginBottom: variables.marginVertical / 2,
      },
      logoText: {
        ...text.heading1,
        color: variables.secondaryTextColor,
        marginLeft: variables.marginHorizontal / 2,
      },
      logoSubText: {
        ...text.bodyLItalic,
        color: variables.secondaryTextColor,
        marginTop: -5,
        letterSpacing: variables.marginVertical / 8,
        marginLeft: variables.marginHorizontal / 1.5,
      },
      closeButton: {
        padding: 10,
      },
      subscriptionInfoContainer: {
        marginTop: variables.marginVertical * 2,
        marginBottom: variables.marginVertical * 1.5,
      },
      subscriptionTitle: {
        ...text.headingXL,
        color: variables.mediumGray,
      },
      subscriptionSubTitle: {
        ...text.headingXLItalic,
        color: variables.mediumGray,
        marginBottom: variables.marginVertical / 1.5,
      },
      subscriptionSteps: {
        ...text.bodyXLRegular,
        color: variables.secondaryTextColor,
        marginBottom: variables.marginVertical / 3,
      },
      cardContainer: {
        padding: variables.marginHorizontal,
        borderWidth: 1.5,
        borderColor: variables.softGray,
        borderRadius: variables.radiusBig,
      },
      priceContainer: {
        flexDirection: 'row',
        marginBottom: variables.marginVertical / 2,
      },
      priceSymbol: {
        ...text.heading1,
        color: variables.secondaryTextColor,
      },
      priceText: {
        ...text.headingXL,
        color: variables.primaryDarkColor,
      },
      benefitsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
      benefitItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: variables.marginHorizontal / 2,
        paddingRight: variables.marginHorizontal,
      },
      benefitText: {
        ...text.bodyLRegular,
        color: variables.primaryTextColor,
        marginLeft: variables.marginHorizontal / 2,
      },
      constants: {},
    },
  })

export default styles
