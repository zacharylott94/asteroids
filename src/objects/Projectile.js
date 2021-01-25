import EventCoordinator from "./EventCoordinator.js"
import Settings from "../gameLogic/Settings.js"
import diamond from "../draw/Diamond.js";
import Sound from "../gameLogic/Sound.js";
import Random from "../gameLogic/random.js";
import ObjectList from "../gameLogic/ObjectList.js";
import { canMove } from "./behaviors/canMove.js"
import { canRender } from "./behaviors/canRender.js";

const shootSounds = [
  new Sound("/asteroids/src/sfx/shoot.wav"),
  new Sound("/asteroids/src/sfx/shoot2.wav"),
  new Sound("/asteroids/src/sfx/shoot3.wav"),
]
class Projectile{
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

const canUpdate = (projectile) => {
  const update = _ => {
    projectile.move()
    if (projectile.timeToLive < 1) projectile.delete()
    projectile.timeToLive--
  }
  return {update}
}

const ProjectileFactory = (position, rotationVector) => {
  let projectile = {
    position,
    velocity: rotationVector.scale(Settings.PROJECTILE_SPEED),
    radius: Settings.PROJECTILE_SIZE,
    timeToLive: Settings.PROJECTILE_TIME_TO_LIVE,
    rotation: rotationVector.degrees(),
    // renderComponent: new RenderComponent(diamond, this),
    // collider: new ColliderComponent(this),
  }

  Object.assign(
    projectile,
    canRender(projectile, diamond),
    canUpdate(projectile),
    canDelete(projectile),
    canMove(projectile),


  )
  shootSounds[Random.int(2)].play()
  ObjectList.add(projectile)
  return projectile
}

export default ProjectileFactory