import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useModal } from '/hooks/modal'
import usePolyglot from '/hooks/polyglot'
import { text, variables } from '/styles'

// import { Container } from './styles';

const SignInCTA = () => {
  const { openModal } = useModal()
  const t = usePolyglot('signInCTA')

  const handlePressSignIn = () => {
    openModal({ modalName: 'SignIn' })
  }
  return (
    <View style={styles.container}>
      <Text style={styles.description}>{t('title')}</Text>
      <TouchableOpacity
        onPress={handlePressSignIn}
        activeOpacity={0.7}
        style={styles.button}>
        <Text style={styles.buttonText}>{t('signIn')}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    ...text.bodyLRegular,
    textAlign: 'center',
    marginBottom: variables.marginVertical,
  },
  button: {
    paddingVertical: variables.marginVertical,
    paddingHorizontal: variables.marginHorizontal * 5,
    backgroundColor: variables.regularColor,
    borderRadius: variables.radiusSmall,
    alignItems: 'center',
  },
  buttonText: {
    ...text.bodyLRegular,
    color: variables.white_one,
  },
})

export default SignInCTA
