import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    position: 'absolute',
    bottom: 0,
    // overflow: 'hidden',
    width: '100%',
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    backgroundColor: '#fff',
  },
  content: {
    paddingVertical: 16,
  },
  collapsedContainer: {
    height: 10,
  },
})
