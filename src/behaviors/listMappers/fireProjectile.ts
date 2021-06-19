import { PlayerProjectile } from "../../dataStructures/Projectile.js"
import and from "../../hof/and.js"
import { conditional } from "../../hof/conditional.js"
import { hasPlayer, isPlayerProjectile } from "../../hof/conditions.js"
import getPlayer from "../listReducers/getPlayer.js"

export function fireProjectile(objectList) {
  const player = getPlayer(objectList)
  return objectList.concat(PlayerProjectile(player))
}

const lessThanThreeProjectiles = objectList => objectList.filter(isPlayerProjectile).length < 3

export const fireProjectileWhenReady = conditional(and(lessThanThreeProjectiles, hasPlayer), fireProjectile)
