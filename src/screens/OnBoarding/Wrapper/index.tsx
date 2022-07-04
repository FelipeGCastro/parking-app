import { LinearGradient } from 'expo-linear-gradient'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { variables } from '/styles'

const Wrapper = ({ children }) => {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        // Background Linear Gradient
        colors={variables.screenGradientOne}
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 1.0, y: 1.0 }}
        style={styles.gradient}>
        <SafeAreaView style={styles.safeContainer}>{children}</SafeAreaView>
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
  }
})

export default Wrapper
