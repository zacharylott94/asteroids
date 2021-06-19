import Position from "../dataStructures/position/Position.js"
import Vector from "../dataStructures/vector/Vector.js"
import mapper from "../hof/mapper.js"
import reduceMap from "../hof/reduceMap.js"

export function checkCollision(object: ICollidable, otherObject: ICollidable): ICollidable {
  if (object === otherObject) return object
  if (object.hasCollided) return object
  const realPosition = Position.real(object.position)
  const closestPosition = Position.closestTo(otherObject.position, realPosition)
  const squaredDistanceBetweenObjects = Vector.distanceSquared(realPosition, closestPosition)
  const summedRadiiOfObjects = object.radius + otherObject.radius
  const squaredRadiiOfObjects = summedRadiiOfObjects * summedRadiiOfObjects
  if (squaredDistanceBetweenObjects <= squaredRadiiOfObjects) return { ...object, hasCollided: true }
  return object
}

const checkCollisionAgainstMask = (obj1, obj2) => {
  if (obj1.isCollidableWith(obj2)) return checkCollision(obj1, obj2)
  return obj1
}
const resetObject = <T>(obj: T & ICollidable): T & ICollidable => ({ ...obj, hasCollided: false })
const resetCollision = mapper(resetObject)

export default {
  reset: resetCollision,
  checkAgainstMask: reduceMap(checkCollisionAgainstMask),
}