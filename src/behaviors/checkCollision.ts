import Position from "../gameObjects/Position.js"
import Vector from "../gameObjects/Vector.js"

export default function checkCollision(object: ICollidable, otherObject: ICollidable): boolean {
  const realPosition = Position.real(object.position)
  const closestPosition = Position.closestTo(otherObject.position, realPosition)
  const squaredDistanceBetweenObjects = Vector.distanceSquared(realPosition, closestPosition)
  const summedRadiiOfObjects = object.radius + otherObject.radius
  const squaredRadiiOfObjects = summedRadiiOfObjects * summedRadiiOfObjects
  if (squaredDistanceBetweenObjects <= squaredRadiiOfObjects) return true
  return false
}