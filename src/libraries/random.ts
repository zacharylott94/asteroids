export const randomInt = (max: number) => {
  return Math.floor(Math.random() * (max + 1))
}


export const randomAngle = (baseAngle: Degrees, spread: Degrees) => {
  let randomSpreadInDegrees = (Math.random() - .5) * spread
  let randomAngleInDegrees = randomSpreadInDegrees + baseAngle
  return randomAngleInDegrees
}
