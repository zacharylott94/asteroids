import { conditional } from "../../hof/conditional.js"
import { isPlayer } from "../../types/typeGuards.js"

const rotate = rotationAmount => object => {
  return { ...object, rotation: object.rotation + rotationAmount }
}
const rotatePlayerClockwise = conditional(isPlayer, rotate(10))
const rotatePlayerCounterClockwise = conditional(isPlayer, rotate(-10))

export function clockwise(objectList) {
  return objectList.map(rotatePlayerClockwise)
}

export function counterClockwise(objectList) {
  return objectList.map(rotatePlayerCounterClockwise)
}