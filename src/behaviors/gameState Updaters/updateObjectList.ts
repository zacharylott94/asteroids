import { shatter } from "../../dataStructures/Asteroid.js"

import Collision from "../../engine/Collision.js"
import and from "../../hof/and.js"
import compose from "../../hof/compose.js"
import { conditional } from "../../hof/conditional.js"
import { hasDurability, hasCollided, isPlayer, isAsteroidWithNoDurability, hasAcceleration, isOrePlayerOrProjectile, isProjectile, isOre, isAsteroid } from "../../hof/conditions.js"
import mapper from "../../hof/mapper.js"
import accelerate from "../objectMappers/accelerate.js"
import { rotate } from "../objectMappers/rotate.js"
import moveAllMoveable from "../listMappers/moveAllMoveable.js"
import removeDeleted from "../listMappers/removeDeleted.js"
import tickAllTTL from "../listMappers/tickAllTTL.js"
import or from "../../hof/or.js"



const tickDurability = obj => ({ ...obj, durability: obj.durability - 1 })
const tickIfDurability = conditional(hasDurability, tickDurability)
const tickDurabilityIfCollided = mapper(conditional(hasCollided, tickIfDurability))
const flagDelete = obj => ({ ...obj, delete: true })
const shatterIfNoDurability = compose(
  mapper(conditional(isAsteroidWithNoDurability, (obj: Asteroid): any => shatter(obj))),
  list => list.flat()
)

const resetAcceleration = mapper(conditional(hasAcceleration, (obj: any) => ({ ...obj, acceleration: 0 })))
const resetPlayerAngularVelocity = mapper(conditional(isPlayer, (player: Player) => ({ ...player, angularVelocity: 0 })))
const rotatePlayer = mapper(conditional(isPlayer, rotate))

const deleteIfCollided = mapper(conditional(and(hasCollided, or(isOre, isProjectile)), flagDelete))
const deleteIfPlayerCollidingWithAsteroid = mapper(
  conditional(and(
    isPlayer, player => player.hasCollidedWith.filter(type => type === ObjectType.Asteroid).length > 0
  ),
    flagDelete)
)


export const updateObjectList = [
  removeDeleted,
  Collision.reset,
  moveAllMoveable,
  rotatePlayer,
  resetPlayerAngularVelocity,
  tickAllTTL,
  Collision.checkAgainstMask,
  tickDurabilityIfCollided,
  deleteIfCollided,
  deleteIfPlayerCollidingWithAsteroid,
  shatterIfNoDurability,
  mapper(conditional(hasAcceleration, accelerate)),
  resetAcceleration,
].reduce(compose)


