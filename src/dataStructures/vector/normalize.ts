import magnitude from "./magnitude.js"

export default (vector: TVector): TVector => {
  return { x: vector.x / magnitude(vector), y: vector.y / magnitude(vector) }
}