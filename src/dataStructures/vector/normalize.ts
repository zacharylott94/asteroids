import magnitude from "./magnitude.js"

export default (vector: TVector): TVector => {
  return [vector[0] / magnitude(vector), vector[1] / magnitude(vector)]
}