import { LargeAsteroidFactory } from "../dataStructures/Asteroid.js"
import Position from "../dataStructures/Position.js"
import Vector from "../dataStructures/Vector.js"
import { Settings } from "../settings.js"
import { getObjects } from "./objectList.js"





function AsteroidSpawnSystem(objectList: any[], difficulty: number) {
  if (getObjects(objectList, ObjectType.Asteroid).length < difficulty * 3)
    objectList.push(LargeAsteroidFactory(generateSpawnLocation(), generateRandomVelocity()))



  function generateSpawnLocation(): TVector {
    const player = getObjects(objectList, ObjectType.Player)[0]
    if (player === undefined) return Vector.ZERO
    //Get random positions until one of them is outside a radius around the player
    while (true) {
      let newPosition = Vector.fromComponents(Math.random() * Settings.GAME_WIDTH, Math.random() * Settings.GAME_WIDTH)
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