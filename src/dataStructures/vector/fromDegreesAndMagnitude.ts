export default (degrees: Degrees, magnitude: number): TVector => {
  const angle: Degrees = Math.PI * 2 / 360 * degrees
  const x = Math.cos(angle)
  const y = Math.sin(angle)
  return [x * magnitude, y * magnitude]
}