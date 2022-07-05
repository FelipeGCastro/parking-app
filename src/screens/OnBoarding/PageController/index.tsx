import React, { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import Animated, { Layout } from 'react-native-reanimated'
import RoundedButton from '../RoundedButton'
import Icon from '/components/common/Icon'
import { variables } from '/styles'

interface PageControllerProps {
  backgroundColor?: string
  leftButtonLabel?: string
  leftButtonPress?: () => void
  rightButtonLabel?: string
  rightButtonPress?: () => void
  page: number
}

const PageController = ({
  backgroundColor,
  leftButtonLabel,
  leftButtonPress,
  rightButtonLabel,
  rightButtonPress,
  page,
}: PageControllerProps) => {
  const carLocation = useMemo(() => {
    return {
      0: 'flex-start',
      1: 'center',
      2: 'flex-end',
    }
  }, [page])

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
        },
      ]}>
      {leftButtonLabel && (
        <RoundedButton label={leftButtonLabel} onPress={leftButtonPress} />
      )}
      <Animated.View layout={Layout.duration(1000)} style={[styles.carPath, { alignItems: carLocation[page] }]}>
        <Animated.View layout={Layout.duration(1000)}>
          <Icon name="car-side" color="rgba(255,255,255,0.8)" />
        </Animated.View>
      </Animated.View>
      <RoundedButton label={rightButtonLabel} onPress={rightButtonPress} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    opacity: 0.6,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: variables.marginHorizontal * 1.5,
    paddingVertical: variables.marginVertical / 2,
  },
  fakeSpace: {
    width: 40,
  },
  carPath: {
    flexGrow: 1,
    borderBottomColor: 'rgba(255,255,255,0.8)',
    borderBottomWidth: 2,
    marginHorizontal: 10,
  },
})

export default PageController
