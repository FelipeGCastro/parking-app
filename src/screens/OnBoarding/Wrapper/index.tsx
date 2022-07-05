import { LinearGradient } from 'expo-linear-gradient'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { variables } from '/styles'

const Wrapper = ({ children }) => {
  const insets = useSafeAreaInsets()
  const safeAreaBottom: ViewStyle = {
    paddingBottom: insets.bottom,
  }
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        // Background Linear Gradient
        colors={variables.screenGradientOne}
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 1.0, y: 1.0 }}
        style={[styles.gradient, safeAreaBottom]}>
        {children}
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  gradient: {
    flexGrow: 1,
  },
  safeContainer: {
    flexGrow: 1,
  },
})

export default Wrapper
