import { Particle } from "../dataStructures/Particle.js"
import Position from "../dataStructures/position/Position.js"
import Vector from "../dataStructures/vector/Vector.js"
import compose from "../hof/compose.js"
import concat from "../libraries/concat.js"
import { randomAngle, randomInteger, randomNumber } from "../libraries/random.js"
import { isAccelerating, isPlayer, isProjectile, isRotatingClockwise, isRotatingCounterclockwise } from "../hof/conditions.js"
import and from "../hof/and.js"

type ParticleGeneratorSettings = {
  number: number,
  spread: Degrees,
  location: TVector,
  angle: Degrees,
  lifetime: number,
  speed: number,
}

const generateParticleList = (generatorSettings: ParticleGeneratorSettings) => {
  let particles = new Array<Particle>(generatorSettings.number).fill(Particle())
  let randomVelocity = () => Vector.fromDegreesAndMagnitude(randomAngle(generatorSettings.angle, generatorSettings.spread), generatorSettings.speed)
  particles = particles.map(_ => Particle(generatorSettings.location, randomVelocity(), generatorSettings.lifetime))
  return particles
}

const boosterSettings = (player, offset) => ({
  get location() {
    return [
      Position.real(player.position),
      Vector.fromDegreesAndMagnitude(player.rotation, -5),
      Vector.fromDegreesAndMagnitude(player.rotation + 90, offset)
    ].reduce(Vector.add)
  },
  get speed() { return Vector.magnitude(player.velocity) * 1.5 },
  get angle() { return player.rotation + 180 },
  spread: 15,
  get number() { return randomInteger(2) },
  get lifetime() { return randomInteger(15) }
})

const playerLeftBooster = player => generateParticleList(boosterSettings(player, -5))

const playerRightBooster = player => generateParticleList(boosterSettings(player, 5))

const playerBoosters = player => [
  playerRightBooster(player),
  playerLeftBooster(player)
].flat()

const projectileTrailGenerator = (projectile) => generateParticleList({
  get location() { return Position.real(projectile.position) },
  get speed() { return Vector.magnitude(projectile.velocity) * .2 },
  get angle() { return projectile.rotation + 180 },
  spread: 65,
  get number() { return randomInteger(3) },
  get lifetime() { return randomInteger(15) },
})

const projectileImpactGenerator = (projectile) => generateParticleList({
  get location() { return Position.real(projectile.position) },
  get speed() { return randomNumber(1) },
  get angle() { return projectile.rotation + 180 },
  spread: 110,
  get number() { return randomInteger(60, 30) },
  get lifetime() { return randomInteger(60) },
})

const destroyParticleGenerator = object => generateParticleList({
  get location() { return Position.real(object.position) },
  get speed() { return randomNumber(5, 3) },
  angle: 0,
  spread: 360,
  get number() { return object.radius * 2 },
  get lifetime() { return randomInteger(60, 30) },
})

const projectileTimeoutParticleGenerator = projectile => generateParticleList({
  get location() { return Position.real(projectile.position) },
  get speed() { return Vector.magnitude(projectile.velocity) * .15 * randomNumber(1) },
  get angle() { return projectile.rotation },
  spread: 60,
  get number() { return randomInteger(10, 5) },
  get lifetime() { return randomInteger(100) },
})

const playerDeathParticleGenerator = player => generateParticleList({
  get location() { return Position.real(player.position) },
  get speed() { return randomNumber(1, .15) },
  angle: 0,
  spread: 360,
  get number() { return randomInteger(40, 30) },
  get lifetime() { return randomInteger(520, 400) }
})

const particleMap = (method, filter) => objectListGetter => list => {
  const particles = objectListGetter()
    .filter(filter)
    .map(method)
    .reduce(concat, [])
  return concat(list, particles)
}

const DestroyParticles = particleMap(destroyParticleGenerator, obj => obj.type === ObjectType.Asteroid && obj.delete)
const ProjectileTrails = particleMap(projectileTrailGenerator, isProjectile)
const ProjectileImpacts = particleMap(projectileImpactGenerator, obj => isProjectile(obj) && obj.hasCollided)
const PlayerParticles = particleMap(playerBoosters, and(isPlayer, isAccelerating))
const ProjectileTimeoutParticles = particleMap(projectileTimeoutParticleGenerator, obj => isProjectile(obj) && !obj.hasCollided && obj.delete)
const PlayerDeathParticles = particleMap(playerDeathParticleGenerator, and(isPlayer, obj => obj.delete))
const PlayerCounterclockwiseBooster = particleMap(playerRightBooster, and(isPlayer, isRotatingCounterclockwise))
const PlayerClockwiseBooster = particleMap(playerLeftBooster, and(isPlayer, isRotatingClockwise))
export const particleGeneratorSetup = objectListGetter => {
  return [
    DestroyParticles,
    ProjectileTrails,
    ProjectileImpacts,
    PlayerParticles,
    ProjectileTimeoutParticles,
    PlayerDeathParticles,
    PlayerClockwiseBooster,
    PlayerCounterclockwiseBooster
  ].map(f => f(objectListGetter))
    .reduce(compose)
}

