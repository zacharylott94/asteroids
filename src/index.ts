import { moveAndTick, updateObjectList } from "./behaviors/actions/composedActions.js"
import { circleRenderer, playerRenderer, projectileRenderer } from "./draw/composedRenderingFunctions.js"
import AsteroidSpawnSystem from "./engine/asteroidSpawner.js"
import { initGameState } from "./engine/global.js"
import { clear } from "./draw/clear.js"
import removeDeleted from "./behaviors/actions/removeDeleted.js"
import { setupInterface } from "./libraries/humanInterface.js"
import Controller from "./engine/keyboardController.js"
import { createDestroyParticles, createProjectileImpact, createProjectileTrail, initPlayerParticles } from "./behaviors/actions/ParticleEmitters.js"
import { getCollidedProjectiles, getDeletedAsteroids, getPlayer, getProjectiles } from "./libraries/getters.js"


const GameState = initGameState()
const humanInterface = setupInterface(GameState)
humanInterface.reset()

const graphicsLoop = () => {
  clear()
  GameState.objectList(circleRenderer)
  GameState.objectList(playerRenderer)
  GameState.objectList(projectileRenderer)
  GameState.particleList(circleRenderer)
}

const player = getPlayer(GameState.objectList)
const deletedAsteroids = getDeletedAsteroids(GameState.objectList)
const projetiles = getProjectiles(GameState.objectList)
const collidedProjectiles = getCollidedProjectiles(GameState.objectList)

const playerParticles = initPlayerParticles(player, () => Controller.isButtonHeld("w"))

const physicsLoop = () => {
  if (Controller.isButtonPushed("p")) humanInterface.pause()
  if (Controller.isButtonPushed("o")) humanInterface.reset()
  if (GameState.paused()) return

  if (Controller.isButtonHeld("w")) humanInterface.accelerate()
  if (Controller.isButtonHeld("a")) humanInterface.rotateCounterclockwise()
  if (Controller.isButtonHeld("d")) humanInterface.rotateClockwise()
  if (Controller.isButtonPushed("Enter")) humanInterface.fire()



  GameState.particleList(playerParticles)


  deletedAsteroids().forEach(object => GameState.particleList(createDestroyParticles(object)))
  projetiles().forEach(projectile => GameState.particleList(createProjectileTrail(projectile)))
  collidedProjectiles().forEach(projectile => GameState.particleList(createProjectileImpact(projectile)))


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

