import AsteroidSpawnSystem from "./engine/asteroidSpawner.js"
import { initGameState } from "./engine/global.js"
import { clear } from "./draw/clear.js"
import { setupInterface } from "./engine/humanInterface.js"
import Controller from "./engine/keyboardController.js"
import { Settings } from "./settings.js"
import updateScore from "./behaviors/gameState Updaters/updateScore.js"
import particleListUpdaterSetup from "./behaviors/gameState Updaters/updateParticleList.js"
import { updateObjectList } from "./behaviors/gameState Updaters/updateObjectList.js"
import { gameRenderSetup } from "./draw/setupFunctions.ts/gameRenderSetup.js"
import { updateOreSetup } from "./behaviors/gameState Updaters/updateOre.js"

const GameState = initGameState()

const gameRender = gameRenderSetup(GameState, Settings.GAME_WIDTH, Settings.GAME_HEIGHT)
const humanInterface = setupInterface(GameState, Settings.ROTATION_SPEED)
const updateParticleList = particleListUpdaterSetup(GameState.objectList, GameState.timer)
const updateOre = updateOreSetup(GameState.objectList)
humanInterface.reset()

const graphicsLoop = () => {
  clear()
  gameRender()
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
  GameState.ore(updateOre)


  if (GameState.timer() % 60 === 0) {
    GameState.objectList(AsteroidSpawnSystem(GameState.score()))
    console.log(`Ore: ${GameState.ore()}`)
  }

  GameState.timer(_ => ++_)
}

setInterval(graphicsLoop, 1000 / 60)
setInterval(physicsLoop, 1000 / 60)

