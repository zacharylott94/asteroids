import GameObject from "./GameObject.js"
import Vector from "./vector/Vector.js"
import EventCoordinator from "./EventCoordinator.js"
import Settings from "../gameLogic/Settings.js"
import Sound from "../gameLogic/Sound.js"
import Random from "../gameLogic/random.js"



class Asteroid extends GameObject {
  constructor(position, velocity, radius) {
    super(position, velocity, radius)
    this.durability = Settings.ASTEROID_DURABILITY
    this.shatterSounds = [new Sound(Asteroid.shatterSound.getSrc()),
                          new Sound(Asteroid.shatterSound2.getSrc()),
                          new Sound(Asteroid.shatterSound3.getSrc()),
                        ]
    this.hitSounds = [new Sound(Asteroid.hitSound.getSrc()),
                      new Sound(Asteroid.hitSound2.getSrc()),
                      new Sound(Asteroid.hitSound3.getSrc()),
                    ]
    
  }

  // Sound files
  static shatterSound = new Sound("/asteroids/src/sfx/asteroid_shatter.wav")
  static shatterSound2 = new Sound("/asteroids/src/sfx/asteroid_shatter2.wav")
  static shatterSound3 = new Sound("/asteroids/src/sfx/asteroid_shatter3.wav")
  static hitSound = new Sound("/asteroids/src/sfx/asteroid_hit.wav")
  static hitSound2 = new Sound("/asteroids/src/sfx/asteroid_hit2.wav")
  static hitSound3 = new Sound("/asteroids/src/sfx/asteroid_hit3.wav")


  //template methods
  static createLarge(position,velocity) {
    return new Asteroid(position, velocity, Settings.LARGE_ASTEROID_RADIUS)
  }
  static createMedium(position,velocity) {
    return new Asteroid(position, velocity, Settings.MEDIUM_ASTEROID_RADIUS)
  }
  static createSmall(position,velocity) {
    return new Asteroid(position, velocity, Settings.SMALL_ASTEROID_RADIUS)
  }

  shatter() {
    let newVelocity = Vector.fromDegreesAndMagnitude(this.velocity.degrees() + (Math.random() -.5) * Settings.SPREAD, 
                                                     this.velocity.magnitude() * 1.25)
    let direction = Math.random() > .5? 1: -1
    let spreadVelocity = new Vector(this.velocity.y*direction, -this.velocity.x*direction).scale(1.25)
    if (this.radius === Settings.LARGE_ASTEROID_RADIUS){
      Asteroid.createMedium(this.position, newVelocity)
      Asteroid.createMedium(this.position, spreadVelocity)
    }
    if (this.radius === Settings.MEDIUM_ASTEROID_RADIUS) {
      Asteroid.createSmall(this.position, newVelocity)
      Asteroid.createSmall(this.position, spreadVelocity)
    }

  }

  handleCollision(obj) {
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



export default Asteroid