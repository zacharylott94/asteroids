import GameObject from "./GameObject.js"
import Circle from "./Circle.js"

const speed = 5
const size = 5
const timeToLive = 200 //in physics frames
class Projectile extends GameObject {
  constructor(position, rotation) {
    super(position, rotation.scale(speed), Circle, size)
    this.timeToLive = timeToLive
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