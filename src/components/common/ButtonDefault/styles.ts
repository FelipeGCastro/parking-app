import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F2F2',
    flexShrink: 0,
    alignSelf: 'center',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    height: 65,
  },
  contentContainer: {
    flexGrow: 1,
    flexDirection: 'row',
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
  paddingBottomZero: {
    paddingBottom: 2,
  },
  disabled: {
    opacity: 0.2,
  },
  timerContainer: {
    marginTop: 8,
    height: 6,
    borderRadius: 3,
    width: '100%',
  },
  timerValue: {
    height: 6,
    borderRadius: 3,
    width: '100%',
    backgroundColor: '#707070',
  },
})
