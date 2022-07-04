import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import PagerView from 'react-native-pager-view'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Collaborators from './Collaborators'
import Pins from './Pins'
import Subscriptions from './Subscriptions'
import Wrapper from './Wrapper'

export const OnBoarding = () => {
  const insets = useSafeAreaInsets()
  return (
    <Wrapper>
    <PagerView showPageIndicator style={styles.pagerView} initialPage={0}>
      <Pins key="1" />
      <Collaborators key="2" />
      <Subscriptions key="3" />
    </PagerView>
    </Wrapper>
  )
}

const styles = StyleSheet.create({
  pagerView: {
    flexGrow: 1,
  },
})
