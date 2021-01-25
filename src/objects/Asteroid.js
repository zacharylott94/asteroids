import GameObject from "./GameObject.js"
import Vector from "./vector/Vector.js"
import EventCoordinator from "./EventCoordinator.js"
import Settings from "../gameLogic/Settings.js"
import Sound from "../gameLogic/Sound.js"
import Random from "../gameLogic/random.js"
import { canRender } from "./behaviors/canRender.js"
import { canMove } from "./behaviors/canMove.js"
import { canHandleCollision } from "./behaviors/canHandleCollision.js"
import Circle from "../draw/Circle.js"
import ObjectList from "../gameLogic/ObjectList.js"

const shatterSound = new Sound("/asteroids/src/sfx/asteroid_shatter.wav")
const shatterSound2 = new Sound("/asteroids/src/sfx/asteroid_shatter2.wav")
const shatterSound3 = new Sound("/asteroids/src/sfx/asteroid_shatter3.wav")
const hitSound = new Sound("/asteroids/src/sfx/asteroid_hit.wav")
const hitSound2 = new Sound("/asteroids/src/sfx/asteroid_hit2.wav")
const hitSound3 = new Sound("/asteroids/src/sfx/asteroid_hit3.wav")

export const LargeAsteroid = (position, velocity) => {
  return AsteroidFactory(position, velocity, Settings.LARGE_ASTEROID_RADIUS)
}
const MediumAsteroid = (position,velocity) => {
  return AsteroidFactory(position, velocity, Settings.MEDIUM_ASTEROID_RADIUS)
}
const SmallAsteroid = (position,velocity) => {
  return AsteroidFactory(position, velocity, Settings.SMALL_ASTEROID_RADIUS)
}
class Asteroid extends GameObject {

  onCollide(obj) {
    if(!this.collider.collidedWith(obj)) return
    if (obj.constructor.name === "Projectile"){
      this.durability--
      this.hitSounds[Random.int(2)].play()
    }
    if (this.durability < 1) {
      this.hitSounds.forEach(each => each.stop())
      this.shatterSounds[Random.int(2)].play()
      this.shatter()
      this.delete()
    }
  }

  delete() {
    EventCoordinator.call(EventCoordinator.event.ObjectDeleted, this)
    super.delete()
  }
}
const canCollide = asteroid => {
  const onCollide = obj => {
    if (obj.type === "Projectile"){
      asteroid.durability--
      // asteroid.hitSounds[Random.int(2)].play()
    }
    if (asteroid.durability < 1) {
      // asteroid.hitSounds.forEach(each => each.stop())
      // asteroid.shatterSounds[Random.int(2)].play()
      asteroid.shatter()
      asteroid.delete()
    }
  }
  return {onCollide}
}

const canDelete = asteroid => {
  const deleteThis = _ => {
    EventCoordinator.call(EventCoordinator.event.ObjectDeleted, asteroid)
    ObjectList.delete(asteroid)
  }
  return {delete:deleteThis}
}

const canUpdate = (asteroid) => {
  const update = _ => {
    asteroid.move()
  }
  return {update}
}

const canShatter = asteroid => {
  const shatter = _=> {
    let newVelocity = Vector.fromDegreesAndMagnitude(asteroid.velocity.degrees() + (Math.random() -.5) * Settings.SPREAD, 
    asteroid.velocity.magnitude() * 1.25)
    let direction = Math.random() > .5? 1: -1
    let spreadVelocity = new Vector(asteroid.velocity.y*direction, -asteroid.velocity.x*direction).scale(1.25)
    if (asteroid.radius === Settings.LARGE_ASTEROID_RADIUS){
    MediumAsteroid(asteroid.position, newVelocity)
    MediumAsteroid(asteroid.position, spreadVelocity)
    }
    if (asteroid.radius === Settings.MEDIUM_ASTEROID_RADIUS) {
    SmallAsteroid(asteroid.position, newVelocity)
    SmallAsteroid(asteroid.position, spreadVelocity)
    }

  }
  return {shatter}
}

const AsteroidFactory = (position, velocity, radius) => {
  let asteroid = {
    type: "Asteroid",
    position,
    velocity,
    radius,
    durability: Settings.ASTEROID_DURABILITY,

  }
  Object.assign(
    asteroid,
    canMove(asteroid),
    canRender(asteroid, Circle),
    canUpdate(asteroid),
    canCollide(asteroid),
    canHandleCollision(asteroid),
    canShatter(asteroid),
    canDelete(asteroid),
  )
  
  ObjectList.add(asteroid)
  return asteroid
}




