import magnitude from "./magnitude.js"
const [x, y] = [0, 1]
export default (vector: TVector): TVector => {
  return [vector[x] / magnitude(vector), vector[y] / magnitude(vector)]
}