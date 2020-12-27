import Canvas from "../objects/Canvas.js"
import Controller from "../objects/Controller.js"
import Vector from "../objects/Vector.js"
import ObjectPool from "./ObjectPool.js"
import Asteroid from '../objects/Asteroid.js'

const PLAYER_SAFETY_RADIUS = 200
const MAX_ASTEROID_VELOCITY = 1

class AsteroidSpawner {
  static workLoop(asteroidCount, difficulty) {
    if (ObjectPool.count("Asteroid") < difficulty * 3) 
      AsteroidSpawner.spawnAsteroid()
  }
  static generateSpawnLocation() {
    // console.log("attempt to generate spawn location")
    const player = ObjectPool.getPlayer()
    let newPosition = new Vector()
    while (true) {
      newPosition.x = Math.random() * Canvas.width
      newPosition.y = Math.random() * Canvas.height
      if (Vector.distanceSquared(newPosition, player.position, canvas.width, canvas.height) > PLAYER_SAFETY_RADIUS*PLAYER_SAFETY_RADIUS){
        // console.log(`Spawn location at (${newPosition.x}, ${newPosition.y})`)
        break
      }
    }
    return newPosition
  }
  static generateRandomVelocity() {
    return Vector.fromDegreesAndMagnitude(Math.random() * 360, Math.random() * MAX_ASTEROID_VELOCITY)
  }
  static spawnAsteroid() {
    // console.log("Spawn Asteroid")
    Asteroid.createLarge(AsteroidSpawner.generateSpawnLocation(), AsteroidSpawner.generateRandomVelocity())
  }
}

Controller.registerCallback(Controller.button.pause, () => {AsteroidSpawner.spawnAsteroid()})

export default AsteroidSpawner