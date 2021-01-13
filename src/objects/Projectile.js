import GameObject from "./GameObject.js"
import EventCoordinator from "./EventCoordinator.js"
import Settings from "../gameLogic/Settings.js"
import diamond from "../draw/Diamond.js";
import Sound from "../gameLogic/Sound.js";


class Projectile extends GameObject {
  constructor(position, rotationVector) {
    super(position, rotationVector.scale(Settings.PROJECTILE_SPEED), Settings.PROJECTILE_SIZE)
    this.timeToLive = Settings.PROJECTILE_TIME_TO_LIVE
    this.rotation = rotationVector.degrees()
    this.draw = Projectile.draw.bind(this)
    this.shootSound = new Sound(Projectile.shootSounds[Math.floor((Math.random()*3))].media.src)
    this.shootSound.play()
  }
  update () {
    super.update()
    if (this.timeToLive < 1) this.delete()
    this.timeToLive--
  }

  handleCollision(obj){
    super.handleCollision(obj)
    if (obj.constructor.name === "Asteroid") {
      this.shootSound.stop()
      this.delete()
    }
  }

  delete() {
    //Note that there is nothing in the event call identifying the player ship
    //The assumption is that there is only one player
    //Any projectile would raise the event for any player
    EventCoordinator.call(EventCoordinator.event.ProjectileDeleted, this)
    super.delete()
  }
  static draw(position = this.position) {
    diamond(position, this.rotation)
  } 
  static shootSounds = [
    new Sound("/src/sfx/shoot.wav"),
    new Sound("/src/sfx/shoot2.wav"),
    new Sound("/src/sfx/shoot3.wav"),
  ]
}

export default Projectile