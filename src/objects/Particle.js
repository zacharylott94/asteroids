import Circle from "../draw/Circle.js"
import { classGuard, typeofGuard } from "../gameLogic/guards/Guard.js"
import ObjectList from "../gameLogic/ObjectList.js"
import { canDelete } from "./behaviors/canDelete.js"
import { canMove } from "./behaviors/canMove.js"
import { canRender } from "./behaviors/canRender.js"
import { canUpdate } from "./behaviors/canUpdate.js"
import { commonBehaviors } from "./behaviors/commonBehavior.js"
import { hasTimeToLive } from "./behaviors/hasTimeToLive.js"

export const Particle = (position, velocity, draw = Circle) => {
  classGuard(position, "Position")
  classGuard(velocity, "Vector")
  typeofGuard(draw, "function")

  let particle = {
    position,
    velocity,
    updateCallbacks: [],
  }

  commonBehaviors(particle)
  canRender(particle, draw)
  hasTimeToLive(particle, 200)


  ObjectList.add(particle)
  return particle
}