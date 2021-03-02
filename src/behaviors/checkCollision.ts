import Position from "../dataStructures/Position.js"
import Vector from "../dataStructures/Vector.js"

export default function checkCollision(object: ICollidable, otherObject: ICollidable): boolean {
  if (object === otherObject) return false
  const realPosition = Position.real(object.position)
  const closestPosition = Position.closestTo(otherObject.position, realPosition)
  const squaredDistanceBetweenObjects = Vector.distanceSquared(realPosition, closestPosition)
  const summedRadiiOfObjects = object.radius + otherObject.radius
  const squaredRadiiOfObjects = summedRadiiOfObjects * summedRadiiOfObjects
  if (squaredDistanceBetweenObjects <= squaredRadiiOfObjects) return true
  return false
}