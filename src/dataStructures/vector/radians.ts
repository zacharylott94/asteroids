import normalize from "./normalize.js"

export default (vector: TVector): number => {
  return Math.atan2(normalize(vector)[1], normalize(vector)[0])
}