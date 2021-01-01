import Canvas from "../objects/Canvas.js"
import Controller from "../objects/Controller.js"
import Vector from "../objects/Vector.js"
import ObjectPool from "./ObjectPool.js"
import Asteroid from '../objects/Asteroid.js'

const PLAYER_SAFETY_RADIUS = 200
const MIN_ASTEROID_VELOCITY = .1
const DIFFICULTY_VELOCITY_RATIO = .5


class AsteroidSpawner {
  static workLoop(difficulty) {
    if (ObjectPool.count("Asteroid") < difficulty * 3) 
      AsteroidSpawner.spawnAsteroid(difficulty)
  }
  static generateSpawnLocation() {
    const player = ObjectPool.getPlayer()
    
    //Get random positions until one of them is outside a radius around the player
    while (true) {
      let newPosition = new Vector(Math.random() * Canvas.width, Math.random() * Canvas.height)
      if (Vector.distanceSquared(newPosition, player.position, canvas.width, canvas.height) > PLAYER_SAFETY_RADIUS*PLAYER_SAFETY_RADIUS){
        return newPosition
      }
    }
  }
  static generateRandomVelocity(difficulty) {
    return Vector.fromDegreesAndMagnitude(Math.random() * 360, 
                                          Math.max(MIN_ASTEROID_VELOCITY, Math.random() * difficulty * DIFFICULTY_VELOCITY_RATIO))
  }
  static spawnAsteroid(difficulty) {
    // console.log("Spawn Asteroid")
    Asteroid.createLarge(AsteroidSpawner.generateSpawnLocation(), AsteroidSpawner.generateRandomVelocity(difficulty))
  }
}



export default AsteroidSpawner