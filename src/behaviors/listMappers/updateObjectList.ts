import { shatter } from "../../dataStructures/Asteroid.js"
import Collision from "../../engine/Collision.js"
import and from "../../hof/and.js"
import compose from "../../hof/compose.js"
import { conditional } from "../../hof/conditional.js"
import { hasDurability, hasCollided, isCollidedProjectile, isPlayer, isAsteroidWithNoDurability } from "../../hof/conditions.js"
import mapper from "../../hof/mapper.js"
import moveAllMoveable from "./moveAllMoveable.js"
import removeDeleted from "./removeDeleted.js"
import tickAllTTL from "./tickAllTTL.js"



const tickDurability = obj => ({ ...obj, durability: obj.durability - 1 })
const tickIfDurability = conditional(hasDurability, tickDurability)
const tickDurabilityIfCollided = mapper(conditional(hasCollided, tickIfDurability))
const flagDelete = obj => ({ ...obj, delete: true })
const deleteIfCollidedProjectile = mapper(conditional(isCollidedProjectile, flagDelete))
const deleteIfCollidedPlayer = mapper(conditional(and(isPlayer, obj => obj.hasCollided), flagDelete))
const shatterIfNoDurability = compose(
  mapper(conditional(isAsteroidWithNoDurability, (obj: Asteroid): any => shatter(obj))),
  list => list.flat()
)

const resetAccelerating = mapper(conditional(obj => "accelerating" in obj, (obj: any) => ({ ...obj, accelerating: false })))


export const updateObjectList = [
  removeDeleted,
  Collision.reset,
  moveAllMoveable,
  tickAllTTL,
  Collision.checkAgainstMask,
  tickDurabilityIfCollided,
  deleteIfCollidedProjectile,
  deleteIfCollidedPlayer,
  shatterIfNoDurability,
  resetAccelerating,
].reduce(compose)


