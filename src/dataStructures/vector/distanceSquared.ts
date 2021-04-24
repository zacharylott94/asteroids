import subtract from "./subtract.js"
import squaredMagnitude from "./squaredMagnitude.js"

export default (vector1: TVector, vector2: TVector): number => {
  return squaredMagnitude(subtract(vector1, vector2))
}