import { stator } from "../hof/stator.js"
import Player from "../dataStructures/Player.js"

export const initGameState = (): GameState => ({
  timer: stator(0),
  paused: stator<boolean>(false),
  objectList: stator(new Array<GameObject>()),
  particleList: stator(new Array<Particle>()),
  score: stator(0),
  ore: stator(0)
})

export const resetGameState = (gameState) => {
  gameState.timer(_ => 0)
  gameState.paused(_ => false)
  gameState.objectList(_ => [Player()])
  gameState.particleList(_ => [])
  gameState.score(_ => 0)
  gameState.ore(_ => 0)
}