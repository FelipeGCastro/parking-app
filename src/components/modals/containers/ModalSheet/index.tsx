import React, { useState, useEffect, useCallback, ReactNode } from 'react'
import { StyleSheet } from 'react-native'
import Modal from 'react-native-modal'

interface IModalSheetProps {
  onClose: () => void
  forceClose?: boolean
  children: ReactNode
}

const ModalSheet = ({ forceClose, onClose, children }: IModalSheetProps) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (forceClose) {
      handleClose()
    }
  }, [forceClose])

  const handleClose = useCallback(() => {
    setVisible(false)
  }, [])

  return (
    <Modal
      isVisible={visible}
      hasBackdrop={false}
      presentationStyle="formSheet"
      onModalHide={onClose}
      useNativeDriver
      hideModalContentWhileAnimating
      transparent={false}
      style={styles.container}>
      {children}
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 0,
  },
})

export default ModalSheet
