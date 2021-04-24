import subtract from "./subtract.js"
import squaredMagnitude from "./squaredMagnitude.js"

export default (vector1: TVector, vector2: TVector): number => {
  let difference: TVector = subtract(vector1, vector2)
  let SM: number = squaredMagnitude(difference)
  return SM
}