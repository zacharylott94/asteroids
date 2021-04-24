export default (vector1: TVector, vector2: TVector): number => {
  return ((vector1.x * vector2.x) + (vector1.y * vector2.y))
}