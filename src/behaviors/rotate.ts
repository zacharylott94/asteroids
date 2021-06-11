import { conditional } from "../hof/conditional.js"
import { isPlayer } from "../hof/conditionals.js"
import mapper from "../hof/mapper.js"

const rotate = rotationAmount => object => ({ ...object, rotation: object.rotation + rotationAmount })
const rotatePlayerInObjectList = amount => mapper(conditional(isPlayer, rotate(amount)))

export const setupRotationFunctions = amount => [
  rotatePlayerInObjectList(amount),
  rotatePlayerInObjectList(-amount)
]