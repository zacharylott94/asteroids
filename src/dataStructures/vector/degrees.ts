import radians from "./radians.js"

export default (vector: TVector): number => {
  const rad: number = radians(vector)
  let deg: number = rad * 360 / 2 / Math.PI
  deg = deg < 0 ? deg + 360 : deg
  return deg

}