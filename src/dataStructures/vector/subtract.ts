export default (vec1: TVector, vec2: TVector): TVector => {
  return [vec1[0] - vec2[0], vec1[1] - vec2[1]]
}