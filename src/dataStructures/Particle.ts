import GenericFactory from "./genericObject.js"

export function Particle(location: TVector = { x: 0, y: 0 }, velocity: TVector, ttl: number = 60) {
  return {
    ...GenericFactory(location, velocity, 1, ObjectType.Particle),
    ttl
  }
}