import squaredMagnitude from "./squaredMagnitude.js"

export default (vector: TVector): number => {
  return Math.sqrt(squaredMagnitude(vector))
}