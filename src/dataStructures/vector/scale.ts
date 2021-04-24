const [x, y] = [0, 1]
export default (vector: TVector, ...scalars: number[]): TVector => {
  const scalar: number = scalars.reduce((acc, next) => { return acc * next })
  return [vector[x] * scalar, vector[y] * scalar]
}
