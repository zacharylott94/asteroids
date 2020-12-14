import GameObject from "./GameObject.js"
import Circle from "./Circle.js"

class Asteroid extends GameObject {
  constructor(position, velocity, radius, color) {
    const draw = Circle
    super(position, velocity, draw, radius)
  }
  static create(position,velocity, radius, color) {
    return new Asteroid(position, velocity, radius, color)
  }
}


export default Asteroid