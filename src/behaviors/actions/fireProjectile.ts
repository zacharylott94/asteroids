import Position from "../../dataStructures/position/Position.js"
import Projectile from "../../dataStructures/Projectile.js"

export function fireProjectile(objectList) {
  const player = objectList.filter(obj => obj.type === ObjectType.Player)[0]
  const realPlayerPos = Position.real(player.position)
  const rotation = player.rotation
  return objectList.concat(Projectile(realPlayerPos, rotation))
}

