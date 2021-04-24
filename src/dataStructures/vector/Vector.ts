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

  fromComponents: (x, y) => ({ x, y }),
  new: (x, y) => ({ x, y }),
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

  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
  ZERO: { x: 0, y: 0 },

}

