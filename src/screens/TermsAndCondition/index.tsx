import React from 'react'
import { StyleSheet, View } from 'react-native'
import WebView from 'react-native-webview'

const TermsAndCondition = () => {
  return (
    <WebView
      style={styles.container}
      contentMode="mobile"
      showsVerticalScrollIndicator={false}
      source={{ uri: 'https://spotyparking.netlify.app/policy_privacy.html' }}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: '100%',
    height: '100%',
  },
})

export default TermsAndCondition
