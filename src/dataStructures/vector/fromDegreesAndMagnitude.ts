export default (degrees: number, magnitude: number): TVector => {
  const angle: number = Math.PI * 2 / 360 * degrees
  const x: number = Math.cos(angle)
  const y: number = Math.sin(angle)
  return { x: x * magnitude, y: y * magnitude }
}