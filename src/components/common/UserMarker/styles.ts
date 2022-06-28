import { StyleSheet } from 'react-native'

const scale = 0.8

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  upPart: {
    width: 35 * scale,
    height: 29 * scale,
    paddingVertical: 3 * scale,
    paddingHorizontal: 3 * scale,
    backgroundColor: '#0673C6',
    borderWidth: 1 * scale,
    borderColor: '#fff',
    marginBottom: -7 * scale,
    borderRadius: 6 * scale,
    zIndex: 5,
    alignItems: 'stretch',
  },
  glassPart: {
    alignSelf: 'center',
    width: 26 * scale,
    height: 10 * scale,
    borderRadius: 6 * scale,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: '#fff',
  },
  lightContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 3 * scale,
  },
  light: {
    width: 6 * scale,
    height: 6 * scale,
    borderRadius: 3 * scale,
    backgroundColor: '#FFFF00',
  },
  wheelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
    paddingHorizontal: 1 * scale,
  },
  wheels: {
    width: 10 * scale,
    height: 14 * scale,
    borderRadius: 6 * scale,
    borderWidth: 1 * scale,
    borderColor: '#fff',
    backgroundColor: '#313131',
  },
})
