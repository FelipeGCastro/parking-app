import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import Icon from '../Icon'
import { text, variables } from '/styles'

interface Props {
  title: string
  onPress: () => void
}
const HeaderDefault = ({ title, onPress }: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuButton} onPress={onPress}>
        <Icon name="menu" color={variables.secondaryTextColor} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.fakeView} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: variables.marginHorizontal,
  },
  menuButton: {},
  title: {
    ...text.heading2,
    color: variables.secondaryTextColor,
  },
  fakeView: {
    width: 30,
  },
})

export default HeaderDefault
