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
  speed: 2
}

export const ParticleSpawnerBuilder = _ => {
  let builder = {spawner: {...defaults}}
  const build = _ => {
    return {emit}
  }
  const withSpread = spread => {
    builder.spawner.spread = spread
    return builder
  }
  const withDensity = density => {
    builder.spawner.density = density
    return builder
  }
  const withDraw = drawFunction => {
    builder.spawner.draw = drawFunction
    return builder
  }
  const withParticleTTL = ttl => {
    builder.spawner.ttl = ttl
    return builder
  }

  const atAngle = angle => {
    builder.spawner.angle = angle
    return builder
  }

  const withSpeed = speed => {
    builder.spawner.speed = speed
  }
  Object.assign(
    builder,
    {build,
    withSpread,
    withDensity,
    withDraw,
    withParticleTTL,
    atAngle,
    withSpeed,
  }
  )

  const emit = position => {
    // console.log(builder.spawner)
    // let velocity = Vector.fromDegreesAndMagnitude(builder.spawner.angle)
    for (let i = 0; i < builder.spawner.density; i++) {
      let velocity = Vector.fromDegreesAndMagnitude(randomAngle(builder.spawner.angle, builder.spawner.spread), Math.random() * builder.spawner.speed)
      Particle({...builder.spawner, velocity, position})
    }
  }

  return builder
}
