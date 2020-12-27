import GameObject from "./GameObject.js"
import Circle from "./Circle.js"
import Vector from "./Vector.js"


// Radius Constants
const largeRadius = 40
const mediumRadius = 25
const smallRadius = 16

class Asteroid extends GameObject {
  constructor(position, velocity, radius) {
    const draw = Circle
    super(position, velocity, draw, radius)
    this.durability = 3
  }
  static createLarge(position,velocity) {
    return new Asteroid(position, velocity, largeRadius)
  }
  static createMedium(position,velocity) {
    return new Asteroid(position, velocity, mediumRadius)
  }
  static createSmall(position,velocity) {
    return new Asteroid(position, velocity, smallRadius)
  }

  shatter() {
    if (this.size === largeRadius){
      Asteroid.createMedium(this.position,this.velocity.scale(1.25))
      Asteroid.createMedium(this.position,new Vector(this.velocity.y, -this.velocity.x).scale(1.25))
    }
    if (this.size === mediumRadius) {
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
}
Asteroid.size = size


export default Asteroid