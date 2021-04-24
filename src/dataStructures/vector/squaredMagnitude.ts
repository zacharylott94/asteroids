export default (vector: TVector): number => {
  const x = vector.x
  const y = vector.y
  return (x * x + y * y)
}