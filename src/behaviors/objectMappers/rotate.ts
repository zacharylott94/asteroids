import { conditional } from "../../hof/conditional.js"
import { isPlayer } from "../../hof/conditions.js"
import mapper from "../../hof/mapper.js"

export const rotate = object => ({ ...object, rotation: object.rotation + object.angularVelocity })
const setAngularVelocity = angularVelocity => object => ({ ...object, angularVelocity })
const rotatePlayerInObjectList = amount => mapper(conditional(isPlayer, setAngularVelocity(amount)))

export const setupRotationFunctions = amount => [
  rotatePlayerInObjectList(amount),
  rotatePlayerInObjectList(-amount)
]