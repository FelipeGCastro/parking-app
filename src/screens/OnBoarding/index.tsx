import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import PagerView from 'react-native-pager-view'
import { useTranslate } from 'react-polyglot'
import Collaborators from './Collaborators'
import PageController from './PageController'
import Pins from './Pins'
import Subscriptions from './Subscriptions'
import Wrapper from './Wrapper'

export const OnBoarding = ({ navigation }) => {
  const [page, setPage] = useState(0)
  const pagerRef = useRef<PagerView>(null)
  const t = useTranslate()

  useEffect(() => {
    ;(async () => {
      AsyncStorage.setItem('@spotyparking:instructions', 'saw')
    })()
  }, [])

  const handleBackPage = () => {
    if (page > 0) {
      setPage(prev => {
        pagerRef.current.setPage(prev - 1)
        return prev - 1
      })
    }
  }

  const handleNext = () => {
    if (page < 2) {
      setPage(prev => {
        pagerRef.current.setPage(prev + 1)
        return prev + 1
      })
    } else {
      navigation.navigate('Home')
    }
  }
  const renderPins = () => (
    <View key="1" style={styles.pageContainer}>
      <Pins page={page} />
    </View>
  )
  const renderCollaborators = () => (
    <View key="2" style={styles.pageContainer}>
      <Collaborators page={page} />
    </View>
  )
  const renderSubscriptions = () => (
    <View key="3" style={styles.pageContainer}>
      <Subscriptions page={page} />
    </View>
  )
  return (
    <Wrapper>
      <PagerView
        ref={pagerRef}
        onPageSelected={event => setPage(event.nativeEvent.position)}
        style={styles.pagerView}
        initialPage={0}>
        {renderPins()}
        {renderCollaborators()}
        {renderSubscriptions()}
      </PagerView>
      <PageController
        page={page}
        leftButtonLabel={page > 0 && t('back')}
        leftButtonPress={handleBackPage}
        rightButtonLabel={page === 2 ? t('continue') : t('next')}
        rightButtonPress={handleNext}
      />
    </Wrapper>
  )
}

const styles = StyleSheet.create({
  pagerView: {
    flexGrow: 1,
  },
  pageContainer: {
    flexGrow: 1,
  },
})
