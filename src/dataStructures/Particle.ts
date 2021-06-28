import Vector from "./vector/Vector.js"
import wrapVector from "./vector/wrapVector.js"

type acceleration = (time: number) => TVector

const particleEquation = (position: TVector = [0, 0], velocity: TVector = [0, 0], acceleration: acceleration, timeOffset: number, time: number) => {
  const relativeTime = time - timeOffset
  return [
    position,
    Vector.scale(velocity, relativeTime),
    Vector.scale(acceleration(relativeTime), .5, relativeTime * relativeTime)
  ].reduce(Vector.add)
}

export const Particle = vectorWrap => (timeOffset: number, position?, velocity?, ttl = Number.MAX_SAFE_INTEGER, acceleration?) => (time: number) => {
  if (time >= ttl + timeOffset) return Vector.INF
  return wrapVector(vectorWrap, particleEquation(position, velocity, acceleration, timeOffset, time))
}
