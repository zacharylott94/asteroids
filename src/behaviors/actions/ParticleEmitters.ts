import { Particle } from "../../dataStructures/Particle.js"
import Position from "../../dataStructures/position/Position.js"
import Vector from "../../dataStructures/vector/Vector.js"
import concat from "../../libraries/concat.js"
import { randomAngle, randomInteger } from "../../libraries/random.js"

type ParticleEmitterSettings = {
  number: Function,
  spread: Function,
  location: Function,
  angle: Function,
  lifetime: Function,
  speed: Function,
}
type ParticleEmitterFactory = (x: ParticleEmitterSettings) => Monoid<Particle[]>

export const particleEmitterFactory: ParticleEmitterFactory = ({ number, spread, location, angle, lifetime, speed }) => list => {
  let particles = new Array<Particle>(number()).fill(Particle())
  let randomVelocity = () => Vector.fromDegreesAndMagnitude(randomAngle(angle(), spread()), speed())
  particles = particles.map(_ => Particle(location(), randomVelocity(), lifetime()))
  return concat(list, particles)
}


export const initPlayerParticles = (getPlayerStrategy: Function, isAccelerating: Condition) => particleEmitterFactory({
  location() { return Position.real(getPlayerStrategy().position) },
  speed() { return Vector.magnitude(getPlayerStrategy().velocity) * 1.5 },
  angle() { return getPlayerStrategy().rotation + 180 },
  spread() { return 15 },
  number() {
    if (isAccelerating()) return randomInteger(2)
    return 0
  },
  lifetime() { return randomInteger(15) }
})