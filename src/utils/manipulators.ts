import { IBounds, IPosition } from '/hooks/markers'

export const convertArrayToObject = (array, key) => {
  const initialValue = {}
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item,
    }
  }, initialValue)
}

export const isInsideBounds = (pos: IPosition, bounds: IBounds) => {
  return (
    pos.latitude > bounds.southWest.latitude &&
    pos.latitude < bounds.northEast.latitude &&
    pos.longitude > bounds.southWest.longitude &&
    pos.longitude < bounds.northEast.longitude
  )
}
