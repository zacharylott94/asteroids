import accelerate from "../behaviors/actions/accelerate.js"
import { fireProjectile } from "../behaviors/actions/fireProjectile.js"
import { clockwise, counterClockwise } from "../behaviors/actions/rotate.js"
import { resetGameState } from "../engine/global.js"
import { conditional } from "../hof/conditional.js"
import mapper from "../hof/mapper.js"
import motor from "../hof/motor.js"
import { isPlayer } from "../types/typeGuards.js"



export function setupInterface(gameState) {
  const humanInterface: HumanInterface = {
    fire: motor(gameState.objectList, fireProjectile),
    rotateClockwise: motor(gameState.objectList, clockwise),
    rotateCounterclockwise: motor(gameState.objectList, counterClockwise),
    accelerate: motor(gameState.objectList, mapper(conditional(isPlayer, accelerate))),
    reset: _ => resetGameState(gameState),
    pause: motor(gameState.paused, paused => !paused)
  }
  return humanInterface
}