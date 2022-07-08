import { useEffect, useState } from 'react'
import { useMainController } from './mainController'
import { IPosition } from './markers'
import { socket } from '/services/io'
import { isInsideBounds } from '/utils/manipulators'

interface ICollaborator {
  id: string
  longitude: number
  latitude: number
}
export interface ICollaborators {
  [key: string]: ICollaborator
}

export const useCollaborators = () => {
  const [collaborators, setCollaborators] = useState<ICollaborators>({})
  const [newCollaborator, setNewCollaborator] = useState<
    undefined | ICollaborator
  >()
  const { bounds } = useMainController()

  useEffect(() => {
    if (newCollaborator && bounds?.northEast) {
      const isRelevant = isInsideBounds(
        {
          latitude: newCollaborator.latitude,
          longitude: newCollaborator.longitude,
        },
        bounds,
      )
      if (isRelevant) {
        setCollaborators(prev => ({
          ...prev,
          [newCollaborator.id]: newCollaborator,
        }))
      }
      setNewCollaborator(undefined)
    }
  }, [newCollaborator])

  useEffect(() => {
    socket.on(
      'collaboratorsLocation',
      (location: IPosition, userId: string) => {
        setNewCollaborator({ ...location, id: userId })
      },
    )
    socket.on('removeCollaborator', (userId: string) => {
      setCollaborators(prev => {
        delete prev[userId]
        return prev
      })
    })

    return () => {
      socket.off('collaboratorsLocation')
      socket.off('removeCollaborator')
    }
  }, [])

  return {
    collaborators,
  }
}
