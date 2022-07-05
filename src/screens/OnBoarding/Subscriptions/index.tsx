import React from 'react'
import { Image, ScrollView, Text, View, ViewStyle } from 'react-native'
import Animated, { SlideInLeft, SlideInRight } from 'react-native-reanimated'
import { useTranslate } from 'react-polyglot'
import { styles } from '../styles'
import MarkerIcon from '/components/common/MarkerIcon'
import { variables } from '/styles'
import MapSample from 'assets/images/mapSample.png'
import Icon, { IconNames } from '/components/common/Icon'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
interface IOptions {
  title: string
  price: string
  description: string
  name: IconNames
  size: number
  isRight?: boolean
}

const Subscriptions = ({ page }: { page: number }) => {
  const t = useTranslate()
  const insets = useSafeAreaInsets()
  const safeArea: ViewStyle = {
    paddingTop: insets.top,
    flexGrow: 1,
  }

  const optionsMonthly: IOptions[] = [
    {
      title: 'subscriptionsScreen.subscriptionsOnBoardingTitleOne',
      price: 'subscriptionsScreen.subscriptionsOnBoardingPriceOne',
      description: 'subscriptionsScreen.subscriptionsOnBoardingDescriptionOne',
      name: 'car-side',
      size: 40,
    },
    {
      title: 'subscriptionsScreen.subscriptionsOnBoardingTitleTwo',
      price: 'subscriptionsScreen.subscriptionsOnBoardingPriceTwo',
      description: 'subscriptionsScreen.subscriptionsOnBoardingDescriptionTwo',
      name: 'ios-rocket-sharp',
      size: 50,
    },
  ]
  const optionsDaily: IOptions[] = [
    {
      title: 'subscriptionsScreen.subscriptionsOnBoardingTitleThree',
      price: 'subscriptionsScreen.subscriptionsOnBoardingPriceThree',
      description:
        'subscriptionsScreen.subscriptionsOnBoardingDescriptionThree',
      name: 'car-side',
      size: 40,
      isRight: true,
    },
  ]
  const renderOptions = (
    item: {
      title: string
      price: string
      description: string
      size?: number
      name: IconNames
      isRight?: boolean
    },
    index: number,
  ) => (
    <Animated.View
      entering={
        item.isRight ? SlideInRight.delay(400) : SlideInLeft.delay(index * 150)
      }
      key={index}
      style={styles.contentRow}>
      {item.isRight ? (
        <>
          <View style={[styles.descriptionContainer, styles.alignRight]}>
            <Text style={styles.title}>{t(item.title)} #</Text>
            <Text style={styles.price}>{t(item.price)}</Text>
            <Text style={styles.descriptionSub}>{t(item.description)}</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image style={styles.mapImage} source={MapSample} />
            <View style={styles.markerContainer}>
              <Icon name={item.name} size={item.size} />
            </View>
          </View>
        </>
      ) : (
        <>
          <View style={styles.imageContainer}>
            <Image style={styles.mapImage} source={MapSample} />
            <View style={styles.markerContainer}>
              <Icon name={item.name} size={item.size} />
            </View>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.title}># {t(item.title)}</Text>
            <Text style={styles.price}>{t(item.price)}</Text>
            <Text style={styles.descriptionSub}>{t(item.description)}</Text>
          </View>
        </>
      )}
    </Animated.View>
  )

  return page === 2 ? (
    <ScrollView contentContainerStyle={safeArea}>
      <View style={styles.container}>
        <View style={styles.headerInfo}>
          <Text style={styles.headerOne}>SPOTY</Text>
          <Text style={styles.headerTwo}>{t('subscriptions')}</Text>
        </View>
        <Text style={styles.headerTopic}>{t('monthly')}</Text>
        <View style={styles.optionsContainer}>
          {optionsMonthly.map(renderOptions)}
        </View>
        <Text style={[styles.headerTopic, { alignSelf: 'flex-start' }]}>
          {t('oneDay')}
        </Text>
        <View style={styles.optionsContainer}>
          {optionsDaily.map(renderOptions)}
        </View>
      </View>
    </ScrollView>
  ) : null
}

export default Subscriptions
