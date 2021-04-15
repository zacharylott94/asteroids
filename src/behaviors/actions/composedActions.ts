import { conditional } from "../../hof/conditional.js"
import mapper from "../../hof/mapper.js"
import { isMoveable, hasTTL } from "../../types/typeGuards.js"
import move from "../move.js"
import tickTTL from "../tickTTL.js"

export const moveAllMoveable = mapper(conditional(isMoveable, move))
export const tickAllTTL = mapper(conditional(hasTTL, tickTTL))