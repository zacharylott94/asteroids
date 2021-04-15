//broken
import Position from "../../dataStructures/Position.js"
import Projectile from "../../dataStructures/Projectile.js"

export function fireProjectile(objectList) {
  let player = objectList.player[0]
  let realPlayerPos = Position.real(player.position)
  let rotation = player.rotation
  return {
    ...objectList,
    projectiles: objectList.projectiles.concat(Projectile(realPlayerPos, rotation))
  }
}

