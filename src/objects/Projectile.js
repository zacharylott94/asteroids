import GameObject from "./GameObject.js"
import EventCoordinator from "./EventCoordinator.js"
import Settings from "../gameLogic/Settings.js"
import GRAPHICS from "../graphics.js";
import Canvas from "./Canvas.js"


//Draws a diamond for the projectile
const diamond = (position, rotation, xSize = 4, ySize = 2) => {
  const ctx = Canvas.context
  const {x,y} = position
  GRAPHICS.rotate(position, rotation)
  ctx.beginPath();
  ctx.moveTo(x, y+ySize);
  ctx.lineTo(x-xSize, y);
  ctx.lineTo(x, y-ySize);
  ctx.lineTo(x+xSize, y);
  ctx.lineTo(x, y+ySize);
  ctx.stroke();
};

class Projectile extends GameObject {
  constructor(position, rotationVector) {
    super(position, rotationVector.scale(Settings.PROJECTILE_SPEED), Settings.PROJECTILE_SIZE)
    this.timeToLive = Settings.PROJECTILE_TIME_TO_LIVE
    this.rotation = rotationVector.degrees()
    this.draw = Projectile.draw
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
  static draw(position = this.position) {
    GRAPHICS.runDraw(() => diamond(position, this.rotation))
  }
}

export default Projectile