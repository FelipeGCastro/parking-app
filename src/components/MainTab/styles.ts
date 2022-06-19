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
    paddingHorizontal: 10,
    flexDirection: 'row',
    paddingBottom: 24,
    paddingTop: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    marginHorizontal: 4,
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
    height: 0,
    padding: 0,
    paddingBottom: 0,
    paddingTop: 0,
  },
})
