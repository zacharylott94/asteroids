import Position from "../dataStructures/position/Position.js"
import Projectile from "../dataStructures/Projectile.js"
import { conditional } from "../hof/conditional.js"

export function fireProjectile(objectList) {
  const player = objectList.filter(obj => obj.type === ObjectType.Player)[0]
  const realPlayerPos = Position.real(player.position)
  const rotation = player.rotation
  const playerVelocity = player.velocity
  return objectList.concat(Projectile(realPlayerPos, rotation, playerVelocity))
}

const lessThanThreeProjectiles = objectList => objectList.filter(obj => obj.type === ObjectType.Projectile).length < 3
export const fireProjectileWhenReady = conditional(lessThanThreeProjectiles, fireProjectile)
