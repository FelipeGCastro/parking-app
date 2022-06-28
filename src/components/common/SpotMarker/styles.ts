import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
  },
  content: {
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
    borderBottomLeftRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTime: {
    color: '#313131',
    fontSize: 11,
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
    backgroundColor: '#1A1A1A',
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
    fontWeight: 'bold',
    fontSize: 12,
    color: '#fff',
  },
  detail: {
    width: 16,
    height: 16,
    backgroundColor: '#313131',
    transform: [{ rotate: '45deg' }],
  },
})
