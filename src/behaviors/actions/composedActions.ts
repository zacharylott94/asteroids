import compose from "../../hof/compose.js"
import { conditional } from "../../hof/conditional.js"
import mapper from "../../hof/mapper.js"
import { isMoveable, hasTTL, hasCollided, hasDurability, isCollidedProjectile, durabilityLT1 } from "../../types/typeGuards.js"
import { checkAsteroidCollisionAgainstProjectiles, checkProjectileCollisionAgainstAsteroids, resetCollision } from "../checkCollision.js"
import move from "../move.js"
import tickTTL from "../tickTTL.js"
import removeDeleted from "./removeDeleted.js"

export const moveAllMoveable = mapper(conditional(isMoveable, move))
export const tickAllTTL = mapper(conditional(hasTTL, tickTTL))
export const moveAndTick = compose(moveAllMoveable, tickAllTTL)

const tickDurability = obj => ({ ...obj, durability: obj.durability - 1 })
const tickIfDurability = conditional(hasDurability, tickDurability)
const tickDurabilityIfCollided = mapper(conditional(hasCollided, tickIfDurability))
const flagDelete = obj => ({ ...obj, delete: true })
const deleteIfCollidedProjectile = mapper(conditional(isCollidedProjectile, flagDelete))
const deleteIfNoDurability = mapper(conditional(durabilityLT1, flagDelete))
const resetAccelerating = mapper(conditional(obj => "accelerating" in obj, (obj: any) => ({ ...obj, accelerating: false })))

export const updateObjectList = [
  removeDeleted,
  resetCollision,
  moveAndTick,
  checkAsteroidCollisionAgainstProjectiles,
  checkProjectileCollisionAgainstAsteroids,
  tickDurabilityIfCollided,
  deleteIfCollidedProjectile,
  deleteIfNoDurability,
  resetAccelerating,
].reduce(compose)


