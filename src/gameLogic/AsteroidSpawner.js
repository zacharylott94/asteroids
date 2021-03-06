import Canvas from "../objects/Canvas.js"
import Vector from "../objects/vector/Vector.js"
import ObjectList from "./ObjectList.js"
import { LargeAsteroid }  from '../objects/gameObjects/Asteroid.js'
import Settings from './Settings.js'
import Position from "../objects/vector/Position.js"

class AsteroidSpawner {
  static workLoop(difficulty) {
    if (ObjectList.count("Asteroid") < difficulty * 3) 
      AsteroidSpawner.spawnAsteroid(difficulty)
  }
  static generateSpawnLocation() {
    const player = ObjectList.getPlayer()
    if(player === undefined) return new Position()
    
    //Get random positions until one of them is outside a radius around the player
    while (true) {
      let newPosition = new Position(Math.random() * Canvas.width, Math.random() * Canvas.height)
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
    LargeAsteroid(AsteroidSpawner.generateSpawnLocation(), AsteroidSpawner.generateRandomVelocity(difficulty))
  }
}



export default AsteroidSpawner