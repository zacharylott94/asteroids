import Settings from "../../gameLogic/Settings.js"
import diamond from "../../draw/Diamond.js";
import Sound from "../../gameLogic/Sound.js";
import { randomInt } from "../../gameLogic/random.js";
import ObjectList from "../../gameLogic/ObjectList.js";
import { canRender } from "../behaviors/canRender.js";
import { canHandleCollision } from "../behaviors/canHandleCollision.js";
import { hasTimeToLive } from "../behaviors/hasTimeToLive.js";
import { commonBehaviors } from "../behaviors/commonBehavior.js";
import { ParticleSpawnerBuilder } from "../ParticleSpawner.js";
import Vector from "../vector/Vector.js";

const shootSounds = [
  Sound("/asteroids/src/sfx/shoot.wav"),
  Sound("/asteroids/src/sfx/shoot2.wav"),
  Sound("/asteroids/src/sfx/shoot3.wav"),
]

const canCollide = (projectile) => {
  const onCollide = obj => {
    if (obj.type === "Asteroid") {
      // projectile.shootSound.stop()
      let angle = Vector.subtract(projectile.position, obj.position).degrees()
      ParticleSpawnerBuilder()
      .withPosition(projectile.position)
      .withDensity(2)
      .withSpeed(4)
      .atAngle(angle)
      .withSpread(60)
      .withParticleTTL(10)
      .build()
      .emit()

      projectile.delete()
    }
  }
  projectile.onCollide = onCollide
}

const ProjectileFactory = (position, rotationVector) => {
  let projectile = {
    type: "Projectile",
    position,
    velocity: rotationVector.scale(Settings.PROJECTILE_SPEED),
    radius: Settings.PROJECTILE_SIZE,
    rotation: rotationVector.degrees(),
    sound: Sound(shootSounds[randomInt(2)].getSrc()),
    updateCallbacks: [],
  }


  canRender(projectile, diamond),
  commonBehaviors(projectile)
  canHandleCollision(projectile)
  canCollide(projectile)
  hasTimeToLive(projectile, Settings.PROJECTILE_TIME_TO_LIVE)


  projectile.sound.play()
  ObjectList.add(projectile)
  return projectile
}

export default ProjectileFactory