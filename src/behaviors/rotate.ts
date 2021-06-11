import { conditional } from "../hof/conditional.js"
import { Settings } from "../settings.js"
import { isPlayer } from "../hof/conditionals.js"
import mapper from "../hof/mapper.js"

const rotate = rotationAmount => object => {
  return { ...object, rotation: object.rotation + rotationAmount }
}
const rotatePlayerClockwise = conditional(isPlayer, rotate(Settings.ROTATION_SPEED))
const rotatePlayerCounterClockwise = conditional(isPlayer, rotate(-Settings.ROTATION_SPEED))

export const clockwise = mapper(rotatePlayerClockwise)
export const counterClockwise = mapper(rotatePlayerCounterClockwise)
