import compose from "../../hof/compose.js"
import { conditional } from "../../hof/conditional.js"
import mapper from "../../hof/mapper.js"
import { isMoveable, hasTTL } from "../../types/typeGuards.js"
import { checkAsteroidCollisionAgainstProjectiles, checkProjectileCollisionAgainstAsteroids, resetCollision } from "../checkCollision.js"
import move from "../move.js"
import tickTTL from "../tickTTL.js"
import removeDeleted from "./removeDeleted.js"

export const moveAllMoveable = mapper(conditional(isMoveable, move))
export const tickAllTTL = mapper(conditional(hasTTL, tickTTL))
export const moveAndTick = compose(moveAllMoveable, tickAllTTL)


export const updateObjectList = [
  resetCollision,
  moveAndTick,
  checkAsteroidCollisionAgainstProjectiles,
  checkProjectileCollisionAgainstAsteroids,
  list => list.map(obj => { return obj.hasCollided ? { ...obj, delete: true } : obj }),
  removeDeleted].reduce(compose)


