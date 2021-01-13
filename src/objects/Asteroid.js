import GameObject from "./GameObject.js"
import Vector from "./Vector.js"
import EventCoordinator from "./EventCoordinator.js"
import Settings from "../gameLogic/Settings.js"



class Asteroid extends GameObject {
  constructor(position, velocity, radius) {
    super(position, velocity, radius)
    this.durability = Settings.ASTEROID_DURABILITY
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
    let newVelocity = Vector.fromDegreesAndMagnitude(this.velocity.degrees() + (Math.random() -.5) * Settings.SPREAD, 
                                                     this.velocity.magnitude() * 1.25)
    let direction = Math.random() > .5? 1: -1
    let spreadVelocity = new Vector(this.velocity.y*direction, -this.velocity.x*direction).scale(1.25)
    if (this.radius === Settings.LARGE_ASTEROID_RADIUS){
      Asteroid.createMedium(this.position, newVelocity)
      Asteroid.createMedium(this.position, spreadVelocity)
    }
    if (this.radius === Settings.MEDIUM_ASTEROID_RADIUS) {
      Asteroid.createSmall(this.position, newVelocity)
      Asteroid.createSmall(this.position, spreadVelocity)
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