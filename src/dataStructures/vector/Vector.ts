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

export default {

  fromComponents: (x, y): TVector => [x, y],
  new: (x, y): TVector => [x, y],
  fromDegreesAndMagnitude,
  add,
  subtract,

  scale,
  degrees,
  radians,
  normalize,
  magnitude,
  squaredMagnitude,
  distanceSquared,
  distance,
  dotProduct,

  UP: <TVector>[0, -1],
  DOWN: <TVector>[0, 1],
  LEFT: <TVector>[-1, 0],
  RIGHT: <TVector>[1, 0],
  ZERO: <TVector>[0, 0],

}

