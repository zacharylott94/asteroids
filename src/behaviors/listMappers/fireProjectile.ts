import Position from "../../dataStructures/position/Position.js"
import Projectile from "../../dataStructures/Projectile.js"
import { conditional } from "../../hof/conditional.js"
import { isAsteroid, isPlayerProjectile } from "../../hof/conditions.js"

export function fireProjectile(objectList) {
  const player = objectList.filter(obj => obj.type === ObjectType.Player)[0]
  const realPlayerPos = Position.real?.(player.position)
  const rotation = player.rotation
  const playerVelocity = player.velocity
  if (realPlayerPos) return objectList.concat(Projectile(realPlayerPos, rotation, playerVelocity, isAsteroid, ObjectType.Player))
  return objectList
}

const lessThanThreeProjectiles = objectList => objectList.filter(isPlayerProjectile).length < 3

export const fireProjectileWhenReady = conditional(lessThanThreeProjectiles, fireProjectile)
