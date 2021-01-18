import Canvas from "../objects/Canvas.js"
import Vector from "../objects/vector/Vector.js"
import ObjectPool from "./ObjectPool.js"
import Asteroid from '../objects/Asteroid.js'
import Settings from './Settings.js'

class AsteroidSpawner {
  static workLoop(difficulty) {
    if (ObjectPool.count("Asteroid") < difficulty * 3) 
      AsteroidSpawner.spawnAsteroid(difficulty)
  }
  static generateSpawnLocation() {
    const player = ObjectPool.getPlayer()
    if(player === undefined) return new Vector()
    
    //Get random positions until one of them is outside a radius around the player
    while (true) {
      let newPosition = new Vector(Math.random() * Canvas.width, Math.random() * Canvas.height)
      if (Vector.distanceSquared(newPosition, player.position, canvas.width, canvas.height) > Settings.PLAYER_SAFETY_RADIUS*Settings.PLAYER_SAFETY_RADIUS){
        return newPosition
      }
    }
  }
  static generateRandomVelocity(difficulty) {
    return Vector.fromDegreesAndMagnitude(Math.random() * 360, 
                                          Math.max(Settings.MIN_ASTEROID_VELOCITY, Math.random() * difficulty * Settings.ASTEROID_DIFFICULTY_VELOCITY_RATIO))
  }
  static spawnAsteroid(difficulty) {
    Asteroid.createLarge(AsteroidSpawner.generateSpawnLocation(), AsteroidSpawner.generateRandomVelocity(difficulty))
  }
}



export default AsteroidSpawner