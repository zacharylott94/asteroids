import { moveAndTick } from "./behaviors/actions/composedActions.js"
import { circleRenderer, playerRenderer, projectileRenderer } from "./draw/composedRenderingFunctions.js"
import AsteroidSpawnSystem from "./engine/asteroidSpawner.js"
import { initGameState } from "./engine/global.js"
import { clear } from "./draw/clear.js"
import removeDeleted from "./behaviors/actions/removeDeleted.js"
import { checkAsteroidCollisionAgainstProjectiles, checkProjectileCollisionAgainstAsteroids, resetCollision } from "./behaviors/checkCollision.js"
import { setupInterface } from "./libraries/humanInterface.js"
import Controller from "./engine/keyboardController.js"



const GameState = initGameState()
const humanInterface = setupInterface(GameState)
humanInterface.reset()

let graphicsLoop = () => {
  clear()
  GameState.objectList(circleRenderer)
  GameState.objectList(playerRenderer)
  GameState.objectList(projectileRenderer)
  GameState.particleList(circleRenderer)
}


let physicsLoop = () => {
  if (Controller.buttonPushed("p")) humanInterface.pause()
  if (Controller.buttonPushed("o")) humanInterface.reset()
  if (GameState.paused()) return

  if (Controller.heldButtons["w"]) humanInterface.accelerate()
  if (Controller.heldButtons["a"]) humanInterface.rotateCounterclockwise()
  if (Controller.heldButtons["d"]) humanInterface.rotateClockwise()
  if (Controller.buttonPushed("Enter")) humanInterface.fire()


  GameState.objectList(resetCollision)
  GameState.objectList(moveAndTick)
  GameState.objectList(checkAsteroidCollisionAgainstProjectiles)
  GameState.objectList(checkProjectileCollisionAgainstAsteroids)
  GameState.objectList(list => list.map(obj => { return obj.hasCollided ? { ...obj, delete: true } : obj }))

  GameState.objectList(removeDeleted)

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

