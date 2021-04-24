export default (vector: TVector, ...scalars: number[]): TVector => {
  const scalar: number = scalars.reduce((acc, next) => { return acc * next })
  return [vector[0] * scalar, vector[1] * scalar]
}