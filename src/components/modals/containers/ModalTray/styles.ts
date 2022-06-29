import { StyleSheet } from 'react-native'
import { variables } from '/styles'

export const styles = StyleSheet.create({
  container: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  backdropContainer: {
    position: 'absolute',
    top: 30,
    left: 16,
  },
  backdrop: {
    width: variables.screenWidth,
    height: variables.screenHeight,
    backgroundColor: '#fff',
  },
  content: {
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    width: variables.screenWidth,
    backgroundColor: '#fff',
  },
  handle: {
    position: 'absolute',
    top: 8,
    zIndex: 9999,
    width: 48,
    height: 4,
    borderRadius: 16,
    marginBottom: 16 * 0.5,
    alignSelf: 'center',
    backgroundColor: '#707070',
  },
  handleContent: {
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    height: 24,
    width: variables.screenWidth,
  },
})
