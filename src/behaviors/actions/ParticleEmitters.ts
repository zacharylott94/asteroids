import { Particle } from "../../dataStructures/Particle.js"
import Position from "../../dataStructures/position/Position.js"
import Vector from "../../dataStructures/vector/Vector.js"
import concat from "../../libraries/concat.js"
import { randomAngle, randomInteger, randomNumber } from "../../libraries/random.js"

type ParticleEmitterSettings = {
  number: number,
  spread: Degrees,
  location: TVector,
  angle: Degrees,
  lifetime: number,
  speed: number,
}
type ParticleEmitterFactory = (x: ParticleEmitterSettings) => Monoid<Particle[]>

export const particleEmitterFactory: ParticleEmitterFactory = (emitterSettings: ParticleEmitterSettings) => list => {
  let particles = new Array<Particle>(emitterSettings.number).fill(Particle())
  let randomVelocity = () => Vector.fromDegreesAndMagnitude(randomAngle(emitterSettings.angle, emitterSettings.spread), emitterSettings.speed)
  particles = particles.map(_ => Particle(emitterSettings.location, randomVelocity(), emitterSettings.lifetime))
  return concat(list, particles)
}


export const initPlayerParticles = (getPlayerStrategy: Function, isAccelerating: Condition) => particleEmitterFactory({
  get location() { return Position.real(getPlayerStrategy().position) },
  get speed() { return Vector.magnitude(getPlayerStrategy().velocity) * 1.5 },
  get angle() { return getPlayerStrategy().rotation + 180 },
  spread: 15,
  get number() {
    if (isAccelerating()) return randomInteger(2)
    return 0
  },
  get lifetime() { return randomInteger(15) }
})


export const createDestroyParticles = (object) => particleEmitterFactory({
  get location() { return Position.real(object.position) },
  get speed() { return randomNumber(5, 3) },
  angle: 0,
  spread: 360,
  get number() { return object.radius * 2 },
  get lifetime() { return randomInteger(60, 30) },
})


export const createProjectileTrail = (projectile) => particleEmitterFactory({
  get location() { return Position.real(projectile.position) },
  get speed() { return Vector.magnitude(projectile.velocity) * .2 },
  get angle() { return projectile.rotation + 180 },
  spread: 65,
  get number() { return randomInteger(3) },
  get lifetime() { return randomInteger(15) },
})

export const createProjectileImpact = (projectile) => particleEmitterFactory({
  get location() { return Position.real(projectile.position) },
  get speed() { return randomNumber(1) },
  get angle() { return projectile.rotation + 180 },
  spread: 110,
  get number() { return randomInteger(60, 30) },
  get lifetime() { return randomInteger(60) },
})


