export default (vec1: TVector, vec2: TVector): TVector => {
  return { x: vec1.x - vec2.x, y: vec1.y - vec2.y }
}