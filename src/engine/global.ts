import { stator } from "../hof/stator.js"
import Player from "../dataStructures/Player.js"

export const initGameState = (): GameState => ({
  timer: stator(0),
  paused: stator<boolean>(false),
  objectList: stator(new Array<GameObject>()),
  particleList: stator(new Array<Particle>())
})

export const resetGameState = (gameState) => {
  gameState.timer(_ => 0)
  gameState.paused(_ => false)
  gameState.objectList(_ => [Player()])
  gameState.particleList(_ => [])
}