import React from 'react'
import { Image, View, Text, TouchableOpacity } from 'react-native'
import { useStylesContext } from 'hooks/styles'
import usePolyglot from 'hooks/polyglot'
import stylesheets from './styles'
import { DrawerScreenProps } from '@react-navigation/drawer'
import Stripe from 'stripe'
import ButtonAction from '/components/common/ButtonAction'
import HeaderDefault from '/components/common/HeaderDefault'
import logo from 'assets/logo.png'
import Icon from '/components/common/Icon'
import { variables } from '/styles'

type RootStackParamList = {
  SubscriptionCheckout: { price: Stripe.Price }
  SubscriptionPayment: { priceId: string }
}
type Props = DrawerScreenProps<RootStackParamList, 'SubscriptionCheckout'>

const SubscriptionCheckout = ({ navigation, route }: Props) => {
  const price = route.params?.price
  const [styles] = useStylesContext(stylesheets)
  const t = usePolyglot('subscriptionCheckout')

  const handleSubscribe = () => {
    navigation.navigate('SubscriptionPayment', {
      priceId: price.id,
    })
  }

  const renderBenefitItem = (text: string) => (
    <View style={styles.benefitItem}>
      <Icon name="check-decagram" color={variables.activeColor} />
      <Text style={styles.benefitText}>{text}</Text>
    </View>
  )
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.logoContainer}>
            <Image source={logo} style={styles.logo} />
            <View>
              <Text style={styles.logoText}>SPOTY</Text>
              <Text style={styles.logoSubText}>PARKING</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={navigation.goBack}
            style={styles.closeButton}>
            <Icon name="close-thick" size={40}></Icon>
          </TouchableOpacity>
        </View>

        <View style={styles.subscriptionInfoContainer}>
          <Text style={styles.subscriptionTitle}>GOLD</Text>
          <Text style={styles.subscriptionSubTitle}>MONTHLY</Text>
          <Text style={styles.subscriptionSteps}>
            To complete the subscription process, please press on subscribe.
          </Text>
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceSymbol}>€</Text>
            <Text style={styles.priceText}>499</Text>
          </View>
          <View style={styles.benefitsContainer}>
            {renderBenefitItem("User's Pins")}
            {renderBenefitItem("Collaborator's Pins")}
            {renderBenefitItem('Cancel anytime')}
            {renderBenefitItem('14 trial')}
          </View>
        </View>
      </View>
      <ButtonAction onPress={handleSubscribe} text={t('subscribe')} />
    </View>
  )
}

export default SubscriptionCheckout
