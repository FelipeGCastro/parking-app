import React from 'react'
import { Image, Text, View } from 'react-native'
import { useTranslate } from 'react-polyglot'
import Wrapper from '../Wrapper'
import { styles } from './styles'
import MapSample from 'assets/images/mapSample.png'
import MarkerIcon from '/components/common/MarkerIcon'
import { variables } from '/styles'

const Pins = () => {
  const t = useTranslate()

  const options = [
    { textOne: 'pinOnBoardingDescriptionOne' , color: variables.regularColor},
    { textOne: 'pinOnBoardingDescriptionTwo' , color: variables.activeColor},
    {
      textOne: 'pinOnBoardingDescriptionThree',
      extra: 'pinOnBoardingDescriptionThreeExtra', color: variables.inactiveColor
    },
  ]
  const renderOptions = (
    item: { textOne: string; extra?: string; color: string },
    index: number,
  ) => (
    <View style={styles.contentRow}>
      <View style={styles.imageContainer}>
        <Image style={styles.mapImage} source={MapSample} />
        <View style={styles.markerContainer}>
          <MarkerIcon
            style={styles.pin}
            time="1m"
            scale={1.5}
            color={item.color}
          />
        </View>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>{t(item.textOne)}</Text>
        {item.extra && (
          <Text style={styles.descriptionExtra}>{t(item.extra)}</Text>
        )}
      </View>
    </View>
  )
  return (
    <View style={styles.container}>
      <View style={styles.headerInfo}>
        <Text style={styles.headerOne}>SPOTY</Text>
        <Text style={styles.headerTwo}>{t('pins')}</Text>
      </View>
      <View style={styles.optionsContainer}>
      {options.map(renderOptions)}
      </View>
      <View style={{ height: 50 }}  />
    </View>
  )
}

export default Pins
