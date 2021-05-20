import { moveAndTick, updateObjectList } from "./behaviors/updateObjectList.js"
import { gameObjectRenderer, particleRenderer } from "./draw/composedRenderingFunctions.js"
import AsteroidSpawnSystem from "./engine/asteroidSpawner.js"
import { initGameState } from "./engine/global.js"
import { clear } from "./draw/clear.js"
import removeDeleted from "./behaviors/removeDeleted.js"
import { setupInterface } from "./engine/humanInterface.js"
import Controller from "./engine/keyboardController.js"
import { particleGeneratorSetup } from "./engine/ParticleEmitters.js"


const GameState = initGameState()
const humanInterface = setupInterface(GameState)
const particleGenerator = particleGeneratorSetup(GameState.objectList)
humanInterface.reset()

const graphicsLoop = () => {
  clear()
  GameState.objectList(gameObjectRenderer)
  GameState.particleList(particleRenderer)
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



  if (GameState.timer() % 60 === 0) {
    AsteroidSpawnSystem(GameState.objectList, 1)
  }
  GameState.timer(_ => ++_)
}

setInterval(graphicsLoop, 1000 / 60)
setInterval(physicsLoop, 1000 / 60)

