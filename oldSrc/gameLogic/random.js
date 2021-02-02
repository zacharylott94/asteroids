export const randomInt = max => {
    return Math.floor(Math.random()*(max+1))
  }


export const randomAngle = (baseAngle, spread) => {
  let randomSpreadInDegrees = (Math.random() -.5) * spread
  let randomAngleInDegrees = randomSpreadInDegrees + baseAngle
  return randomAngleInDegrees
}
