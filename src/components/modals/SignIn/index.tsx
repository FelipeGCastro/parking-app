import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useTranslate } from 'react-polyglot'
import ModalTray from '../containers/ModalTray'
import Icon from '/components/common/Icon'
import { useAuth } from '/hooks/auth'

// import { Container } from './styles';

const SignIn = ({ onClose }) => {
  const [forceClose, setForceClose] = useState(false)
  const { signInWithGoogle } = useAuth()
  const t = useTranslate()
  const handleGooglePress = async () => {
    await signInWithGoogle()
    setForceClose(true)
  }
  return (
    <ModalTray onClose={onClose} forceClose={forceClose}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={handleGooglePress}
          style={styles.googleButton}>
          <Icon style={styles.icon} color="#fff" name="google" />
          <Text style={styles.buttonText}>{t('signInGoogle')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.appleButton}>
          <Icon style={styles.icon} color="#fff" name="apple1" />
          <Text style={styles.buttonText}>{t('signInApple')}</Text>
        </TouchableOpacity>
      </View>
    </ModalTray>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    minHeight: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    backgroundColor: '#0673C6',
    borderRadius: 8,
    marginBottom: 24,
  },
  appleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    backgroundColor: '#000',
    borderRadius: 8,
  },
  icon: {
    marginRight: 16,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
})
export default SignIn
