export default (vector: TVector, ...scalars: number[]): TVector => {
  const scalar: number = scalars.reduce((acc, next) => { return acc * next })
  return { x: vector.x * scalar, y: vector.y * scalar }
}