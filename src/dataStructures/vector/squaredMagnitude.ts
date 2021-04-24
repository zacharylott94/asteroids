export default (vector: TVector): number => {
  const x = vector[0]
  const y = vector[1]
  return (x * x + y * y)
}