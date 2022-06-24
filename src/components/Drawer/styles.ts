import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  userContainer: {
    flexGrow: 1,
    alignSelf: 'center',
    marginBottom: 24,
  },
  userPhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#CECECE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userTextContainer: {
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  userText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#707070',
  },
})
