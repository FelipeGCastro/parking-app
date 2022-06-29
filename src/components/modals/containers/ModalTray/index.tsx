import { BlurView } from 'expo-blur'
import React, { useState, useEffect, useCallback, ReactNode } from 'react'
import { View, TouchableWithoutFeedback } from 'react-native'
import Modal from 'react-native-modal'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { styles } from './styles'

interface IModalTrayProps {
  children: ReactNode
  onClose: () => void
  backgroundColor?: string
  forceClose?: boolean
}

const ModalTray = ({
  children,
  onClose,
  forceClose,
  backgroundColor = '#fff',
}: IModalTrayProps) => {
  const [isVisible, setIsVisible] = useState(true)
  const insets = useSafeAreaInsets()

  useEffect(() => {
    if (forceClose) {
      handleClose()
    }
  }, [forceClose])
  const handleClose = useCallback(() => {
    setIsVisible(false)
  }, [])

  const renderChildren = () => (
    <View
      style={[
        styles.content,
        { backgroundColor, paddingBottom: insets.bottom + 16 },
      ]}>
      <View>
        <View style={styles.handle} />
        <View style={[styles.handleContent, { backgroundColor }]} />
      </View>

      {children}
    </View>
  )

  return (
    <>
      <Modal
        testID="modal"
        isVisible={isVisible}
        backdropOpacity={0}
        hideModalContentWhileAnimating
        onModalHide={onClose}
        onSwipeComplete={handleClose}
        swipeDirection={'down'}
        onBackdropPress={handleClose}
        onAccessibilityEscape={handleClose}
        useNativeDriverForBackdrop
        style={styles.container}
        propagateSwipe={true}>
        {renderChildren()}
      </Modal>
    </>
  )
}
export default ModalTray
