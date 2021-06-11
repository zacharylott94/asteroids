import { moveAndTick, updateObjectList } from "./behaviors/updateObjectList.js"
import { gameObjectRenderer, particleRenderer } from "./draw/composedRenderingFunctions.js"
import AsteroidSpawnSystem from "./engine/asteroidSpawner.js"
import { initGameState } from "./engine/global.js"
import { clear } from "./draw/clear.js"
import removeDeleted from "./behaviors/removeDeleted.js"
import { setupInterface } from "./engine/humanInterface.js"
import Controller from "./engine/keyboardController.js"
import { particleGeneratorSetup } from "./engine/ParticleEmitters.js"
import drawText from "./draw/text.js"
import { Settings } from "./settings.js"
import updateScore from "./behaviors/updateScore.js"


const GameState = initGameState()
const humanInterface = setupInterface(GameState, Settings.ROTATION_SPEED)
const particleGenerator = particleGeneratorSetup(GameState.objectList)
humanInterface.reset()

const graphicsLoop = () => {
  clear()
  GameState.objectList(gameObjectRenderer)
  GameState.particleList(particleRenderer)
  drawText(() => [Settings.GAME_WIDTH / 2, 20], () => `SCORE: ${GameState.score()}`)
}

const physicsLoop = () => {
  if (Controller.isButtonPushed("p")) humanInterface.pause()
  if (Controller.isButtonPushed("o")) humanInterface.reset()
  if (GameState.paused()) return

  if (Controller.isButtonHeld("w")) humanInterface.accelerate()
  if (Controller.isButtonHeld("a")) humanInterface.rotateCounterclockwise()
  if (Controller.isButtonHeld("d")) humanInterface.rotateClockwise()
  if (Controller.isButtonPushed("Enter")) humanInterface.fire()

  GameState.particleList(particleGenerator)

  GameState.particleList(moveAndTick)
  GameState.particleList(removeDeleted)

  GameState.objectList(updateObjectList)
  GameState.score(updateScore(GameState.objectList))


  if (GameState.timer() % 60 === 0) {
    GameState.objectList(AsteroidSpawnSystem(GameState.score()))
  }
  GameState.timer(_ => ++_)
}

setInterval(graphicsLoop, 1000 / 60)
setInterval(physicsLoop, 1000 / 60)

