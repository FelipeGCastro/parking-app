import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  userContainer: {
    flexGrow: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    marginTop: 16
  },
  userWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16
  },
  emptyView: {
    width: 35
  },
  userInfoContainer: {
    flexGrow: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signOutButton: {
    width: 35,
    height: 35,
    borderRadius: 23,
    backgroundColor: '#CECECE',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 2.5
  },
  userPhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#CECECE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userTextContainer: {
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  userText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#707070',
  },
  imageContainer: {
    width: 75,
    height: 75,
    borderRadius: 40,
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 40,
  },
})
