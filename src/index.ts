import { moveAndTick, updateObjectList } from "./behaviors/actions/composedActions.js"
import { circleRenderer, playerRenderer, projectileRenderer } from "./draw/composedRenderingFunctions.js"
import AsteroidSpawnSystem from "./engine/asteroidSpawner.js"
import { initGameState } from "./engine/global.js"
import { clear } from "./draw/clear.js"
import removeDeleted from "./behaviors/actions/removeDeleted.js"
import { setupInterface } from "./libraries/humanInterface.js"
import Controller from "./engine/keyboardController.js"
import { initPlayerParticles } from "./behaviors/actions/ParticleEmitters.js"
import { isPlayer } from "./types/typeGuards.js"


const GameState = initGameState()
const getPlayer = () => GameState.objectList().filter(isPlayer)[0]
const humanInterface = setupInterface(GameState)
const playerParticles = initPlayerParticles(getPlayer, () => Controller.isButtonHeld("w"))
humanInterface.reset()

let graphicsLoop = () => {
  clear()
  GameState.objectList(circleRenderer)
  GameState.objectList(playerRenderer)
  GameState.objectList(projectileRenderer)
  GameState.particleList(circleRenderer)
}


let physicsLoop = () => {
  if (Controller.isButtonPushed("p")) humanInterface.pause()
  if (Controller.isButtonPushed("o")) humanInterface.reset()
  if (GameState.paused()) return

  if (Controller.isButtonHeld("w")) humanInterface.accelerate()
  if (Controller.isButtonHeld("a")) humanInterface.rotateCounterclockwise()
  if (Controller.isButtonHeld("d")) humanInterface.rotateClockwise()
  if (Controller.isButtonPushed("Enter")) humanInterface.fire()


  GameState.objectList(updateObjectList)

  GameState.particleList(playerParticles)
  GameState.particleList(moveAndTick)
  GameState.particleList(removeDeleted)
  if (GameState.timer() % 200 === 0) {
    console.log(GameState.objectList())
    AsteroidSpawnSystem(GameState.objectList, 1)
  }
  GameState.timer(_ => ++_)
}

setInterval(graphicsLoop, 1000 / 60)
setInterval(physicsLoop, 1000 / 60)

