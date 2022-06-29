import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useTranslate } from 'react-polyglot'
import ModalTray from '../containers/ModalTray'
import Icon from '/components/common/Icon'

// import { Container } from './styles';

const SignIn = ({ onClose }) => {
  const t = useTranslate()
  return (
    <ModalTray onClose={onClose}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.googleButton}>
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
