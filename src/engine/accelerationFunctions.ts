import Vector from "../dataStructures/vector/Vector.js"
import { randomNumber } from "../libraries/random.js"

export const wavy = ({ offset = () => randomNumber(Math.PI * 2), amplitude = 5, period = 10, waveLine }) => {
  const accelerationBuilder = () => {
    const fixedWaveline = waveLine()
    const fixedOffset = offset()
    const acceleration = time => {
      return Vector.fromDegreesAndMagnitude(
        fixedWaveline,
        Math.sin((time / period) + fixedOffset) * amplitude / (time * time)
      )
    }
    return acceleration

  }


  return accelerationBuilder

}