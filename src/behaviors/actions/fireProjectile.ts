import Position from "../../dataStructures/position/Position.js"
import Projectile from "../../dataStructures/Projectile.js"

export function fireProjectile(objectList) {
  const player = objectList.filter(obj => obj.type === ObjectType.Player)[0]
  const realPlayerPos = Position.real(player.position)
  const rotation = player.rotation
  const playerVelocity = player.velocity
  if (objectList.filter(obj => obj.type === ObjectType.Projectile).length > 2) return objectList
  return objectList.concat(Projectile(realPlayerPos, rotation, playerVelocity))
}

