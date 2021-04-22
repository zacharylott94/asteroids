import constrain from "./constrain.js"
import Vector from "../Vector.js"
import closestTo from "./closestTo.js"
import specificPositionVector from "./specificPositionVector.js"
import addVector from "./addVector.js"
import fromComponents from "./fromComponents.js"
import { partial } from "../../hof/partial.js"
import { Settings } from "../../settings.js"


enum EPosition {
  topLeft,
  top,
  topRight,
  left,
  real,
  right,
  bottomLeft,
  bottom,
  bottomRight,
}

const offsets: TPosition = [
  Vector.fromComponents(-Settings.GAME_WIDTH, -Settings.GAME_HEIGHT),
  Vector.fromComponents(0, -Settings.GAME_HEIGHT),
  Vector.fromComponents(Settings.GAME_WIDTH, -Settings.GAME_HEIGHT),
  Vector.fromComponents(-Settings.GAME_WIDTH, 0),
  Vector.fromComponents(0, 0),
  Vector.fromComponents(Settings.GAME_WIDTH, 0),
  Vector.fromComponents(-Settings.GAME_WIDTH, Settings.GAME_HEIGHT),
  Vector.fromComponents(0, Settings.GAME_HEIGHT),
  Vector.fromComponents(Settings.GAME_WIDTH, Settings.GAME_HEIGHT),

]
export default {
  fromVector: partial(addVector, offsets),
  fromComponents: (x, y) => fromComponents(offsets, x, y),
  addVector,
  real: specificPositionVector(EPosition.real),
  closestTo,
  constrain: constrain(offsets, Settings, EPosition.real),
}
