import accelerate from "../behaviors/accelerate.js"
import { fireProjectileWhenReady } from "../behaviors/fireProjectile.js"
import { clockwise, counterClockwise } from "../behaviors/rotate.js"
import { resetGameState } from "./global.js"
import { conditional } from "../hof/conditional.js"
import mapper from "../hof/mapper.js"
import motor from "../hof/motor.js"
import { isPlayer } from "../types/typeGuards.js"



export function setupInterface(gameState) {
  const humanInterface: HumanInterface = {
    fire: motor(gameState.objectList, fireProjectileWhenReady),
    rotateClockwise: motor(gameState.objectList, clockwise),
    rotateCounterclockwise: motor(gameState.objectList, counterClockwise),
    accelerate: motor(gameState.objectList, mapper(conditional(isPlayer, accelerate))),
    reset: () => resetGameState(gameState),
    pause: motor(gameState.paused, paused => !paused)
  }
  return humanInterface
}