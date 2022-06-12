import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'row',
  },
  markerContainer: {
    width: 35,
    height: 35,
    borderRadius: 16,
    borderBottomRightRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerLetter: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
  },
  textContainer: {
    flexShrink: 1,
    width: 35,
    alignSelf: 'flex-start',
    paddingVertical: 2,
    paddingHorizontal: 4,
    backgroundColor: '#fff',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTime: {
    fontSize: 13,
  },
})
