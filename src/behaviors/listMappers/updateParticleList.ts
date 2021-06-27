import { particleGeneratorSetup } from "../../engine/ParticleEmitters.js"
import compose from "../../hof/compose.js"

const isNotTimedOut = timer => particle => {
  if (particle(timer())[0] === Number.POSITIVE_INFINITY) return false
  return true
}

const filterTimedOut = timer => list => list.filter(isNotTimedOut(timer))

export default function particleListUpdaterSetup(objectList, timer) {
  return [
    particleGeneratorSetup(objectList, timer),
    filterTimedOut(timer),
  ].reduce(compose)
}