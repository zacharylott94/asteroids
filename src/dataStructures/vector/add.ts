const [x, y] = [0, 1]
export default (vec1: TVector, vec2: TVector): TVector => {
  return [vec1[x] + vec2[x], vec1[y] + vec2[y]]
}