import add from "./add.js"
import distance from "./distance.js"
import distanceSquared from "./distanceSquared.js"
import dotProduct from "./dotProduct.js"
import magnitude from "./magnitude.js"
import normalize from "./normalize.js"
import squaredMagnitude from "./squaredMagnitude.js"
import subtract from "./subtract.js"
import radians from "./radians.js"
import degrees from "./degrees.js"
import scale from "./scale.js"
import fromDegreesAndMagnitude from "./fromDegreesAndMagnitude.js"

export default class Vector {

  static fromComponents(x: number, y: number): TVector {
    return { x, y }
  }
  static new = Vector.fromComponents
  static fromDegreesAndMagnitude = fromDegreesAndMagnitude
  static add = add
  static subtract = subtract

  static scale = scale
  static degrees = degrees
  static radians = radians
  static normalize = normalize
  static magnitude = magnitude
  static squaredMagnitude = squaredMagnitude
  static distanceSquared = distanceSquared
  static distance = distance
  static dotProduct = dotProduct

  static UP = Vector.fromComponents(0, -1)
  static DOWN = Vector.fromComponents(0, 1)
  static LEFT = Vector.fromComponents(-1, 0)
  static RIGHT = Vector.fromComponents(1, 0)
  static ZERO = Vector.fromComponents(0, 0)

}

