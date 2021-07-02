import { gameObjectRenderer, particleRenderer } from "../composedRenderingFunctions.js"
import drawText from "../text.js"
import { Settings } from "../../settings.js"
import fif from "../../hof/fif.js"
import text from "../text.js"

export const gameRenderSetup = (gameState, width, height) => {
  return fif(gameState.paused,
    () => text(() => [width / 2, height / 2], () => 'PAUSED', { size: '2em' }),
    () => {
      gameState.objectList(gameObjectRenderer)
      gameState.particleList(particleRenderer(gameState.timer()))
      //Note that this is set to track ore. This is temporary.
      drawText(() => [Settings.GAME_WIDTH / 2, 20], () => `SCORE: ${gameState.ore()}`)
    })
}

