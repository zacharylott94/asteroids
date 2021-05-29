import { create as Asteroid } from "../dataStructures/Asteroid.js"
import Position from "../dataStructures/position/Position.js"
import Vector from "../dataStructures/vector/Vector.js"
import { Settings } from "../settings.js"

const largeAsteroid = Asteroid(2)
const playerSafetyRadius = 200
const minAsteroidVelocity = 1
const AsteroidDifficultyVelocityRatio = 1

function generateSpawnLocation(objectList: GameObject[]): TVector {
  const player = objectList.filter(object => object.type === ObjectType.Player)[0]
  if (player === undefined) return Vector.ZERO
  //Get random positions until one of them is outside a radius around the player
  while (true) {
    const newPosition = Vector.fromComponents(Math.random() * Settings.GAME_WIDTH, Math.random() * Settings.GAME_WIDTH)
    if (Vector.distanceSquared(newPosition, Position.closestTo(player.position, newPosition)) > playerSafetyRadius * playerSafetyRadius) {
      return newPosition
    }
  }
}

function generateRandomVelocity(difficulty: number): TVector {
  return Vector.fromDegreesAndMagnitude(Math.random() * 360,
    Math.max(minAsteroidVelocity, Math.random() * difficulty * AsteroidDifficultyVelocityRatio))
}

const AsteroidSpawnSystem = difficulty => (objectList: GameObject[]): GameObject[] => {
  const asteroids = objectList.filter(obj => obj.type === ObjectType.Asteroid)
  if (asteroids.length < difficulty * 3)
    return objectList.concat(largeAsteroid(generateSpawnLocation(objectList), generateRandomVelocity(difficulty)))
  return objectList
}

export default AsteroidSpawnSystem