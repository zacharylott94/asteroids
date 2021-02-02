import Circle from "../draw/Circle.js"
import { classGuard, typeofGuard } from "../gameLogic/guards/Guard.js"
import ObjectList from "../gameLogic/ObjectList.js"
import { canRender } from "./behaviors/canRender.js"
import { commonBehaviors } from "./behaviors/commonBehavior.js"
import { hasTimeToLive } from "./behaviors/hasTimeToLive.js"

export const Particle = ({position, velocity, draw = Circle, ttl}) => {
  let particle = {
    position,
    velocity,
    updateCallbacks: [],
  }

  commonBehaviors(particle)
  canRender(particle, draw)
  hasTimeToLive(particle, ttl)


  ObjectList.add(particle)
  return particle
}