import { getDistance } from 'geolib'
import { IPosition } from '/hooks/markers'

export const validateDistance = (
  from: IPosition,
  to: IPosition,
  distance: number = 100,
) => {
  const distanceVerified = getDistance(
    { latitude: from.latitude, longitude: from.longitude },
    to,
  )

  if (distanceVerified) {
    return distanceVerified < distance
  } else {
    return false
  }
}
