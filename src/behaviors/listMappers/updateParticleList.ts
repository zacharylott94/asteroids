import { particleGeneratorSetup } from "../../engine/ParticleEmitters.js"
import compose from "../../hof/compose.js"
import moveAllMoveable from "./moveAllMoveable.js"
import tickAllTTL from "./tickAllTTL.js"
import removeDeleted from "./removeDeleted.js"

export default function particleListUpdaterSetup(objectList) {
  return [
    particleGeneratorSetup(objectList),
    moveAllMoveable,
    tickAllTTL,
    removeDeleted,
  ].reduce(compose)
}