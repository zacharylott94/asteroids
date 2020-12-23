import GameObject from "./GameObject.js"
import Circle from "./Circle.js"

class Asteroid extends GameObject {
  constructor(position, velocity, radius, color) {
    const draw = Circle
    super(position, velocity, draw, radius)
    this.durability = 3
  }
  static create(position,velocity, radius, color) {
    return new Asteroid(position, velocity, radius, color)
  }

  handleCollision(obj) {
    if (obj.constructor.name === "Projectile") this.durability--
    if (this.durability < 1) this.delete()
  }
}


export default Asteroid