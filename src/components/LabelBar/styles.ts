import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingBottom: 8,
    width: '100%',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 17.5,
  },
  labelIcon: {
    width: 14,
    height: 14,
    borderRadius: 8,
    marginRight: 4,
  },
  labelConfirmed: {
    backgroundColor: '#06C615',
  },
  labelIndicated: {
    backgroundColor: '#0673C6',
  },
  labelReindicated: {
    backgroundColor: '#C6A606',
  },
  labelText: {
    fontSize: 13,
    color: '#1A1A1A',
  },
})
