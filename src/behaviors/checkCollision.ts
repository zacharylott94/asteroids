import Position from "../dataStructures/position/Position.js"
import Vector from "../dataStructures/vector/Vector.js"

export default function checkCollision(object: ICollidable, otherObject: ICollidable): ICollidable {
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

export const checkCollisionAgainst = <T>(object: ICollidable & T) => <T>(object2: ICollidable & T) => checkCollision(object2, object)