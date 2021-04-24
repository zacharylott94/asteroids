import mod from "../../libraries/mod.js"
import radians from "./radians.js"

export default (vector: TVector): number => {
  const rad: number = radians(vector)
  return mod(rad * 360 / 2 / Math.PI, 360)
}