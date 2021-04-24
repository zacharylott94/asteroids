import distanceSquared from "./distanceSquared.js"

export default (vector1: TVector, vector2: TVector): number => {
  return Math.sqrt(distanceSquared(vector1, vector2))
}