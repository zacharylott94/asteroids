import GameObject from "./GameObject.js"
import Circle from "./Circle.js"
import Vector from "./Vector.js"
import EventCoordinator from "./EventCoordinator.js"
import Settings from "../gameLogic/Settings.js"

class Asteroid extends GameObject {
  constructor(position, velocity, radius) {
    const draw = Circle
    super(position, velocity, draw, radius)
    this.durability = 3
  }
  static createLarge(position,velocity) {
    return new Asteroid(position, velocity, Settings.LARGE_ASTEROID_RADIUS)
  }
  static createMedium(position,velocity) {
    return new Asteroid(position, velocity, Settings.MEDIUM_ASTEROID_RADIUS)
  }
  static createSmall(position,velocity) {
    return new Asteroid(position, velocity, Settings.SMALL_ASTEROID_RADIUS)
  }

  shatter() {
    if (this.radius === Settings.LARGE_ASTEROID_RADIUS){
      Asteroid.createMedium(this.position,this.velocity.scale(1.25))
      Asteroid.createMedium(this.position,new Vector(this.velocity.y, -this.velocity.x).scale(1.25))
    }
    if (this.radius === Settings.MEDIUM_ASTEROID_RADIUS) {
      Asteroid.createSmall(this.position,this.velocity.scale(1.25))
      Asteroid.createSmall(this.position,new Vector(this.velocity.y, -this.velocity.x).scale(1.25))
    }

  }

  handleCollision(obj) {
    if (obj.constructor.name === "Projectile") this.durability--
    if (this.durability < 1) {
      this.shatter()
      this.delete()
    }
  }
  delete() {
    EventCoordinator.call(EventCoordinator.event.ObjectDeleted, this)
    super.delete()
  }
}



export default Asteroid