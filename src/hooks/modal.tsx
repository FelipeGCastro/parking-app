import React, { createContext, useContext, useState } from 'react'
import SignIn from '/components/modals/SignIn'

let modals = [
  {
    key: 'SignIn' as const,
    component: SignIn,
  },
]
const keys = modals.map(item => item.key)
interface IModalProps {
  modalName: typeof keys[number]
  modalProps?: {
    [key: string]: any
  }
  onClose?: () => void
}
interface IModalContext {
  openModal: (props: IModalProps) => void
  closeModal: () => void
}

const ModalContext = createContext({} as IModalContext)

export const ModalProvider = ({ children }) => {
  const [selectedModal, setSelectedModal] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalProps, setModalProps] = useState<IModalProps>({} as IModalProps)

  const openModal = (props: IModalProps) => {

    setIsModalOpen(true)
    setSelectedModal(props.modalName)
    setModalProps(props)
  }
  const closeModal = () => {
    setIsModalOpen(false)
  }

  const renderModal = () => {
    const ModalComponent = modals.find(
      modal => modal.key === selectedModal,
    )?.component

    return ModalComponent && isModalOpen ? (
      <ModalComponent
        {...modalProps}
        onClose={() => {
          if (typeof modalProps?.onClose === 'function') {
            modalProps?.onClose()
          }

          closeModal()
        }}
      />
    ) : null
  }

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {renderModal()}
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => {
  const context = useContext(ModalContext)
  return context
}
