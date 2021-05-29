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

export const create = size => (location, velocity): Asteroid => {
  return {
    ...GenericFactory(location, velocity, sizeToRadius[size], ObjectType.Asteroid),
    hasCollided: false,
    durability: 3,
    size
  }
}

const shatterVelocities = asteroid => {
  const asteroidDirection = Vector.degrees(asteroid.velocity)
  const magnitude = Vector.magnitude(asteroid.velocity)
  return [randomDirectionVector(asteroidDirection, 90), randomDirectionVector(asteroidDirection, 180)]
    .map(vector => Vector.scale(vector, magnitude, 1.1))
}
export const shatter = (asteroid: Asteroid): Asteroid[] => {
  let factory = partial(
    create(asteroid.size - 1),
    Position.real(asteroid.position)
  )
  if (asteroid.size === 0) return [{ ...asteroid, delete: true }]
  return shatterVelocities(asteroid)
    .map(vel => factory(vel))
    .concat({ ...asteroid, delete: true })
  return [factory(<TVector>[1, 0]), factory(<TVector>[0, 1]), { ...asteroid, delete: true }]

}