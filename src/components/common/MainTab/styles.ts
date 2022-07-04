import { StyleSheet } from 'react-native'
import { text, variables } from '/styles'

export const styles = StyleSheet.create({
  containerWrapper: {
    flexGrow: 1,
    position: 'absolute',
    bottom: 0,
    // overflow: 'hidden',
    width: '100%',
  },
  container: {
    flexGrow: 1,
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
  alertText: {
    paddingTop: 8,
    ...text.bodyXSRegular,
    color: variables.inactiveColor,
    alignSelf: 'center',
  },
  buttonContainer: {
    flexGrow: 1,
    marginHorizontal: 4,
  },
  leftText: {
    flexShrink: 1,
    color: '#313131',
    ...text.bodyLMedium,
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
