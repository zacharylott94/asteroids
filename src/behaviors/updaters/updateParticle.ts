import thread from "../../hof/thread.js"
import move from "../move.js"
import tickTTL from "../tickTTL.js"

export default function updateParticle(particle) {
  let functions = [
    move,
    tickTTL
  ]
  return thread(particle, ...functions)
}