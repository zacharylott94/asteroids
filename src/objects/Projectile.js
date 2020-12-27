import GameObject from "./GameObject.js"
import Circle from "./Circle.js"
import EventCoordinator from "./EventCoordinator.js"

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

  delete() {
    //Note that there is nothing in the event call identifying the player ship
    //The assumption is that there is only one player
    //Any projectile would raise the event for any player
    EventCoordinator.call(EventCoordinator.event.ProjectileDeleted, this)
    super.delete()
  }
}

export default Projectile