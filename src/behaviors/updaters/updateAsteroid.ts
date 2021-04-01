import thread from "../../hof/thread.js"
import move from "../move.js"

export default function updateAsteroid(asteroid) {
  let functions = [
    move
  ]
  return thread(asteroid, ...functions)
}