import Position from "./position/Position.js"

export function Particle(location: TVector = [0, 0], velocity: TVector = [0, 0], ttl: number = 60): Particle {
  return {
    ttl,
    velocity,
    position: Position.fromVector(location),
    delete: false
  }
}