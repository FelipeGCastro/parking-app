import { useCallback, useEffect, useState } from 'react'
import { useTranslate } from 'react-polyglot'
import { IButton } from './mainController'

export const useButtons = () => {
  const [buttons, setButtons] = useState([])
  const [leftText, setLeftText] = useState('')
  const t = useTranslate()
  useEffect(() => {
    setButtons(initialButtons)
  }, [])

  const handleTimerOut = () => {
    setLeftText('')
    setButtons(initialButtons)
  }


  const initialButtons: IButton[] = [
    {
      title: t('markSpot'),
      description: t('spaceWillBeFree'),
      onPress: 'handleAddPosition',
      icon: {
        name: 'time-to-leave',
        size: undefined,
        color: undefined,
      },
    },
    {
      title: t('direction'),
      description: t('directionToNearest'),
      onPress: 'handleDirection',
      icon: {
        name: 'location',
        size: undefined,
        color: undefined,
      },
    },
  ]

  const addSpotButton: IButton[] = [
    {
      title: t('cancel'),
      description: t('changedMyMind'),
      onPress: 'cancelAddSpot',
      icon: {
        name: 'error-outline',
        color: '#C60606',
      },
    },
    {
      title: t('markSpot'),
      description: t('spotFreeHere'),
      onPress: 'addSpot',
      icon: {
        name: 'location',
        color: '#06C615',
      },
    },
  ]

  const validateAndInvalidate: IButton[] = [
    {
      title: t('invalid'),
      description: t('someoneTookIt'),
      onPress: 'invalidateMarker',
      icon: {
        name: 'error-outline',
        size: undefined,
        color: '#C60606',
      },
    },
    {
      title: t('spotFree'),
      description: t('spotFreeHere'),
      onPress: 'validateMarker',
      icon: {
        name: 'check',
        size: undefined,
        color: '#06C615',
      },
    },
  ]
  const checkSpotButtons: IButton[] = [
    {
      title: t('noSpot'),
      description: t('someoneTookIt'),
      onPress: '',
      icon: {
        name: 'error-outline',
        size: undefined,
        color: '#C60606',
      },
    },
    {
      title: t('wellDone'),
      description: t('thanks'),
      onPress: '',
      icon: {
        name: 'check',
        size: undefined,
        color: '#06C615',
      },
    },
  ]

  const otherSpotButton: IButton[] = [
    {
      title: t('yesICanSee'),
      description: t('nearToMe'),
      onPress: '',
      onTimerOut: handleTimerOut,
      timer: 15,
      icon: {
        name: 'check',
        color: '#06C615',
      },
    },
  ]
  
  const buttonList = {
    initialButtons,
    addSpotButton,
    validateAndInvalidate,
    checkSpotButtons,
    otherSpotButton,
  }
  const changeButtons = useCallback((key: string) => {
    if (!key) {
      setButtons(initialButtons)
      return
    }
    setButtons(buttonList[key] || initialButtons)
  }, [])


  return {
    buttons,
    leftText,
    changeButtons,
  }
}
