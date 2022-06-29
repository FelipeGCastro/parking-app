import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import ModalTray from '../containers/ModalTray'
import Icon from '/components/common/Icon'

// import { Container } from './styles';

const SignIn = ({ onClose }) => {
  return (
    <ModalTray onClose={onClose}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.googleButton}>
          <Icon style={styles.icon} color="#fff" name="google" />
          <Text style={styles.buttonText}>Sign In with Google</Text>
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
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#0673C6',
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
