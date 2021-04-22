import Asteroid from "../dataStructures/Asteroid.js"
import Position from "../dataStructures/Position.js"
import Vector from "../dataStructures/Vector.js"
import { partial } from "../hof/partial.js"
import concat from "../libraries/concat.js"
import { Settings } from "../settings.js"


const largeAsteroid = Asteroid(Settings.LARGE_ASTEROID_RADIUS)


function AsteroidSpawnSystem(objectList: Function, difficulty: number) {
  const spawnAsteroid = partial(concat, largeAsteroid(generateSpawnLocation(), generateRandomVelocity()))
  const asteroids = objectList().filter(obj => obj.type === ObjectType.Asteroid)
  if (asteroids.length < difficulty * 3)
    objectList(spawnAsteroid)



  function generateSpawnLocation(): TVector {
    const player = objectList().filter(object => object.type === ObjectType.Player)[0]
    if (player === undefined) return Vector.ZERO
    //Get random positions until one of them is outside a radius around the player
    while (true) {
      const newPosition = Vector.fromComponents(Math.random() * Settings.GAME_WIDTH, Math.random() * Settings.GAME_WIDTH)
      if (Vector.distanceSquared(newPosition, Position.closestTo(player.position, newPosition)) > Settings.PLAYER_SAFETY_RADIUS * Settings.PLAYER_SAFETY_RADIUS) {
        return newPosition
      }
    }
  }
  function generateRandomVelocity(): TVector {
    return Vector.fromDegreesAndMagnitude(Math.random() * 360,
      Math.max(Settings.MIN_ASTEROID_VELOCITY, Math.random() * difficulty * Settings.ASTEROID_DIFFICULTY_VELOCITY_RATIO))
  }
}

export default AsteroidSpawnSystem