import EventCoordinator from "./EventCoordinator.js"
import Settings from "../gameLogic/Settings.js"
import diamond from "../draw/Diamond.js";
import Sound from "../gameLogic/Sound.js";
import Random from "../gameLogic/random.js";
import ObjectList from "../gameLogic/ObjectList.js";
import { canMove } from "./behaviors/canMove.js"
import { canRender } from "./behaviors/canRender.js";
import { canHandleCollision } from "./behaviors/canHandleCollision.js";

const shootSounds = [
  Sound("/asteroids/src/sfx/shoot.wav"),
  Sound("/asteroids/src/sfx/shoot2.wav"),
  Sound("/asteroids/src/sfx/shoot3.wav"),
]

const canCollide = (projectile) => {
  const onCollide = obj => {
    if (obj.type === "Asteroid") {
      // projectile.shootSound.stop()
      projectile.delete()
    }
  }
  return {onCollide}
}

const canDelete = projectile => {
  const deleteThis = _ => {
    projectile.sound.stop()
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
    type: "Projectile",
    position,
    velocity: rotationVector.scale(Settings.PROJECTILE_SPEED),
    radius: Settings.PROJECTILE_SIZE,
    timeToLive: Settings.PROJECTILE_TIME_TO_LIVE,
    rotation: rotationVector.degrees(),
    sound: Sound(shootSounds[Random.int(2)].getSrc()),
  }

  Object.assign(
    projectile,
    canRender(projectile, diamond),
    canUpdate(projectile),
    canDelete(projectile),
    canMove(projectile),
    canHandleCollision(projectile),
    canCollide(projectile),


  )
  projectile.sound.play()
  ObjectList.add(projectile)
  return projectile
}

export default ProjectileFactory