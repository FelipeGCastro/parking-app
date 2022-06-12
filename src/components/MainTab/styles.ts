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
    paddingHorizontal: 16,
    flexDirection: 'row',
    paddingTop: 24,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftText: {
    flexShrink: 1,
    color: '#313131',
    fontSize: 16,
    fontWeight: 'bold',
  },
  centered: {
    justifyContent: 'center',
  },
  collapsedContainer: {
    height: 10,
  },
})
