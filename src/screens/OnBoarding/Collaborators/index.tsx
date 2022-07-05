import React from 'react'
import { Image, ScrollView, Text, View, ViewStyle } from 'react-native'
import Animated, { SlideInLeft } from 'react-native-reanimated'
import { useTranslate } from 'react-polyglot'
import { styles } from '../styles'
import MarkerIcon from '/components/common/MarkerIcon'
import { variables } from '/styles'
import MapSample from 'assets/images/mapSample.png'
import Icon from '/components/common/Icon'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

// import { Container } from './styles';

const Collaborators = ({ page }: { page: number }) => {
  const t = useTranslate()

  const options = [
    { textOne: 'collaboratorsOnBoardingDescriptionOne', type: 'collab' },
    { textOne: 'collaboratorsOnBoardingDescriptionTwo', type: 'pin' },
  ]
  const insets = useSafeAreaInsets()
  const safeArea: ViewStyle = {
    paddingTop: insets.top,
    flexGrow: 1,
  }

  const renderOptions = (
    item: { textOne: string; type?: string },
    index: number,
  ) => (
    <Animated.View
      entering={SlideInLeft.delay(index * 100)}
      key={index}
      style={styles.contentRow}>
      <View style={styles.imageContainer}>
        <Image style={styles.mapImage} source={MapSample} />
        <View style={styles.markerContainer}>
          {item.type === 'collab' ? (
            <Icon name="male" style={styles.pin} size={50} />
          ) : (
            <MarkerIcon isAdmin style={styles.pin} time="1m" scale={1.5} />
          )}
        </View>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>{t(item.textOne)}</Text>
      </View>
    </Animated.View>
  )
  return page === 1 ? (
    <ScrollView contentContainerStyle={safeArea}>
      <View style={styles.container}>
        <View style={styles.headerInfo}>
          <Text style={styles.headerOne}>SPOTY</Text>
          <Text style={styles.headerTwo}>{t('collaborators')}</Text>
        </View>
        <View style={styles.optionsContainer}>
          {options.map(renderOptions)}
        </View>
        <View style={{ height: 50 }} />
      </View>
    </ScrollView>
  ) : null
}

export default Collaborators
