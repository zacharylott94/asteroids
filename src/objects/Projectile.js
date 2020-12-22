import GameObject from "./GameObject.js"
import Circle from "./Circle.js"

class Projectile extends GameObject {
  constructor(position, rotation) {
    super(position, rotation.scale(10), Circle, 5)
    this.timeToLive = 200
  }
  update () {
    super.update()
    if (this.timeToLive < 1) this.delete()
    this.timeToLive--
  }
  
  handleCollision(obj){
    super.handleCollision(obj)
    if (obj.constructor.name === "Asteroid") this.delete()
  }
}

export default Projectile