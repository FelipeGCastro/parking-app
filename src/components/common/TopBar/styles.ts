import { StyleSheet } from 'react-native'
import { variables } from '/styles'

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    backgroundColor: '#fff',
    paddingBottom: 8,
    width: '100%',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  content: {
    alignItems: 'stretch',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  instructionsContainer: {
    backgroundColor: '#C60606',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  instructionsText: {
    fontSize: 13,
    color: '#fff',
  },
})
