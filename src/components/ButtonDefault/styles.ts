import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: '#F2F2F2',
    flexShrink: 1,
    alignSelf: 'center',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 8,
  },
  textContainer: {},
  textTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  textDescription: {
    fontSize: 12,
    color: '#5F5F5F',
  },
})
