import { StyleSheet } from 'react-native'
import { text, variables } from '/styles'

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
  },
  containerOptions: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    borderRadius: 10,
    backgroundColor: '#313131',
    padding: 8,
    flexDirection: 'row',
    marginBottom: -8,
  },
  buttonInvalid: {
    backgroundColor: '#5F5F5F',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 5,
    width: 95,
  },
  buttonValid: {
    backgroundColor: variables.primaryDarkColor,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 5,
    width: 95,
  },
  buttonText: {
    marginTop: 2,
    ...text.bodyXSMedium,
    color: variables.white_one,
  },
  detail: {
    width: 16,
    height: 16,
    backgroundColor: '#313131',
    transform: [{ rotate: '45deg' }],
  },
})
