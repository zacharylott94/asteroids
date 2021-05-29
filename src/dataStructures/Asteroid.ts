import { partial } from "../hof/partial.js"
import { randomDirectionVector } from "../libraries/random.js"
import GenericFactory from "./genericObject.js"
import Position from "./position/Position.js"
import Vector from "./vector/Vector.js"

const sizeToRadius =
  [
    15,
    25,
    40,
  ]
const durability = 3
const velocityScale = 1.1
const spreadAngles = [90, 180]

export const create = size => (location, velocity): Asteroid => {
  return {
    ...GenericFactory(location, velocity, sizeToRadius[size], ObjectType.Asteroid),
    hasCollided: false,
    durability,
    size
  }
}

const shatterVelocities = asteroid => {
  const asteroidDirection = Vector.degrees(asteroid.velocity)
  const magnitude = Vector.magnitude(asteroid.velocity)
  return spreadAngles
    .map(angle => randomDirectionVector(asteroidDirection, angle))
    .map(vector => Vector.scale(vector, magnitude, velocityScale))
}

export const shatter = (asteroid: Asteroid): Asteroid[] => {
  const factory = partial(
    create(asteroid.size - 1),
    Position.real(asteroid.position)
  )
  if (asteroid.size === 0) return [{ ...asteroid, delete: true }]
  return shatterVelocities(asteroid)
    .map(vel => factory(vel))
    .concat({ ...asteroid, delete: true })
}