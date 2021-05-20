import { conditional } from "../hof/conditional.js"
import { Settings } from "../settings.js"
import { isPlayer } from "../types/typeGuards.js"

const rotate = rotationAmount => object => {
  return { ...object, rotation: object.rotation + rotationAmount }
}
const rotatePlayerClockwise = conditional(isPlayer, rotate(Settings.ROTATION_SPEED))
const rotatePlayerCounterClockwise = conditional(isPlayer, rotate(-Settings.ROTATION_SPEED))

export function clockwise(objectList) {
  return objectList.map(rotatePlayerClockwise)
}

export function counterClockwise(objectList) {
  return objectList.map(rotatePlayerCounterClockwise)
}