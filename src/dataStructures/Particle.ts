import GenericFactory from "./genericObject.js"

export function Particle(location: TVector = [0, 0], velocity: TVector = [0, 0], ttl: number = 60): Particle {
  return {
    ...GenericFactory(location, velocity, 1, ObjectType.Particle),
    ttl
  }
}