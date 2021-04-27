import { moveAndTick } from "./behaviors/actions/composedActions.js"
import { Particle } from "./dataStructures/Particle.js"
import Vector from "./dataStructures/vector/Vector.js"
import { circleRenderer, playerRenderer, projectileRenderer } from "./draw/composedRenderingFunctions.js"
import AsteroidSpawnSystem from "./engine/asteroidSpawner.js"
import { initGameState } from "./engine/global.js"
import { clear } from "./draw/clear.js"
import { partial } from "./hof/partial.js"
import concat from "./libraries/concat.js"
import { randomAngle } from "./libraries/random.js"
import removeDeleted from "./behaviors/actions/removeDeleted.js"
import { checkAsteroidCollisionAgainstProjectiles, checkProjectileCollisionAgainstAsteroids, resetCollision } from "./behaviors/checkCollision.js"
import { setupInterface } from "./libraries/humanInterface.js"


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
  if (GameState.paused()) return
  GameState.objectList(resetCollision)
  GameState.objectList(moveAndTick)
  GameState.objectList(checkAsteroidCollisionAgainstProjectiles)
  GameState.objectList(checkProjectileCollisionAgainstAsteroids)
  GameState.objectList(list => list.map(obj => { return obj.hasCollided ? { ...obj, delete: true } : obj }))

  GameState.objectList(removeDeleted)

  GameState.particleList(moveAndTick)
  GameState.particleList(partial(concat, Particle([100, 100], Vector.fromDegreesAndMagnitude(randomAngle(0, 360), Math.random() * 1.5))))
  GameState.particleList(removeDeleted)
  if (GameState.timer() % 200 === 0) {
    console.log(GameState.objectList())
    AsteroidSpawnSystem(GameState.objectList, 1)
    humanInterface.fire()
  }


  humanInterface.accelerate()
  GameState.timer(_ => ++_)
}

setInterval(graphicsLoop, 1000 / 60)
setInterval(physicsLoop, 1000 / 60)

