export default (vec1: TVector, vec2: TVector): TVector => {
  // return zip(vec1,vec2).map(tuple => tuple.reduce((x,y) => x + y))
  return [vec1[0] + vec2[0], vec1[1] + vec2[1]]
}