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


const checkCollisionAgainstTypes = (type1: ObjectType, type2: ObjectType) => (obj1, obj2) => {
  if ((obj1.type === type1) && (obj2.type === type2)) return checkCollision(obj1, obj2)
  return obj1
}
const resetObject = <T>(obj: T & ICollidable): T & ICollidable => ({ ...obj, hasCollided: false })
const resetCollision = mapper(resetObject)


const checkAsteroidCollisionAgainstProjectiles = reduceMap(checkCollisionAgainstTypes(ObjectType.Asteroid, ObjectType.Projectile))
const checkProjectileCollisionAgainstAsteroids = reduceMap(checkCollisionAgainstTypes(ObjectType.Projectile, ObjectType.Asteroid))
const checkPlayerCollisionAgainstAsteroids = reduceMap(checkCollisionAgainstTypes(ObjectType.Player, ObjectType.Asteroid))

export default {
  reset: resetCollision,
  checkAsteroidAgainstProjectiles: checkAsteroidCollisionAgainstProjectiles,
  checkProjectileAgainstAsteroids: checkProjectileCollisionAgainstAsteroids,
  checkPlayerAgainstAsteroids: checkPlayerCollisionAgainstAsteroids,
}