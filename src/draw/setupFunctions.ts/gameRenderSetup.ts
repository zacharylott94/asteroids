import { gameObjectRenderer, particleRenderer } from "../composedRenderingFunctions.js"
import drawText from "../text.js"
import { Settings } from "../../settings.js"
import identity from "../../hof/identity.js"
import fif from "../../hof/fif.js"
import compose from "../../hof/compose.js"
import not from "../../hof/not.js"

export const gameRenderSetup = (gameState) => {
  return fif(compose(gameState.paused, not),
    () => {
      gameState.objectList(gameObjectRenderer)
      gameState.particleList(particleRenderer(gameState.timer()))
      drawText(() => [Settings.GAME_WIDTH / 2, 20], () => `SCORE: ${gameState.score()}`)
    },
    identity)
}
