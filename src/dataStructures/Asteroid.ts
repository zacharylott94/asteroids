import { partial } from "../hof/partial.js"
import { randomDirectionVector } from "../libraries/random.js"
import GenericFactory from "./genericObject.js"
import Position from "./position/Position.js"
import Vector from "./vector/Vector.js"

const SIZE_TO_RADIUS =
  [
    15,
    25,
    40,
  ]
const DURABILITY = 3
const VELOCITY_SCALE = 1.1
const SPREAD = 30
const DEADZONE = 5

export const create = size => (location, velocity, durability = DURABILITY, sizeToRadius = SIZE_TO_RADIUS): Asteroid => {
  return {
    ...GenericFactory(location, velocity, sizeToRadius[size], ObjectType.Asteroid),
    hasCollided: false,
    durability,
    size
  }
}

const shatterVelocities = (asteroid: Asteroid, spread = SPREAD, deadzone = DEADZONE, velocityScale = VELOCITY_SCALE) => {
  const asteroidDirection = Vector.degrees(asteroid.velocity)
  const newAngles = [asteroidDirection + spread + deadzone, asteroidDirection - spread - deadzone]
  const magnitude = Vector.magnitude(asteroid.velocity)
  return newAngles
    .map(angle => randomDirectionVector(angle, spread * 2))
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