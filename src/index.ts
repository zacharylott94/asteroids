import { gameObjectRenderer, particleRenderer } from "./draw/composedRenderingFunctions.js"
import AsteroidSpawnSystem from "./engine/asteroidSpawner.js"
import { initGameState } from "./engine/global.js"
import { clear } from "./draw/clear.js"
import { setupInterface } from "./engine/humanInterface.js"
import Controller from "./engine/keyboardController.js"
import drawText from "./draw/text.js"
import { Settings } from "./settings.js"
import updateScore from "./behaviors/updateScore.js"
import Projectile from "./dataStructures/Projectile.js"
import { isPlayer } from "./hof/conditions.js"
import concat from "./libraries/concat.js"
import { partial } from "./hof/partial.js"
import particleListUpdaterSetup from "./behaviors/listMappers/updateParticleList.js"
import { updateObjectList } from "./behaviors/listMappers/updateObjectList.js"


const GameState = initGameState()
const humanInterface = setupInterface(GameState, Settings.ROTATION_SPEED)
const updateParticleList = particleListUpdaterSetup(GameState.objectList)
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

  GameState.particleList(updateParticleList)
  GameState.objectList(updateObjectList)
  GameState.score(updateScore(GameState.objectList))


  if (GameState.timer() % 60 === 0) {
    GameState.objectList(AsteroidSpawnSystem(GameState.score()))
  }
  GameState.timer(_ => ++_)
}

setInterval(graphicsLoop, 1000 / 60)
setInterval(physicsLoop, 1000 / 60)

