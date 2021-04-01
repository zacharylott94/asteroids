import thread from "../../hof/thread.js"
import move from "../move.js"
import tickTTL from "../tickTTL.js"

export default function updateProjectile(projectile) {
  let functions = [
    tickTTL,
    move,
  ]
  return thread(projectile, ...functions)
}