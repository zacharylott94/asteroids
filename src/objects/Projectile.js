import GameObject from "./GameObject.js"
import EventCoordinator from "./EventCoordinator.js"
import Settings from "../gameLogic/Settings.js"
import diamond from "../draw/Diamond.js";
import Sound from "../gameLogic/Sound.js";
import Random from "../gameLogic/random.js";
import RenderComponent from "./components/renderComponent.js";
import ColliderComponent from "./components/colliderComponent.js"
import ObjectList from "../gameLogic/ObjectList.js";

const shootSounds = [
  new Sound("/asteroids/src/sfx/shoot.wav"),
  new Sound("/asteroids/src/sfx/shoot2.wav"),
  new Sound("/asteroids/src/sfx/shoot3.wav"),
]
class Projectile extends GameObject {
  constructor(position, rotationVector) {
    super(position, rotationVector.scale(Settings.PROJECTILE_SPEED), Settings.PROJECTILE_SIZE)
    this.timeToLive = Settings.PROJECTILE_TIME_TO_LIVE
    this.rotation = rotationVector.degrees()
    this.shootSound = new Sound(shootSounds[Random.int(2)].getSrc())
    this.shootSound.play()
    this.renderComponent = new RenderComponent(diamond, this)
    this.collider = new ColliderComponent(this)

    Object.assign(
      this,
      canDelete(this)
    )
  }
  update () {
    super.update()
    if (this.timeToLive < 1) this.delete()
    this.timeToLive--
  }

  handleCollision(obj){
    if(!this.collider.collidedWith(obj)) return
    if (obj.constructor.name === "Asteroid") {
      this.shootSound.stop()
      this.delete()
    }
  }


  }

const canDelete = projectile => {
  const deleteThis = _ => {
    EventCoordinator.call(EventCoordinator.event.ProjectileDeleted, projectile)
    ObjectList.delete(projectile)
  }
  return {delete:deleteThis}
}
}

export default Projectile