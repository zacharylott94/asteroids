import Circle from "../draw/Circle.js";
import { randomAngle } from "../gameLogic/random.js";
import { Particle } from "./Particle.js";
import Position from "./vector/Position.js";
import Vector from "./vector/Vector.js"

const defaults = {
  angle: 0,
  spread: 360,
  density: 10,
  draw: Circle,
  ttl: 20,
  speed: 2,
  position: new Position( 100, 100 ),
}

export const ParticleSpawnerBuilder = _ => {
  let builder = {spawner: {...defaults}}
  let spawner = {...defaults}
  const build = _ => {
    return {emit}
  }
  const withSpread = spread => {
    spawner.spread = spread
    return builder
  }
  const withDensity = density => {
    spawner.density = density
    return builder
  }
  const withDraw = drawFunction => {
    spawner.draw = drawFunction
    return builder
  }
  const withParticleTTL = ttl => {
    spawner.ttl = ttl
    return builder
  }

  const atAngle = angle => {
    spawner.angle = angle
    return builder
  }

  const withSpeed = speed => {
    spawner.speed = speed
    return builder
  }

  const withPosition = position => {
    spawner.position = position
    return builder
  }
  Object.assign(
    builder,
    {
      build,
      withSpread,
      withDensity,
      withDraw,
      withParticleTTL,
      atAngle,
      withSpeed,
      withPosition,
    }
  )

  const emit = _ => {
    for (let i = 0; i < spawner.density; i++) {
      let velocity = Vector.fromDegreesAndMagnitude(randomAngle(spawner.angle, spawner.spread), Math.random() * spawner.speed)
      Particle({...spawner, velocity})
    }
  }

  return builder
}
